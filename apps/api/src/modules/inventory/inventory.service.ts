import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getWarehouses() {
    return this.prisma.warehouse.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { balances: true, fulfilments: true } },
      },
    });
  }

  async getStockOverview() {
    const balances = await this.prisma.inventoryBalance.findMany({
      include: {
        warehouse: true,
        variant: {
          include: {
            product: { include: { translations: true } },
          },
        },
      },
      take: 50,
    });

    const lowStockItems = balances.filter((b) => b.onHand - b.reserved <= b.safetyStock);

    return {
      totalItemsTracked: balances.length,
      lowStockCount: lowStockItems.length,
      balances: balances.map((b) => ({
        warehouseName: b.warehouse.name,
        sku: b.variant.sku,
        productTitle: b.variant.product?.translations?.find((t) => t.locale === 'EN_BD')?.title || b.variant.sku,
        onHand: b.onHand,
        reserved: b.reserved,
        available: b.onHand - b.reserved,
        safetyStock: b.safetyStock,
        status: b.onHand - b.reserved <= b.safetyStock ? 'LOW_STOCK' : 'HEALTHY',
      })),
    };
  }
}
