import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '@/common/prisma.service';
import { RedisService } from '@/common/redis.service';
import { MeiliSearchService } from '@/common/meilisearch.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly meilisearch: MeiliSearchService,
  ) {}

  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe' })
  liveness() {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'kenakata-api',
      version: '0.1.0',
    };
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe with dependencies check' })
  async readiness() {
    let dbStatus = 'DOWN';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'UP';
    } catch {
      dbStatus = 'DOWN';
    }

    const redisStatus = this.redis.client ? 'UP' : 'OPTIONAL_OFFLINE';
    const meiliStatus = this.meilisearch.isAvailable ? 'UP' : 'OPTIONAL_OFFLINE';

    return {
      status: dbStatus === 'UP' ? 'UP' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbStatus,
        redis: redisStatus,
        meilisearch: meiliStatus,
      },
    };
  }
}
