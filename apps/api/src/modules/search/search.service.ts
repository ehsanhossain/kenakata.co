import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { MeiliSearchService } from '@/common/meilisearch.service';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meilisearch: MeiliSearchService,
    private readonly catalogService: CatalogService,
  ) {}

  async search(query: string, options: any = {}) {
    // If Meilisearch is available, perform fast typo-tolerant search
    if (this.meilisearch.isAvailable && query) {
      const meiliResult = await this.meilisearch.searchProducts(query, {
        limit: options.limit || 20,
        offset: ((options.page || 1) - 1) * (options.limit || 20),
      });

      if (meiliResult && meiliResult.hits && meiliResult.hits.length > 0) {
        return {
          items: meiliResult.hits,
          meta: {
            page: options.page || 1,
            limit: options.limit || 20,
            total: meiliResult.estimatedTotalHits || meiliResult.hits.length,
            totalPages: Math.ceil((meiliResult.estimatedTotalHits || meiliResult.hits.length) / (options.limit || 20)),
          },
        };
      }
    }

    // Fallback to Catalog database search
    return this.catalogService.getProducts({
      q: query,
      category: options.category,
      brand: options.brand,
      minPrice: options.minPrice,
      maxPrice: options.maxPrice,
      sort: options.sort,
      page: options.page || 1,
      limit: options.limit || 20,
      locale: options.locale || 'EN_BD',
    });
  }

  async getSuggestions(query: string) {
    if (!query || query.length < 2) return [];

    const products = await this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { translations: { some: { title: { contains: query, mode: 'insensitive' } } } },
          { category: { slug: { contains: query, mode: 'insensitive' } } },
        ],
      },
      include: {
        translations: true,
        category: { include: { translations: true } },
      },
      take: 6,
    });

    return products.map((p) => {
      const titleEn = p.translations.find((t) => t.locale === 'EN_BD')?.title || p.slug;
      const titleBn = p.translations.find((t) => t.locale === 'BN_BD')?.title;
      return {
        id: p.id,
        slug: p.slug,
        title: titleEn,
        titleBn,
        category: p.category ? p.category.slug : null,
      };
    });
  }

  async getTrendingSearches() {
    return [
      'Samsung Galaxy',
      'Wireless Earbuds',
      'Silk Saree',
      'Air Conditioner',
      'Smart Watch',
      'Panjabi for Eid',
      'Gaming Laptop',
      'Blender & Juicer',
    ];
  }
}
