#!/usr/bin/env bash
set -e

echo "=================================================="
echo "🚀 KENAKATA.CO DIRECT VPS PRODUCTION DEPLOYMENT"
echo "   Target: /var/www/kenakata (Hetzner VPS 91.98.166.101)"
echo "=================================================="

cd /var/www/kenakata

echo "📦 Pulling latest code from master..."
git fetch origin master
git reset --hard origin/master

echo "🔨 Building production Docker containers..."
docker compose -f docker-compose.prod.yml build

echo "🚀 Starting containers with Traefik ingress..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "🧹 Cleaning unused docker dangling images..."
docker image prune -f

echo "=================================================="
echo "✅ Direct VPS Deployment Complete!"
echo "   - Storefront: https://kenakata.co"
echo "   - Admin:      https://base.kenakata.co"
echo "   - Shop:       https://shop.kenakata.co"
echo "=================================================="
