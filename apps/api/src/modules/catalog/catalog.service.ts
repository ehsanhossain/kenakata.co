import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { MeiliSearchService } from '../../common/meilisearch.service';
import { ProductFilterDto, CreateCategoryDto, CreateBrandDto, CreateProductDto } from './dto/catalog.dto';
import { poishaToTaka, takaToPoisha } from '../../common/constants';

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly meilisearch: MeiliSearchService,
  ) {}

  async getProducts(filters: ProductFilterDto) {
    const { category, brand, q, minPrice, maxPrice, sort, page = 1, limit = 20, locale = 'EN_BD' } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
    };

    if (category) {
      where.category = { slug: category };
    }

    if (brand) {
      where.brand = { slug: brand };
    }

    if (q) {
      where.OR = [
        { translations: { some: { title: { contains: q, mode: 'insensitive' } } } },
        { translations: { some: { description: { contains: q, mode: 'insensitive' } } } },
        { variants: { some: { sku: { contains: q, mode: 'insensitive' } } } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: any = {};
      if (minPrice !== undefined) priceFilter.amountMinor = { gte: BigInt(takaToPoisha(minPrice)) };
      if (maxPrice !== undefined) {
        priceFilter.amountMinor = {
          ...(priceFilter.amountMinor || {}),
          lte: BigInt(takaToPoisha(maxPrice)),
        };
      }
      where.variants = {
        some: {
          prices: {
            some: priceFilter,
          },
        },
      };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'popular') {
      orderBy = { reviews: { _count: 'desc' } };
    }

    const [total, products] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        include: {
          category: {
            include: { translations: true },
          },
          brand: {
            include: { translations: true },
          },
          translations: true,
          variants: {
            where: { isActive: true },
            include: {
              prices: {
                where: { currency: 'BDT' },
                orderBy: { priority: 'desc' },
              },
              inventory: true,
            },
          },
          media: {
            orderBy: { sortOrder: 'asc' },
          },
          reviews: {
            where: { status: 'APPROVED' },
            select: { rating: true },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    // Format products for consumer API
    const items = products.map((p) => this.formatProduct(p, locale));

    // In-memory sort for price if requested
    if (sort === 'price_asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductBySlug(slug: string, locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parent: {
              include: { translations: true },
            },
            translations: true,
          },
        },
        brand: {
          include: { translations: true },
        },
        translations: true,
        variants: {
          where: { isActive: true },
          include: {
            prices: {
              where: { currency: 'BDT' },
              orderBy: { priority: 'desc' },
            },
            inventory: true,
            media: true,
          },
        },
        media: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          where: { status: 'APPROVED' },
          include: {
            customer: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }

    return this.formatProduct(product, locale, true);
  }

  async getCategories(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    const categories = await this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        translations: true,
        children: {
          include: {
            translations: true,
            _count: { select: { products: true } },
          },
          orderBy: { sortOrder: 'asc' },
        },
        _count: { select: { products: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: this.resolveTranslation(c.translations, locale, 'name') || c.slug,
      description: this.resolveTranslation(c.translations, locale, 'description'),
      productCount: c._count.products,
      children: c.children.map((child) => ({
        id: child.id,
        slug: child.slug,
        name: this.resolveTranslation(child.translations, locale, 'name') || child.slug,
        productCount: child._count.products,
      })),
    }));
  }

  async getCategoryBySlug(slug: string, locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        translations: true,
        parent: {
          include: { translations: true },
        },
        children: {
          include: { translations: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }

    return {
      id: category.id,
      slug: category.slug,
      name: this.resolveTranslation(category.translations, locale, 'name') || category.slug,
      description: this.resolveTranslation(category.translations, locale, 'description'),
      parent: category.parent
        ? {
            id: category.parent.id,
            slug: category.parent.slug,
            name: this.resolveTranslation(category.parent.translations, locale, 'name'),
          }
        : null,
      children: category.children.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: this.resolveTranslation(c.translations, locale, 'name'),
      })),
    };
  }

  async getBrands(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    const brands = await this.prisma.brand.findMany({
      include: {
        translations: true,
        _count: { select: { products: true } },
      },
      orderBy: { slug: 'asc' },
    });

    return brands.map((b) => ({
      id: b.id,
      slug: b.slug,
      name: this.resolveTranslation(b.translations, locale, 'name') || b.slug,
      mediaKey: b.mediaKey,
      productCount: b._count.products,
    }));
  }

  async getFeaturedProducts(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    return (await this.getProducts({ limit: 8, locale })).items;
  }

  async getFlashDeals(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    const result = await this.getProducts({ limit: 6, locale });
    return result.items.map((item, idx) => ({
      ...item,
      discountPercent: [15, 20, 25, 30, 10, 35][idx % 6],
      soldCount: [45, 120, 85, 32, 64, 90][idx % 6],
      totalStock: 150,
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }));
  }

  async getNewArrivals(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    return (await this.getProducts({ sort: 'newest', limit: 8, locale })).items;
  }

  async getBestSellers(locale: 'EN_BD' | 'BN_BD' = 'EN_BD') {
    return (await this.getProducts({ sort: 'popular', limit: 8, locale })).items;
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        slug: dto.slug,
        parentId: dto.parentId,
        sortOrder: dto.sortOrder || 0,
        status: 'ACTIVE',
        translations: {
          create: [
            { locale: 'EN_BD', name: dto.nameEn },
            { locale: 'BN_BD', name: dto.nameBn },
          ],
        },
      },
    });
  }

  async createBrand(dto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: {
        slug: dto.slug,
        mediaKey: dto.mediaKey,
        status: 'ACTIVE',
        translations: {
          create: [
            { locale: 'EN_BD', name: dto.nameEn },
            { locale: 'BN_BD', name: dto.nameBn },
          ],
        },
      },
    });
  }

  async createProduct(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new BadRequestException(`Product with slug "${dto.slug}" already exists`);
    }

    return this.prisma.product.create({
      data: {
        slug: dto.slug,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
        status: 'ACTIVE',
        publishedAt: new Date(),
        returnPolicyCode: dto.returnPolicyCode || 'STANDARD_7_DAY',
        taxClassCode: dto.taxClassCode || 'STANDARD_VAT_15',
        translations: {
          create: [
            {
              locale: 'EN_BD',
              title: dto.titleEn,
              shortDescription: dto.shortDescriptionEn,
              description: dto.descriptionEn,
            },
            {
              locale: 'BN_BD',
              title: dto.titleBn,
              shortDescription: dto.shortDescriptionBn,
              description: dto.descriptionBn,
            },
          ],
        },
        media: {
          create: (dto.images || []).map((url, i) => ({
            objectKey: url,
            mediaType: 'image/jpeg',
            altEn: `${dto.titleEn} image ${i + 1}`,
            altBn: `${dto.titleBn} ছবি ${i + 1}`,
            sortOrder: i,
          })),
        },
        variants: {
          create: dto.variants.map((v) => ({
            sku: v.sku,
            title: v.title,
            optionValues: v.optionValues,
            prices: {
              create: {
                currency: 'BDT',
                amountMinor: BigInt(v.priceMinor),
                compareAtMinor: v.compareAtMinor ? BigInt(v.compareAtMinor) : null,
              },
            },
          })),
        },
      },
    });
  }

  private formatProduct(product: any, locale: 'EN_BD' | 'BN_BD', detailed = false) {
    const primaryVariant = product.variants?.[0];
    const priceRecord = primaryVariant?.prices?.[0];
    const price = priceRecord ? poishaToTaka(priceRecord.amountMinor) : 0;
    const compareAtPrice = priceRecord?.compareAtMinor ? poishaToTaka(priceRecord.compareAtMinor) : undefined;
    const discount = compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : undefined;

    const totalStock = product.variants?.reduce((sum: number, v: any) => {
      const stock = v.inventory?.reduce((balSum: number, bal: any) => balSum + (bal.onHand - bal.reserved), 0) ?? 10;
      return sum + stock;
    }, 0);

    const ratings = product.reviews || [];
    const rating = ratings.length > 0 ? ratings.reduce((acc: number, r: any) => acc + r.rating, 0) / ratings.length : 4.8;
    const reviewCount = ratings.length > 0 ? ratings.length : 12;

    const title = this.resolveTranslation(product.translations, locale, 'title') || product.slug;
    const shortDescription = this.resolveTranslation(product.translations, locale, 'shortDescription');
    const description = this.resolveTranslation(product.translations, locale, 'description');
    const categoryName = product.category ? this.resolveTranslation(product.category.translations, locale, 'name') : '';
    const brandName = product.brand ? this.resolveTranslation(product.brand.translations, locale, 'name') : undefined;

    const images = product.media?.map((m: any) => m.objectKey) || [];

    const formatted: any = {
      id: product.id,
      slug: product.slug,
      title,
      titleBn: this.resolveTranslation(product.translations, 'BN_BD', 'title'),
      shortDescription,
      description,
      category: categoryName,
      categorySlug: product.category?.slug,
      brand: brandName,
      brandSlug: product.brand?.slug,
      price,
      compareAtPrice,
      discount,
      rating: Number(rating.toFixed(1)),
      reviewCount,
      images,
      inStock: totalStock > 0,
      stockCount: totalStock,
      badge: discount && discount >= 20 ? `${discount}% OFF` : undefined,
    };

    if (detailed) {
      formatted.variants = product.variants.map((v: any) => {
        const vPriceRecord = v.prices?.[0];
        return {
          id: v.id,
          sku: v.sku,
          title: v.title,
          options: v.optionValues,
          price: vPriceRecord ? poishaToTaka(vPriceRecord.amountMinor) : price,
          compareAtPrice: vPriceRecord?.compareAtMinor ? poishaToTaka(vPriceRecord.compareAtMinor) : undefined,
          inStock: true,
        };
      });

      formatted.specifications = this.resolveTranslation(product.translations, locale, 'specifications') || {
        'Return Policy': product.returnPolicyCode,
        'Warranty': product.warrantyCode || '1 Year Brand Warranty',
        'Tax VAT': 'Included (15%)',
        'Delivery': '2-3 Days within Dhaka, 4-6 Days Nationwide',
      };

      formatted.reviewsList = product.reviews?.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        body: r.body,
        customerName: r.customer?.name || 'Verified Buyer',
        date: r.createdAt,
      }));
    }

    return formatted;
  }

  private resolveTranslation(translations: any[], locale: string, field: string): any {
    if (!translations || translations.length === 0) return null;
    const match = translations.find((t) => t.locale === locale) || translations.find((t) => t.locale === 'EN_BD') || translations[0];
    return match ? match[field] : null;
  }
}
