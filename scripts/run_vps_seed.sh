#!/bin/bash
set -e

echo "=================================================="
echo "🌱 RUNNING KENAKATA FULL PRODUCTION DATABASE SEED"
echo "=================================================="

cd /var/www/kenakata

docker run --rm --network coolify \
  -v /var/www/kenakata/data:/app/data \
  -v /var/www/kenakata/apps/api/src/seed.ts:/app/apps/api/src/seed.ts \
  -e DATABASE_URL="postgresql://postgres:Rf9R1QaaYCjQJ9gWlSSuwUxJjImJY1sw@supabase-db:5432/kenakata_db?schema=public" \
  kenakata-admin:latest \
  sh -c "pnpm prisma db push --schema=database/schema.prisma --accept-data-loss && pnpm tsx apps/api/src/seed.ts"

echo "=================================================="
echo "✅ DATABASE SEED FINISHED SUCCESSFULLY!"
echo "=================================================="
