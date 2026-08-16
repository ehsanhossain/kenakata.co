import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search catalog with typo-tolerance and multi-attribute filters' })
  async search(
    @Query('q') q: string,
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('locale') locale?: 'EN_BD' | 'BN_BD',
  ) {
    return this.searchService.search(q, {
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      locale,
    });
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get instant auto-complete suggestions for search header bar' })
  async getSuggestions(@Query('q') q: string) {
    return this.searchService.getSuggestions(q);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get popular trending search queries in Bangladesh' })
  async getTrending() {
    return this.searchService.getTrendingSearches();
  }
}
