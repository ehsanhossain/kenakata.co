const fs = require('fs');
const path = require('path');
const { slugify, cleanString, buildCategoryTaxonomy } = require('./category-taxonomy');

const dropshippingCatalogPath = path.join(__dirname, '..', 'Marchents', 'dropshipping.com.bd', 'products_catalog.json');
const resellerhubCatalogPath = path.join(__dirname, '..', 'data', 'resellerhub-catalog.json');
const outputSeedPath = path.join(__dirname, '..', 'apps', 'api', 'src', 'seed.ts');
const catalogSummaryPath = path.join(__dirname, '..', 'data', 'full_published_catalog_summary.json');

console.log('Reading catalogs from disk...');
const dropshippingProducts = JSON.parse(fs.readFileSync(dropshippingCatalogPath, 'utf8'));
const resellerhubProducts = fs.existsSync(resellerhubCatalogPath) 
  ? JSON.parse(fs.readFileSync(resellerhubCatalogPath, 'utf8')) 
  : [];

console.log(`Loaded ${dropshippingProducts.length} products from Dropshipping BD.`);
console.log(`Loaded ${resellerhubProducts.length} products from ResellerHub BD.`);

const { rootCategories, resolveCategory } = buildCategoryTaxonomy(dropshippingProducts, resellerhubProducts);

// Brand Detection mapping
const brandLookup = [
  { name: 'boAt', match: /\bboat\b/i, slug: 'boat' },
  { name: 'Apple', match: /\b(apple|iphone|airpods)\b/i, slug: 'apple' },
  { name: 'Baseus', match: /\bbaseus\b/i, slug: 'baseus' },
  { name: 'Awei', match: /\bawei\b/i, slug: 'awei' },
  { name: 'JBL', match: /\bjbl\b/i, slug: 'jbl' },
  { name: 'Havit', match: /\bhavit\b/i, slug: 'havit' },
  { name: 'Remax', match: /\bremax\b/i, slug: 'remax' },
  { name: 'MEIJUJI', match: /\bmeijuji\b/i, slug: 'meijuji' },
  { name: 'OLEVS', match: /\bolevs\b/i, slug: 'olevs' },
  { name: 'CASIO', match: /\bcasio\b/i, slug: 'casio' },
  { name: 'PLOKAMA', match: /\bplokama\b/i, slug: 'plokama' },
  { name: 'V380', match: /\bv380\b/i, slug: 'v380' },
  { name: 'MEMO', match: /\bmemo\b/i, slug: 'memo' },
  { name: 'Kemei', match: /\bkemei\b/i, slug: 'kemei' },
  { name: 'Snille', match: /\bsnille\b/i, slug: 'snille' },
  { name: 'VGR', match: /\bvgr\b/i, slug: 'vgr' },
  { name: 'Best Win', match: /\bbest\s*win\b/i, slug: 'best-win' },
  { name: 'Kenakata Choice', match: /.*/, slug: 'kenakata-choice' }
];

function detectBrand(title, text = '') {
  const combined = `${title} ${text}`;
  for (const b of brandLookup) {
    if (b.match.test(combined)) {
      return { name: b.name, slug: b.slug };
    }
  }
  return { name: 'Kenakata Choice', slug: 'kenakata-choice' };
}

// Extract brands
const brandsMap = new Map();
brandsMap.set('kenakata-choice', { slug: 'kenakata-choice', en: 'Kenakata Choice', bn: 'কেনাকাটা চয়েস' });

const normalizedProducts = [];
const usedSlugs = new Set();
const usedSkus = new Set();

