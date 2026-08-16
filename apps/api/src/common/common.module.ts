import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { MeiliSearchService } from './meilisearch.service';

@Global()
@Module({
  providers: [PrismaService, RedisService, MeiliSearchService],
  exports: [PrismaService, RedisService, MeiliSearchService],
})
export class CommonModule {}
