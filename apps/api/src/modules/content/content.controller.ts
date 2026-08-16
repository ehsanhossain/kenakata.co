import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('Content & Marketing')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('hero-banners')
  @ApiOperation({ summary: 'Get active homepage hero promotional banners' })
  async getHeroBanners(@Query('locale') locale?: string) {
    return this.contentService.getHeroBanners(locale);
  }

  @Get('faqs')
  @ApiOperation({ summary: 'Get bilingual help center and customer FAQs' })
  async getFaqs(@Query('locale') locale?: string) {
    return this.contentService.getFaqs(locale);
  }
}
