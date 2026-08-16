import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UpdateProfileDto, CreateAddressDto, UpdateAddressDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        addresses: {
          orderBy: { isDefault: 'desc' },
        },
        _count: {
          select: {
            orders: true,
            wishlistItems: true,
            reviews: true,
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found');
    }

    return customer;
  }

  async updateProfile(customerId: string, dto: UpdateProfileDto) {
    if (dto.email) {
      const existing = await this.prisma.customer.findFirst({
        where: {
          email: dto.email,
          id: { not: customerId },
        },
      });
      if (existing) {
        throw new BadRequestException('Email address is already in use by another account');
      }
    }

    return this.prisma.customer.update({
      where: { id: customerId },
      data: {
        name: dto.name,
        email: dto.email,
        locale: dto.locale,
      },
    });
  }

  async getAddresses(customerId: string) {
    return this.prisma.address.findMany({
      where: { customerId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createAddress(customerId: string, dto: CreateAddressDto) {
    // If setting as default, unset previous default
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId, isDefault: true },
        data: { isDefault: false },
      });
    } else {
      // If this is the first address, make it default automatically
      const count = await this.prisma.address.count({ where: { customerId } });
      if (count === 0) {
        dto.isDefault = true;
      }
    }

    return this.prisma.address.create({
      data: {
        customerId,
        label: dto.label,
        recipientName: dto.recipientName,
        phoneE164: dto.phone,
        division: dto.division,
        district: dto.district,
        upazilaThana: dto.upazilaThana,
        area: dto.area,
        postalCode: dto.postalCode,
        addressLine: dto.addressLine,
        landmark: dto.landmark,
        instructions: dto.instructions,
        isDefault: !!dto.isDefault,
      },
    });
  }

  async updateAddress(customerId: string, addressId: string, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, customerId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId, isDefault: true, id: { not: addressId } },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.update({
      where: { id: addressId },
      data: {
        label: dto.label,
        recipientName: dto.recipientName,
        phoneE164: dto.phone,
        division: dto.division,
        district: dto.district,
        upazilaThana: dto.upazilaThana,
        area: dto.area,
        postalCode: dto.postalCode,
        addressLine: dto.addressLine,
        landmark: dto.landmark,
        instructions: dto.instructions,
        isDefault: dto.isDefault,
      },
    });
  }

  async deleteAddress(customerId: string, addressId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, customerId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.prisma.address.delete({
      where: { id: addressId },
    });

    return { success: true, message: 'Address deleted successfully' };
  }

  async getWishlist(customerId: string) {
    const items = await this.prisma.wishlistItem.findMany({
      where: { customerId },
      include: {
        product: {
          include: {
            translations: true,
            variants: {
              include: {
                prices: {
                  where: {
                    currency: 'BDT',
                  },
                  orderBy: { priority: 'desc' },
                },
                inventory: true,
              },
            },
            media: {
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items;
  }

  async addToWishlist(customerId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.wishlistItem.upsert({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
      create: { customerId, productId },
      update: {},
    });
  }

  async removeFromWishlist(customerId: string, productId: string) {
    try {
      await this.prisma.wishlistItem.delete({
        where: {
          customerId_productId: {
            customerId,
            productId,
          },
        },
      });
      return { success: true, message: 'Item removed from wishlist' };
    } catch {
      return { success: true, message: 'Item not in wishlist' };
    }
  }
}
