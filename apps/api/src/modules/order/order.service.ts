import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { TrackOrderDto, UpdateOrderStatusDto, OrderFilterDto } from './dto/order.dto';
import { poishaToTaka } from '../../common/constants';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerOrders(customerId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [total, orders] = await Promise.all([
      this.prisma.order.count({ where: { customerId } }),
      this.prisma.order.findMany({
        where: { customerId },
        include: {
          items: true,
          payments: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      items: orders.map((o) => this.formatOrder(o)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOrderByNumber(orderNumber: string, customerId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        transitions: { orderBy: { createdAt: 'asc' } },
        payments: { orderBy: { createdAt: 'desc' } },
        fulfilments: {
          include: {
            shipments: {
              include: { events: { orderBy: { occurredAt: 'desc' } } },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with number "${orderNumber}" not found`);
    }

    if (customerId && order.customerId !== customerId) {
      throw new ForbiddenException('You do not have permission to view this order');
    }

    return this.formatOrder(order, true);
  }

  async trackOrder(dto: TrackOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber: dto.orderNumber.trim() },
      include: {
        items: true,
        transitions: { orderBy: { createdAt: 'asc' } },
        fulfilments: {
          include: {
            shipments: {
              include: { events: { orderBy: { occurredAt: 'desc' } } },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('No order found with this order number');
    }

    // Masked phone verification (matches last 4 or full)
    const normalizedInputPhone = dto.phone.replace(/\D/g, '');
    const normalizedOrderPhone = order.phoneE164.replace(/\D/g, '');

    const isMatch =
      normalizedOrderPhone.endsWith(normalizedInputPhone) ||
      normalizedInputPhone.endsWith(normalizedOrderPhone.slice(-8));

    if (!isMatch) {
      throw new BadRequestException('Phone number does not match the records for this order');
    }

    return this.formatOrder(order, true);
  }

  async getAdminOrders(filters: OrderFilterDto) {
    const { status, q, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (q) {
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { phoneE164: { contains: q } },
      ];
    }

    const [total, orders] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        include: {
          items: true,
          payments: { orderBy: { createdAt: 'desc' }, take: 1 },
          customer: { select: { name: true, phoneE164: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      items: orders.map((o) => this.formatOrder(o)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto, adminUserId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const o = await tx.order.update({
        where: { id: orderId },
        data: {
          status: dto.status,
          updatedAt: new Date(),
        },
      });

      await tx.orderTransition.create({
        data: {
          orderId,
          fromStatus: order.status,
          toStatus: dto.status,
          source: 'ADMIN_PANEL',
          actorId: adminUserId,
          note: dto.note || `Status updated to ${dto.status}`,
        },
      });

      return o;
    });

    return this.getOrderByNumber(updated.orderNumber);
  }

  private formatOrder(order: any, detailed = false) {
    const address = order.addressSnapshot || {};
    const payment = order.payments?.[0];

    const formatted: any = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: payment?.method || 'CASH_ON_DELIVERY',
      subtotal: poishaToTaka(order.subtotalMinor),
      shipping: poishaToTaka(order.shippingMinor),
      discount: poishaToTaka(order.discountMinor),
      total: poishaToTaka(order.totalMinor),
      totalMinor: Number(order.totalMinor),
      currency: order.currency,
      phone: order.phoneE164,
      recipientName: address.recipientName || 'Customer',
      shippingAddress: address,
      itemCount: order.items?.reduce((sum: number, i: any) => sum + i.quantity, 0) || 0,
      createdAt: order.createdAt,
      placedAt: order.placedAt,
      items: order.items?.map((item: any) => ({
        id: item.id,
        variantId: item.variantId,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: poishaToTaka(item.unitPriceMinor),
        total: poishaToTaka(item.totalMinor),
        title: item.productSnapshot?.title || 'Product',
        variantTitle: item.productSnapshot?.variantTitle,
        image: item.productSnapshot?.image,
      })),
    };

    if (detailed) {
      formatted.timeline = (order.transitions || []).map((t: any) => ({
        id: t.id,
        fromStatus: t.fromStatus,
        toStatus: t.toStatus,
        source: t.source,
        note: t.note,
        createdAt: t.createdAt,
      }));

      const shipment = order.fulfilments?.[0]?.shipments?.[0];
      if (shipment) {
        formatted.shipment = {
          courier: shipment.provider,
          trackingNumber: shipment.trackingNumber,
          status: shipment.status,
          events: shipment.events || [],
        };
      }
    }

    return formatted;
  }
}
