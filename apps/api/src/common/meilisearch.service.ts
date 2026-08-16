import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class MeiliSearchService implements OnModuleInit {
  private readonly logger = new Logger(MeiliSearchService.name);
  public client: MeiliSearch | null = null;
  public isAvailable = false;

  async onModuleInit() {
    const host = process.env.MEILISEARCH_URL || 'http://localhost:7700';
    const apiKey = process.env.MEILISEARCH_KEY || 'kenakata_dev_meilisearch_key_32chars';

    try {
      this.client = new MeiliSearch({ host, apiKey });
      const health = await this.client.health();
      if (health.status === 'available') {
        this.isAvailable = true;
        this.logger.log(`Meilisearch connected and healthy at ${host}`);
        await this.ensureIndexes();
      }
    } catch (err: any) {
      this.logger.warn(`Meilisearch not reachable (${err.message}). Catalog search will fallback to PostgreSQL full-text search.`);
      this.isAvailable = false;
    }
  }

  private async ensureIndexes() {
    if (!this.client || !this.isAvailable) return;
    try {
      const index = this.client.index('products');
      await index.updateSearchableAttributes(['title', 'titleBn', 'description', 'brand', 'category', 'sku']);
      await index.updateFilterableAttributes(['categorySlug', 'brandSlug', 'status', 'minPrice', 'maxPrice', 'inStock']);
      await index.updateSortableAttributes(['price', 'createdAt', 'rating', 'salesCount']);
    } catch (e: any) {
      this.logger.warn(`Failed to configure Meilisearch index: ${e.message}`);
    }
  }

  async searchProducts(query: string, options: any = {}) {
    if (!this.client || !this.isAvailable) return null;
    try {
      const index = this.client.index('products');
      return await index.search(query, options);
    } catch {
      return null;
    }
  }

  async indexProducts(documents: any[]) {
    if (!this.client || !this.isAvailable || !documents.length) return;
    try {
      const index = this.client.index('products');
      await index.addDocuments(documents);
    } catch (e: any) {
      this.logger.warn(`Failed indexing to Meilisearch: ${e.message}`);
    }
  }
}
