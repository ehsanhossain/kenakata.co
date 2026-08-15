# Kenakata.co — কেনাকাটা

> Bangladesh's Trusted Online Store

## Architecture

- **Storefront** — Next.js 15 (port 9000)
- **Admin** — Next.js 15 (port 9001)
- **API** — NestJS (port 4000) *(planned)*
- **Database** — PostgreSQL 17
- **Search** — Meilisearch
- **Cache** — Redis 8
- **Storage** — MinIO (S3-compatible)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start infrastructure
docker compose -f ops/docker-compose.local.yml up -d

# Start storefront
pnpm --filter @kenakata/storefront dev

# Start admin
pnpm --filter @kenakata/admin dev
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | NestJS, Prisma 7 |
| Database | PostgreSQL 17 |
| Search | Meilisearch |
| Storage | MinIO |
| Deployment | Coolify + Docker + Traefik |
| CDN/DNS | Cloudflare |

## License

Private — All rights reserved.
