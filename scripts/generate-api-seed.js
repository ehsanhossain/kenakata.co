const fs = require('fs');
const path = require('path');

const catalogJsonPath = path.join(__dirname, '..', 'data', 'resellerhub-catalog.json');
const products = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));

// Extract brands
const brandSet = new Map();
products.forEach(p => {
  if (!brandSet.has(p.brandSlug)) {
    brandSet.set(p.brandSlug, { slug: p.brandSlug, en: p.brand, bn: p.brand });
  }
});
const brandsData = Array.from(brandSet.values());

// Categories data
const categoriesData = [
  {
    slug: 'gadgets',
    en: 'Gadgets & Electronics',
    bn: 'গ্যাজেটস ও ইলেকট্রনিক্স',
    order: 1,
    children: [
      { slug: 'camera', en: 'Security & Action Cameras', bn: 'ক্যামেরা ও সিসিটিভি' },
      { slug: 'earbuds', en: 'Earbuds & Audio', bn: 'ইয়ারবাডস ও হেডফোন' },
      { slug: 'electronics', en: 'Smart Electronics & Gadgets', bn: 'স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস' },
      { slug: 'fan', en: 'Rechargeable Fans', bn: 'রিচার্জেবল ও পোর্টেবল ফ্যান' },
      { slug: 'light', en: 'Smart Lights & Lamps', bn: 'স্মার্ট লাইট ও ল্যাম্প' },
      { slug: 'mobile-accessories', en: 'Mobile Accessories', bn: 'মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক' },
      { slug: 'mobile-phone', en: 'Feature & Mini Phones', bn: 'ফিচার ও মিনি ফোন' },
      { slug: 'mouse-keyboard', en: 'Keyboards & Mice', bn: 'কীবোর্ড ও মাউস' },
      { slug: 'pillow', en: 'Comfort & Health Pillows', bn: 'পিলো ও ব্যাক সাপোর্ট' },
      { slug: 'printer', en: 'Thermal & Label Printers', bn: 'থার্মাল প্রিন্টার' },
      { slug: 'speaker', en: 'Bluetooth Speakers & Sound', bn: 'ব্লুটুথ স্পিকার ও অডিও' },
      { slug: 'ups', en: 'Mini Router UPS', bn: 'মিনি রাউটার ইউপিএস' },
    ]
  },
  {
    slug: 'home-appliance',
    en: 'Home & Living',
    bn: 'হোম অ্যাপ্লায়েন্সেস',
    order: 2,
    children: [
      { slug: 'bed-sheets', en: '3D Bed Sheets & Bedding', bn: 'থ্রিডি বেডশিট ও বেডিং' },
    ]
  }
];

