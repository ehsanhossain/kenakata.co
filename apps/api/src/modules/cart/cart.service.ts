import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto';
import { poishaToTaka, SHIPPING_RATES } from '../../common/constants';
import * as crypto from 'crypto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateCart(customerId?: string, guestToken?: string) {
    if (customerId) {
      let cart = await this.prisma.cart.findFirst({
        where: { customerId },
        include: this.getCartInclude(),
      });

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: { customerId },
          include: this.getCartInclude(),
        });
      }
      return this.formatCart(cart);
    }

    // Guest cart
    const token = guestToken || `guest_${crypto.randomBytes(16).toString('hex')}`;
    let cart = await this.prisma.cart.findFirst({
      where: { guestTokenHash: token },
      include: this.getCartInclude(),
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { guestTokenHash: token },
        include: this.getCartInclude(),
      });
    }

    return this.formatCart(cart, token);
  }

  async addItem(dto: AddCartItemDto, customerId?: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: dto.variantId },
      include: {
        prices: { where: { currency: 'BDT' }, orderBy: { priority: 'desc' } },
        product: true,
      },
    });

    if (!variant || !variant.isActive) {
      throw new NotFoundException('Product variant is not available');
    }

    // Get or create the active cart
    const formatted = await this.getOrCreateCart(customerId, dto.guestToken);
    const cartId = formatted.id;

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId,
          variantId: dto.variantId,
        },
      },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + dto.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId,
          variantId: dto.variantId,
          quantity: dto.quantity,
        },
      });
    }

    return this.getCartById(cartId, formatted.guestToken);
  }

  async updateItemQuantity(cartItemId: string, dto: UpdateCartItemDto, customerId?: string, guestToken?: string) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    // Security check
    if (customerId && item.cart.customerId !== customerId) {
      throw new BadRequestException('Unauthorized cart item access');
    }
    if (!customerId && guestToken && item.cart.guestTokenHash !== guestToken) {
      throw new BadRequestException('Unauthorized cart item access');
    }

    if (dto.quantity <= 0) {
      await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      await this.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: dto.quantity },
      });
    }

    return this.getCartById(item.cartId, guestToken);
  }

  async removeItem(cartItemId: string, customerId?: string, guestToken?: string) {
    return this.updateItemQuantity(cartItemId, { quantity: 0 }, customerId, guestToken);
  }

  async clearCart(customerId?: string, guestToken?: string) {
    const cart = await this.getOrCreateCart(customerId, guestToken);
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return this.getCartById(cart.id, cart.guestToken);
  }

  private async getCartById(cartId: string, guestToken?: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: this.getCartInclude(),
    });
    return this.formatCart(cart, guestToken);
  }

  private getCartInclude() {
    return {
      items: {
        include: {
          variant: {
            include: {
              product: {
                include: {
                  translations: true,
                  media: { orderBy: { sortOrder: 'asc' as const } },
                },
              },
              prices: {
                where: { currency: 'BDT' },
                orderBy: { priority: 'desc' as const },
              },
              inventory: true,
            },
          },
        },
        orderBy: { addedAt: 'asc' as const },
      },
    };
  }

  private formatCart(cart: any, guestToken?: string) {
    let subtotalMinor = BigInt(0);
    let totalItems = 0;

    const items = (cart?.items || []).map((item: any) => {
      const variant = item.variant;
      const product = variant?.product;
      const priceRecord = variant?.prices?.[0];
      const unitPriceMinor = priceRecord ? priceRecord.amountMinor : BigInt(0);
      const lineTotalMinor = unitPriceMinor * BigInt(item.quantity);

      subtotalMinor += lineTotalMinor;
      totalItems += item.quantity;

      const titleEn = product?.translations?.find((t: any) => t.locale === 'EN_BD')?.title || product?.slug || 'Product';
      const image = product?.media?.[0]?.objectKey || '';

      return {
        id: item.id,
        variantId: variant?.id,
        productId: product?.id,
        slug: product?.slug,
        title: titleEn,
        variantTitle: variant?.title,
        sku: variant?.sku,
        options: variant?.optionValues,
        price: poishaToTaka(unitPriceMinor),
        priceMinor: Number(unitPriceMinor),
        quantity: item.quantity,
        total: poishaToTaka(lineTotalMinor),
        totalMinor: Number(lineTotalMinor),
        image,
        inStock: true,
      };
    });

    const subtotal = poishaToTaka(subtotalMinor);
    const freeShippingThreshold = poishaToTaka(SHIPPING_RATES.FREE_SHIPPING_THRESHOLD_MINOR);
    const qualifiesForFreeShipping = subtotalMinor >= BigInt(SHIPPING_RATES.FREE_SHIPPING_THRESHOLD_MINOR);
    const amountNeededForFreeShipping = qualifiesForFreeShipping ? 0 : Math.max(0, freeShippingThreshold - subtotal);

    return {
      id: cart?.id,
      guestToken: guestToken || cart?.guestTokenHash,
      items,
      totalItems,
      subtotal,
      subtotalMinor: Number(subtotalMinor),
      freeShippingThreshold,
      qualifiesForFreeShipping,
      amountNeededForFreeShipping,
      estimatedShippingInsideDhaka: qualifiesForFreeShipping ? 0 : poishaToTaka(SHIPPING_RATES.INSIDE_DHAKA_MINOR),
      estimatedShippingOutsideDhaka: qualifiesForFreeShipping ? 0 : poishaToTaka(SHIPPING_RATES.OUTSIDE_DHAKA_MINOR),
      currency: 'BDT',
    };
  }
}