// 1. Process Dropshipping BD Products
for (const p of dropshippingProducts) {
  const catResolution = resolveCategory(p.categories);
  const brand = detectBrand(p.name, p.detailsHtml);

  if (!brandsMap.has(brand.slug)) {
    brandsMap.set(brand.slug, { slug: brand.slug, en: brand.name, bn: brand.name });
  }

  let baseSlug = slugify(p.slug || p.name);
  let finalSlug = baseSlug;
  let counter = 1;
  while (usedSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${p.id}-${counter}`;
    counter++;
  }
  usedSlugs.add(finalSlug);

  const merchantSku = cleanString(p.sku || `DSP-${p.id}`);
  let customerSku = `KNK-DSP-${merchantSku}`;
  let skuCounter = 1;
  while (usedSkus.has(customerSku)) {
    customerSku = `KNK-DSP-${merchantSku}-${skuCounter}`;
    skuCounter++;
  }
  usedSkus.add(customerSku);

  const wholesalePrice = p.wholesalePrice || 500;
  const retailPrice = p.retailPrice || Math.round(wholesalePrice * 1.3);
  const compareAtPrice = Math.round(retailPrice * 1.25);

  const webImages = (p.localImageFiles || []).map(img => `/uploads/products/dropshipping-bd/${p.id}/${img}`);
  if (webImages.length === 0 && p.thumbnailUrl) {
    webImages.push(p.thumbnailUrl);
  }

  const rawDesc = cleanString(p.descriptionText || p.detailsHtml || p.name);
  const highlights = rawDesc
    .split('\n')
    .filter(l => l.length > 5 && l.length < 120 && !l.includes('TK') && !l.includes('Price') && !l.includes('SKU'))
    .slice(0, 5);

  normalizedProducts.push({
    merchantType: 'DROPSHIPPING_BD',
    shopSlug: 'dropshippingbd',
    partnerId: p.id,
    merchantSku: merchantSku,
    customerSku: customerSku,
    title: cleanString(p.name),
    titleBn: cleanString(p.name),
    slug: finalSlug,
    rootCategorySlug: catResolution.rootSlug,
    subCategorySlug: catResolution.subSlug,
    brandSlug: brand.slug,
    wholesalePrice: wholesalePrice,
    retailPrice: retailPrice,
    compareAtPrice: compareAtPrice,
    images: webImages,
    description: cleanString(p.detailsHtml || p.descriptionText),
    descriptionBn: cleanString(p.detailsHtml || p.descriptionText),
    highlights: highlights.length > 0 ? highlights : [cleanString(p.name)],
    highlightsBn: highlights.length > 0 ? highlights : [cleanString(p.name)],
    specifications: {
      "Wholesale Supplier": "Dropshipping BD Official",
      "Supplier SKU": merchantSku,
      "Customer SKU": customerSku,
      "Category": p.categories.join(' > ')
    },
    stockQty: 100
  });
}

// 2. Process ResellerHub BD Products
for (const p of resellerhubProducts) {
  let baseSlug = slugify(p.slug || p.title);
  let finalSlug = baseSlug;
  let counter = 1;
  while (usedSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  usedSlugs.add(finalSlug);

  const merchantSku = cleanString(p.sku || `RHB-${p.id}`);
  let customerSku = `KNK-RHB-${merchantSku}`;
  let skuCounter = 1;
  while (usedSkus.has(customerSku)) {
    customerSku = `KNK-RHB-${merchantSku}-${skuCounter}`;
    skuCounter++;
  }
  usedSkus.add(customerSku);

  if (p.brandSlug && !brandsMap.has(p.brandSlug)) {
    brandsMap.set(p.brandSlug, { slug: p.brandSlug, en: p.brand || p.brandSlug, bn: p.brand || p.brandSlug });
  }

  normalizedProducts.push({
    merchantType: 'RESELLERHUB_BD',
    shopSlug: 'resellerhubbd',
    partnerId: p.id || p.folderId,
    merchantSku: merchantSku,
    customerSku: customerSku,
    title: cleanString(p.title),
    titleBn: cleanString(p.titleBn || p.title),
    slug: finalSlug,
    rootCategorySlug: p.mainCategorySlug || 'gadgets',
    subCategorySlug: p.categorySlug || 'electronics',
    brandSlug: p.brandSlug || 'kenakata-choice',
    wholesalePrice: Math.round(p.price * 0.75),
    retailPrice: p.price,
    compareAtPrice: p.compareAt || Math.round(p.price * 1.3),
    images: p.images || [],
    description: cleanString(p.description),
    descriptionBn: cleanString(p.descriptionBn || p.description),
    highlights: p.highlights || [p.title],
    highlightsBn: p.highlightsBn || [p.titleBn || p.title],
    specifications: {
      "Wholesale Supplier": "ResellerHub BD",
      "Supplier SKU": merchantSku,
      "Customer SKU": customerSku
    },
    stockQty: 50
  });
}

console.log(`\n======================================================`);
console.log(`TOTAL NORMALIZED PRODUCTS READY TO PUBLISH: ${normalizedProducts.length}`);
console.log(`TOTAL BRANDS: ${brandsMap.size}`);
console.log(`======================================================\n`);

// Build final categories JSON structure for prisma
const categoriesArray = Array.from(rootCategories.values()).map(r => ({
  slug: r.slug,
  en: r.en,
  bn: r.bn,
  order: r.order,
  children: Object.values(r.sub).map(s => ({
    slug: s.slug,
    en: s.en,
    bn: s.bn
  }))
}));

const brandsArray = Array.from(brandsMap.values());

// Save summary json
fs.writeFileSync(catalogSummaryPath, JSON.stringify({
  totalProducts: normalizedProducts.length,
  categoriesCount: categoriesArray.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0),
  brandsCount: brandsArray.length,
  dropshippingCount: dropshippingProducts.length,
  resellerhubCount: resellerhubProducts.length,
  generatedAt: new Date().toISOString()
}, null, 2), 'utf8');

// Generate seed file content
// To prevent huge string concatenation issues in TypeScript, we embed the data cleanly
const seedDataPath = path.join(__dirname, '..', 'data', 'seed_full_catalog_data.json');
fs.writeFileSync(seedDataPath, JSON.stringify({
  categories: categoriesArray,
  brands: brandsArray,
  products: normalizedProducts
}, null, 2), 'utf8');

console.log(`Saved master seed dataset to ${seedDataPath}`);

const tsCode = `import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Kenakata Full Production Catalog Seed...');
  
  const seedDataPath = path.join(__dirname, '..', '..', 'data', 'seed_full_catalog_data.json');
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
  
  const { categories, brands, products } = seedData;
  console.log(\`Loaded \${products.length} products, \${categories.length} root categories, \${brands.length} brands.\`);

  // 1. Clean previous catalog tables safely
  console.log('1. Cleaning previous catalog tables...');
  try {
    await prisma.$executeRawUnsafe(\`
      TRUNCATE TABLE 
        inventory_reservations,
        inventory_ledger,
        inventory_balances,
        cart_items,
        prices,
        product_media,
        product_translations,
        product_variants,
        products,
        category_translations,
        categories
      CASCADE;
    \`);
  } catch (e) {
    console.log('Cleanup note:', e.message);
  }

  // 2. Roles & Permissions
  console.log('2. Seeding Roles and Permissions...');
  await prisma.role.upsert({
    where: { code: 'SUPER_ADMIN' },
    update: {},
    create: { code: 'SUPER_ADMIN', name: 'Super Administrator', description: 'Full system access' },
  });
  await prisma.role.upsert({
    where: { code: 'CATALOG_MANAGER' },
    update: {},
    create: { code: 'CATALOG_MANAGER', name: 'Catalog Manager', description: 'Can manage catalog' },
  });

  // 3. Central Warehouse
  console.log('3. Seeding Central Dhaka Warehouse...');
  const warehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-DHK-01' },
    update: { isActive: true },
    create: {
      code: 'WH-DHK-01',
      name: 'Dhaka Central Hub',
      address: { city: 'Dhaka', address: 'Tejgaon Industrial Area' },
      timezone: 'Asia/Dhaka',
      isActive: true,
    },
  });

  // 4. Merchants & Shops
  console.log('4. Seeding Verified Partner Merchants & Shops...');
  const merchantPasswordHash = await bcrypt.hash('Merchant@123456', 10);

  // Merchant 1: Dropshipping BD Official
  const dropshippingMerchant = await prisma.merchant.upsert({
    where: { email: 'dropshippingbd@kenakata.co' },
    update: { status: 'APPROVED', verifiedAt: new Date() },
    create: {
      email: 'dropshippingbd@kenakata.co',
      phone: '+8801728485858',
      name: 'Dropshipping BD Official',
      passwordHash: merchantPasswordHash,
      status: 'APPROVED',
      commissionRate: 5.0,
      verifiedAt: new Date(),
      verifiedBy: 'Kenakata Master Admin',
      shop: {
        create: {
          name: 'Dropshipping BD',
          slug: 'dropshippingbd',
          description: 'Official verified wholesale dropshipping supplier & merchant on Kenakata.co.',
          entityType: 'PRIVATE_LIMITED',
          contactPhone: '+8801728485858',
          contactEmail: 'dropshippingbd@kenakata.co',
          division: 'Dhaka',
          district: 'Dhaka',
          isVerified: true,
          rating: 4.9,
          totalSalesMinor: BigInt(125000000),
        },
      },
    },
    include: { shop: true },
  });

  // Merchant 2: ResellerHub BD
  const resellerMerchant = await prisma.merchant.upsert({
    where: { email: 'merchant@resellerhubbd.com' },
    update: { status: 'APPROVED', verifiedAt: new Date() },
    create: {
      email: 'merchant@resellerhubbd.com',
      phone: '+8801700000001',
      name: 'ResellerHub BD Official',
      passwordHash: merchantPasswordHash,
      status: 'APPROVED',
      commissionRate: 4.5,
      verifiedAt: new Date(),
      verifiedBy: 'Kenakata Master Admin',
      shop: {
        create: {
          name: 'ResellerHub BD',
          slug: 'resellerhubbd',
          description: 'Official verified merchant & wholesale supplier for gadgets and living.',
          entityType: 'PRIVATE_LIMITED',
          contactPhone: '+8801700000001',
          contactEmail: 'merchant@resellerhubbd.com',
          division: 'Dhaka',
          district: 'Dhaka',
          isVerified: true,
          rating: 4.9,
          totalSalesMinor: BigInt(54200000),
        },
      },
    },
    include: { shop: true },
  });

  const shopMap = {
    'dropshippingbd': dropshippingMerchant.shop?.id,
    'resellerhubbd': resellerMerchant.shop?.id
  };

  // 5. Categories Taxonomy
  console.log('5. Seeding Categories Taxonomy...');
  const categoryIdMap = new Map<string, string>();

  for (const root of categories) {
    const parent = await prisma.category.upsert({
      where: { slug: root.slug },
      update: { status: 'ACTIVE' },
      create: {
        slug: root.slug,
        sortOrder: root.order || 0,
        status: 'ACTIVE',
        translations: {
          create: [
            { locale: 'EN_BD', name: root.en },
            { locale: 'BN_BD', name: root.bn },
          ],
        },
      },
    });
    categoryIdMap.set(root.slug, parent.id);

    if (root.children) {
      for (const child of root.children) {
        const sub = await prisma.category.upsert({
          where: { slug: child.slug },
          update: { parentId: parent.id, status: 'ACTIVE' },
          create: {
            slug: child.slug,
            parentId: parent.id,
            status: 'ACTIVE',
            translations: {
              create: [
                { locale: 'EN_BD', name: child.en },
                { locale: 'BN_BD', name: child.bn },
              ],
            },
          },
        });
        categoryIdMap.set(child.slug, sub.id);
      }
    }
  }

  // 6. Brands
  console.log('6. Seeding Brands...');
  const brandIdMap = new Map<string, string>();
  for (const b of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { status: 'ACTIVE' },
      create: {
        slug: b.slug,
        status: 'ACTIVE',
        translations: {
          create: [
            { locale: 'EN_BD', name: b.en },
            { locale: 'BN_BD', name: b.bn },
          ],
        },
      },
    });
    brandIdMap.set(b.slug, brand.id);
  }

  // 7. Products Ingestion (Batch inserts)
  console.log(\`7. Ingesting \${products.length} Products with Dual-SKU Architecture...\`);
  
  let inserted = 0;
  const batchSize = 50;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    for (const p of batch) {
      const categoryId = categoryIdMap.get(p.subCategorySlug) || categoryIdMap.get(p.rootCategorySlug) || categoryIdMap.get('gadgets')!;
      const brandId = brandIdMap.get(p.brandSlug);
      const shopId = shopMap[p.shopSlug] || dropshippingMerchant.shop?.id;

      try {
        await prisma.product.create({
          data: {
            slug: p.slug,
            categoryId,
            brandId,
            shopId,
            status: 'ACTIVE',
            approvalStatus: 'APPROVED',
            approvedAt: new Date(),
            approvedBy: 'Kenakata Master Admin',
            publishedAt: new Date(),
            returnPolicyCode: 'STANDARD_7_DAY',
            taxClassCode: 'STANDARD_VAT_15',
            translations: {
              create: [
                {
                  locale: 'EN_BD',
                  title: p.title,
                  shortDescription: p.highlights?.slice(0, 3).join(' • ') || p.title,
                  description: p.description,
                  specifications: p.specifications,
                  highlights: p.highlights,
                },
                {
                  locale: 'BN_BD',
                  title: p.titleBn || p.title,
                  shortDescription: p.highlightsBn?.slice(0, 3).join(' • ') || p.titleBn,
                  description: p.descriptionBn || p.description,
                  specifications: p.specifications,
                  highlights: p.highlightsBn || p.highlights,
                },
              ],
            },
            media: {
              create: (p.images || []).map((url: string, idx: number) => ({
                objectKey: url,
                mediaType: 'image/jpeg',
                altEn: \`\${p.title} - Image \${idx + 1}\`,
                altBn: \`\${p.titleBn || p.title} - ছবি \${idx + 1}\`,
                sortOrder: idx,
              })),
            },
            variants: {
              create: [
                {
                  sku: p.customerSku,
                  barcode: p.merchantSku,
                  title: 'Standard',
                  optionValues: {
                    merchantSku: p.merchantSku,
                    customerSku: p.customerSku,
                    wholesalePrice: p.wholesalePrice,
                    retailPrice: p.retailPrice,
                    partner: p.merchantType,
                    partnerId: p.partnerId
                  },
                  prices: {
                    create: {
                      currency: 'BDT',
                      amountMinor: BigInt(p.retailPrice * 100),
                      compareAtMinor: BigInt(p.compareAtPrice * 100),
                    },
                  },
                  inventory: {
                    create: [
                      {
                        warehouseId: warehouse.id,
                        onHand: p.stockQty || 100,
                        reserved: 0,
                        safetyStock: 5,
                      },
                    ],
                  },
                },
              ],
            },
          },
        });
        inserted++;
      } catch (err) {
        console.error(\`Failed to insert product \${p.slug}: \${err.message}\`);
      }
    }
    console.log(\`Inserted \${inserted}/\${products.length} products...\`);
  }

  // 8. Promotional Coupons
  console.log('8. Seeding Promotional Coupons...');
  const coupons = [
    {
      code: 'KENA10',
      name: 'Kenakata Welcome 10% Discount',
      type: 'COUPON' as const,
      discountKind: 'PERCENTAGE' as const,
      value: 10,
      rules: { minOrderMinor: 50000, maxDiscountMinor: 50000 },
    },
    {
      code: 'DROPSHIP5',
      name: 'Dropshipping Special 5% Discount',
      type: 'COUPON' as const,
      discountKind: 'PERCENTAGE' as const,
      value: 5,
      rules: { minOrderMinor: 100000, maxDiscountMinor: 100000 },
    },
    {
      code: 'FREESHIP',
      name: 'Free Delivery Across Bangladesh',
      type: 'COUPON' as const,
      discountKind: 'FREE_SHIPPING' as const,
      value: 0,
      rules: { minOrderMinor: 150000 },
    },
  ];

  for (const c of coupons) {
    await prisma.promotion.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        name: c.name,
        type: c.type,
        discountKind: c.discountKind,
        value: c.value,
        rules: c.rules,
        startsAt: new Date(),
        isActive: true,
      },
    });
  }

  console.log(\`\n======================================================\`);
  console.log(\`✅ FULL PRODUCTION SEED COMPLETE: \${inserted} PRODUCTS SEEDED!\`);
  console.log(\`======================================================\\n\`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync(outputSeedPath, tsCode, 'utf8');
console.log(`Generated TypeScript seeder at ${outputSeedPath}`);