const seedContent = `import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categoriesData = ${JSON.stringify(categoriesData, null, 2)};
const brandsData = ${JSON.stringify(brandsData, null, 2)};
const rawProducts = ${JSON.stringify(products, null, 2)};

async function main() {
  console.log('🌱 Starting Kenakata database seed (ResellerHub BD Verified Catalog)...');

  // 1. Clean up catalog data cleanly
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
  const superAdminRole = await prisma.role.upsert({
    where: { code: 'SUPER_ADMIN' },
    update: {},
    create: {
      code: 'SUPER_ADMIN',
      name: 'Super Administrator',
      description: 'Full system access across all modules and settings',
    },
  });

  const catalogManagerRole = await prisma.role.upsert({
    where: { code: 'CATALOG_MANAGER' },
    update: {},
    create: {
      code: 'CATALOG_MANAGER',
      name: 'Catalog Manager',
      description: 'Can manage products, categories, brands, and prices',
    },
  });

  const orderManagerRole = await prisma.role.upsert({
    where: { code: 'ORDER_MANAGER' },
    update: {},
    create: {
      code: 'ORDER_MANAGER',
      name: 'Order Fulfillment Manager',
      description: 'Can view and update order processing and fulfillment',
    },
  });

  // 3. Admin User
  console.log('3. Seeding Master Admin User...');
  const passwordHash = await bcrypt.hash('Admin@123456', 10);
  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'admin@kenakata.co' },
    update: { passwordHash },
    create: {
      email: 'admin@kenakata.co',
      name: 'Kenakata Master Admin',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  await prisma.adminUserRole.upsert({
    where: {
      adminUserId_roleId_scopeKey: {
        adminUserId: adminUser.id,
        roleId: superAdminRole.id,
        scopeKey: 'GLOBAL',
      },
    },
    update: {},
    create: {
      adminUserId: adminUser.id,
      roleId: superAdminRole.id,
      scopeKey: 'GLOBAL',
    },
  });

  // 4. Warehouses
  console.log('4. Seeding Central Warehouses...');
  const dhakaWarehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-DHK-01' },
    update: {},
    create: {
      code: 'WH-DHK-01',
      name: 'Dhaka Central Distribution Hub',
      address: {
        line: 'Plot 42, Tejgaon I/A',
        city: 'Dhaka',
        division: 'Dhaka',
        postalCode: '1208',
      },
      timezone: 'Asia/Dhaka',
      isActive: true,
    },
  });

  const ctgWarehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-CTG-01' },
    update: {},
    create: {
      code: 'WH-CTG-01',
      name: 'Chattogram Port Fulfilment Center',
      address: {
        line: 'Agrabad Commercial Area',
        city: 'Chattogram',
        division: 'Chattogram',
        postalCode: '4100',
      },
      timezone: 'Asia/Dhaka',
      isActive: true,
    },
  });

  // 5. Verified Merchant & Shop: ResellerHub BD
  console.log('5. Seeding ResellerHub BD as Verified Merchant & Shop...');
  const merchantPasswordHash = await bcrypt.hash('Merchant@123456', 10);
  const resellerMerchant = await prisma.merchant.upsert({
    where: { email: 'merchant@resellerhubbd.com' },
    update: {
      status: 'APPROVED',
      verifiedAt: new Date(),
      verifiedBy: 'Kenakata Master Admin',
    },
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
          description: 'Official verified merchant & wholesale supplier for premium smart gadgets, mobile accessories, and home living in Bangladesh.',
          entityType: 'PRIVATE_LIMITED',
          tradeLicenseNo: 'TL-DHK-2026-7890',
          tradeLicenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          tinNo: '198765432109',
          binNo: '987654321012',
          nidNo: '19922692812345678',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Gulshan',
          fullAddress: 'Suite 802, Level 8, Police Plaza Concord, Gulshan 1, Dhaka 1212',
          pickupAddress: 'Warehouse B, Tejgaon Industrial Area, Dhaka',
          contactPhone: '+8801700000001',
          contactEmail: 'merchant@resellerhubbd.com',
          logoUrl: '/logo.svg',
          bannerUrl: '/banner.png',
          isVerified: true,
          rating: 4.9,
          totalSalesMinor: BigInt(54200000),
        },
      },
      kycDocuments: {
        create: [
          {
            documentType: 'TRADE_LICENSE',
            documentNumber: 'TL-DHK-2026-7890',
            fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
            fileName: 'Trade_License_ResellerHubBD.pdf',
            fileSize: 1540000,
            mimeType: 'application/pdf',
            status: 'VERIFIED',
            verifiedAt: new Date(),
            verifiedBy: 'Kenakata Master Admin',
          },
          {
            documentType: 'NID_FRONT',
            documentNumber: '19922692812345678',
            fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
            fileName: 'NID_ResellerHub_Director.jpg',
            fileSize: 890000,
            mimeType: 'image/jpeg',
            status: 'VERIFIED',
            verifiedAt: new Date(),
            verifiedBy: 'Kenakata Master Admin',
          },
          {
            documentType: 'TIN_CERTIFICATE',
            documentNumber: '198765432109',
            fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800',
            fileName: 'eTIN_ResellerHubBD.pdf',
            fileSize: 720000,
            mimeType: 'application/pdf',
            status: 'VERIFIED',
            verifiedAt: new Date(),
            verifiedBy: 'Kenakata Master Admin',
          },
        ],
      },
      bankAccounts: {
        create: [
          {
            accountType: 'BANK_ACCOUNT',
            bankName: 'City Bank PLC',
            branchName: 'Gulshan Avenue Branch',
            routingNumber: '085261456',
            accountHolderName: 'ResellerHub BD Ltd',
            accountNumber: '1102983746501',
            isDefault: true,
            isVerified: true,
          },
        ],
      },
    },
    include: { shop: true },
  });

  const shopId = resellerMerchant.shop?.id;

  // 6. Categories
  console.log('6. Seeding Categories Hierarchy...');
  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { status: 'ACTIVE' },
      create: {
        slug: cat.slug,
        sortOrder: cat.order,
        status: 'ACTIVE',
        translations: {
          create: [
            { locale: 'EN_BD', name: cat.en },
            { locale: 'BN_BD', name: cat.bn },
          ],
        },
      },
    });
    categoryMap.set(cat.slug, parent.id);

    if (cat.children) {
      for (const child of cat.children) {
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
        categoryMap.set(child.slug, sub.id);
      }
    }
  }

  // 7. Brands
  console.log('7. Seeding Brands...');
  const brandMap = new Map<string, string>();
  for (const b of brandsData) {
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
    brandMap.set(b.slug, brand.id);
  }

  // 8. Products Catalog (74 Products)
  console.log(\`8. Seeding \${rawProducts.length} Real Products from ResellerHub BD...\`);
  for (const p of rawProducts) {
    const categoryId = categoryMap.get(p.categorySlug) || categoryMap.get(p.mainCategorySlug) || categoryMap.get('gadgets')!;
    const brandId = brandMap.get(p.brandSlug);

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        categoryId,
        brandId,
        shopId,
        status: 'ACTIVE',
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: 'Kenakata Master Admin',
        publishedAt: new Date(),
      },
      create: {
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
              specifications: p.specificationsBn || p.specifications,
              highlights: p.highlightsBn || p.highlights,
            },
          ],
        },
        media: {
          create: p.images.map((url: string, i: number) => ({
            objectKey: url,
            mediaType: 'image/jpeg',
            altEn: \`\${p.title} image \${i + 1}\`,
            altBn: \`\${p.titleBn} ছবি \${i + 1}\`,
            sortOrder: i,
          })),
        },
        variants: {
          create: [
            {
              sku: p.sku,
              title: 'Standard',
              optionValues: { Edition: 'Official BD' },
              prices: {
                create: {
                  currency: 'BDT',
                  amountMinor: BigInt(p.price),
                  compareAtMinor: p.compareAt ? BigInt(p.compareAt) : null,
                },
              },
              inventory: {
                create: [
                  {
                    warehouseId: dhakaWarehouse.id,
                    onHand: p.stockQty || 50,
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
  }

  // 9. Promotional Coupons
  console.log('9. Seeding Promotional Coupons...');
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
      code: 'RESELLER5',
      name: 'ResellerHub BD Special 5% Discount',
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

  console.log('✅ Kenakata Seed Completed Successfully!');
  console.log('Master Admin: admin@kenakata.co / Admin@123456');
  console.log('Verified Merchant: merchant@resellerhubbd.com / Merchant@123456 (ResellerHub BD)');
  console.log(\`Total Products Seeded: \${rawProducts.length}\`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

const seedTsPath = path.join(__dirname, '..', 'apps', 'api', 'src', 'seed.ts');
fs.writeFileSync(seedTsPath, seedContent, 'utf8');
console.log(`Generated ${seedTsPath} with ${products.length} products and ResellerHub BD merchant.`);
