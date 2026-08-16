import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async submitReview(
    customerId: string,
    dto: { productId: string; orderItemId?: string; rating: number; title?: string; body?: string },
  ) {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be an integer between 1 and 5');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Auto-approve or queue for moderation
    return this.prisma.review.create({
      data: {
        customerId,
        productId: dto.productId,
        orderItemId: dto.orderItemId || dto.productId, // Fallback when submitted directly
        rating: dto.rating,
        title: dto.title,
        body: dto.body,
        status: 'APPROVED',
      },
    });
  }

  async getProductReviews(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { productId, status: 'APPROVED' },
      include: {
        customer: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = reviews.length;
    const averageRating = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 5.0;

    return {
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        body: r.body,
        customerName: r.customer?.name || 'Verified Buyer',
        date: r.createdAt,
      })),
      total,
      averageRating: Number(averageRating.toFixed(1)),
    };
  }
}
