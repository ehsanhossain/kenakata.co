import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { ProductFilterDto, CreateCategoryDto, CreateBrandDto, CreateProductDto } from './dto/catalog.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  @ApiOperation({ summary: 'List and filter products with search, pagination, and sorting' })
  async getProducts(@Query() filters: ProductFilterDto) {
    return this.catalogService.getProducts(filters);
  }

  @Get('products/featured')
  @ApiOperation({ summary: 'Get featured products for homepage showcase' })
  async getFeatured(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getFeaturedProducts(locale);
  }

  @Get('products/flash-deals')
  @ApiOperation({ summary: 'Get current flash deals with timer and stock' })
  async getFlashDeals(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getFlashDeals(locale);
  }

  @Get('products/new-arrivals')
  @ApiOperation({ summary: 'Get newest arrival products' })
  async getNewArrivals(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getNewArrivals(locale);
  }

  @Get('products/best-sellers')
  @ApiOperation({ summary: 'Get best seller products' })
  async getBestSellers(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getBestSellers(locale);
  }

  @Get('products/:slug')
  @ApiOperation({ summary: 'Get detailed product info by URL slug' })
  async getProductBySlug(@Param('slug') slug: string, @Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getProductBySlug(slug, locale);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get category tree with child subcategories' })
  async getCategories(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getCategories(locale);
  }

  @Get('categories/:slug')
  @ApiOperation({ summary: 'Get single category details with parent/child links' })
  async getCategoryBySlug(@Param('slug') slug: string, @Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getCategoryBySlug(slug, locale);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all active brands' })
  async getBrands(@Query('locale') locale?: 'EN_BD' | 'BN_BD') {
    return this.catalogService.getBrands(locale);
  }

  // ── Admin Endpoints ──
  @Post('admin/products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CATALOG_MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product with variants and bilingual descriptions (Admin)' })
  async createProduct(@Body() dto: CreateProductDto) {
    return this.catalogService.createProduct(dto);
  }

  @Post('admin/categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CATALOG_MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new category (Admin)' })
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.catalogService.createCategory(dto);
  }

  @Post('admin/brands')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CATALOG_MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new brand (Admin)' })
  async createBrand(@Body() dto: CreateBrandDto) {
    return this.catalogService.createBrand(dto);
  }
}
