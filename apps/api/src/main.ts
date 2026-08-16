import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('KenakataBootstrap');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:9000',
        'http://localhost:9001',
        'http://localhost:9002',
        'http://127.0.0.1:9000',
        'http://127.0.0.1:9001',
        'http://127.0.0.1:9002',
        'https://kenakata.co',
        'https://www.kenakata.co',
        'https://base.kenakata.co',
        'https://shop.kenakata.co',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'idempotency-key', 'x-locale'],
    },
  });

  // Global prefix for all API routes
  app.setGlobalPrefix('api/v1', {
    exclude: ['health/liveness', 'health/readiness'],
  });

  // Global validation pipe with class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global response transformer and exception filter
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger OpenAPI documentation setup
  const config = new DocumentBuilder()
    .setTitle('Kenakata.co Core Commerce API')
    .setDescription("Enterprise e-commerce API for Bangladesh's Trusted Online Store")
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Catalog', 'Products, categories, brands, and variant listings')
    .addTag('Cart', 'Guest and customer cart operations')
    .addTag('Checkout', 'Quotes, delivery calculation, and order placement')
    .addTag('Orders', 'Order tracking, history, and status state machine')
    .addTag('Auth', 'Customer phone OTP and Admin authentication')
    .addTag('Customer', 'Profile, address book, and wishlist')
    .addTag('Payments', 'bKash, SSLCommerz, and COD gateways')
    .addTag('Promotions & Coupons', 'Discount calculations and promo codes')
    .addTag('Reviews', 'Verified buyer reviews and ratings')
    .addTag('Search', 'Catalog search and auto-complete')
    .addTag('Content & Marketing', 'Banners, promotions, and customer FAQs')
    .addTag('Health', 'Liveness and readiness probes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Kenakata API Docs',
  });

  const port = process.env.PORT || process.env.API_PORT || 4000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Kenakata Core API is running on: http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger API Docs available at: http://localhost:${port}/api/docs`);
  logger.log(`❤️ Health probes at: http://localhost:${port}/health/liveness and /health/readiness`);
}

bootstrap().catch((err) => {
  console.error('Fatal error starting Kenakata API:', err);
  process.exit(1);
});
