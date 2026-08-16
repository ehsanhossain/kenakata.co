import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Kenakata database seed...');

  // 1. Roles & Permissions
  console.log('1. Seeding Roles and Permissions...');
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

  // 2. Admin User
  console.log('2. Seeding Admin User...');
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

  // 3. Warehouses
  console.log('3. Seeding Warehouses...');
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

  // 4. Categories
  console.log('4. Seeding Categories...');
  const categoriesData = [
    {
      slug: 'electronics',
      en: 'Electronics & Gadgets',
      bn: 'ইলেকট্রনিক্স ও গ্যাজেট',
      order: 1,
      children: [
        { slug: 'smartphones', en: 'Smartphones', bn: 'স্মার্টফোন' },
        { slug: 'laptops', en: 'Laptops & Computers', bn: 'ল্যাপটপ ও কম্পিউটার' },
        { slug: 'audio', en: 'Headphones & Audio', bn: 'হেডফোন ও অডিও' },
        { slug: 'appliances', en: 'Home Appliances', bn: 'হোম অ্যাপ্লায়েন্সেস' },
      ],
    },
    {
      slug: 'fashion',
      en: 'Fashion & Lifestyle',
      bn: 'ফ্যাশন ও লাইফস্টাইল',
      order: 2,
      children: [
        { slug: 'mens-wear', en: "Men's Fashion", bn: 'পুরুষদের পোশাক' },
        { slug: 'womens-wear', en: "Women's Fashion", bn: 'নারীদের পোশাক' },
        { slug: 'footwear', en: 'Footwear & Shoes', bn: 'জুতা ও স্যান্ডেল' },
      ],
    },
    {
      slug: 'home-living',
      en: 'Home & Living',
      bn: 'হোম ও লিভিং',
      order: 3,
      children: [
        { slug: 'kitchen-dining', en: 'Kitchen & Dining', bn: 'রান্নাঘর ও ডাইনিং' },
        { slug: 'bedding', en: 'Bedding & Furniture', bn: 'বেডিং ও ফার্নিচার' },
      ],
    },
    {
      slug: 'groceries',
      en: 'Groceries & Gourmet',
      bn: 'মুদি ও খাবার সামগ্রী',
      order: 4,
      children: [
        { slug: 'cooking-essentials', en: 'Cooking Essentials', bn: 'রান্নার তেল ও মসলা' },
        { slug: 'tea-coffee', en: 'Tea, Coffee & Beverages', bn: 'চা ও কফি' },
      ],
    },
    {
      slug: 'beauty-health',
      en: 'Beauty & Personal Care',
      bn: 'বিউটি ও পার্সোনাল কেয়ার',
      order: 5,
      children: [
        { slug: 'skincare', en: 'Skincare Serums & Creams', bn: 'স্কিনকেয়ার' },
        { slug: 'haircare', en: 'Hair Care & Shampoos', bn: 'হেয়ার কেয়ার' },
      ],
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
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
          update: {},
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

  // 5. Brands
  console.log('5. Seeding Brands...');
  const brandsData = [
    { slug: 'samsung', en: 'Samsung', bn: 'স্যামসাং' },
    { slug: 'xiaomi', en: 'Xiaomi', bn: 'শাওমি' },
    { slug: 'apple', en: 'Apple', bn: 'অ্যাপল' },
    { slug: 'walton', en: 'Walton', bn: 'ওয়ালটন' },
    { slug: 'aarong', en: 'Aarong', bn: 'আড়ং' },
    { slug: 'apex', en: 'Apex', bn: 'এপেক্স' },
    { slug: 'bata', en: 'Bata', bn: 'বাটা' },
    { slug: 'philips', en: 'Philips', bn: 'ফিলিপস' },
    { slug: 'anker', en: 'Anker', bn: 'অ্যাংকার' },
    { slug: 'radhuni', en: 'Radhuni', bn: 'রাঁধুনী' },
  ];

  const brandMap = new Map<string, string>();
  for (const b of brandsData) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
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

  // 6. Products Catalog
  console.log('6. Seeding Comprehensive Products Catalog...');
  const productsData = [
    {
      slug: 'samsung-galaxy-a55-5g',
      category: 'smartphones',
      brand: 'samsung',
      titleEn: 'Samsung Galaxy A55 5G (8GB/128GB)',
      titleBn: 'স্যামসাং গ্যালাক্সি এ৫৫ ৫জি (৮জিবি/১২৮জিবি)',
      shortEn: 'Premium glass design, Super AMOLED 120Hz display, and 50MP OIS camera with Official Samsung BD Warranty.',
      shortBn: 'প্রিমিয়াম গ্লাস ডিজাইন, ১২০ হার্টজ সুপার অ্যামোলেড ডিসপ্লে এবং ৫০ মেগাপিক্সেল অপটিক্যাল ক্যামেরা।',
      priceMinor: 4599900,
      compareAtMinor: 4999900,
      sku: 'SAM-A55-128',
      stock: 45,
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
      ],
      options: { Color: 'Awesome Navy', Storage: '128GB', RAM: '8GB' },
    },
    {
      slug: 'xiaomi-redmi-note-13-pro',
      category: 'smartphones',
      brand: 'xiaomi',
      titleEn: 'Xiaomi Redmi Note 13 Pro 4G (8GB/256GB)',
      titleBn: 'শাওমি রেডমি নোট ১৩ প্রো (৮জিবি/২৫৬জিবি)',
      shortEn: '200MP Ultra-clear camera, 120Hz AMOLED display with 67W Turbo Fast Charging.',
      shortBn: '২০০ মেগাপিক্সেল ট্রিপল ক্যামেরা, ১২০ হার্টজ অ্যামোলেড ডিসপ্লে এবং ৬৭ ওয়াট ফাস্ট চার্জিং।',
      priceMinor: 3199900,
      compareAtMinor: 3499900,
      sku: 'XIA-RN13P-256',
      stock: 60,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      ],
      options: { Color: 'Midnight Black', Storage: '256GB' },
    },
    {
      slug: 'soundcore-space-one-wireless-headphones',
      category: 'audio',
      brand: 'anker',
      titleEn: 'Anker Soundcore Space One ANC Wireless Headphones',
      titleBn: 'অ্যাংকার সাউন্ডকোর স্পেস ওয়ান অ্যাক্টিভ নয়েজ ক্যানসেলিং হেডফোন',
      shortEn: 'Adaptive active noise cancelling, Hi-Res wireless audio, and up to 55-hour battery playtime.',
      shortBn: 'অ্যাডাপ্টিভ নয়েজ ক্যান্সেলেশন, হাই-রেজ অডিও এবং ৫৫ ঘণ্টা একটানা প্লেব্যাক।',
      priceMinor: 1149900,
      compareAtMinor: 1399900,
      sku: 'ANK-SPACE1-BLK',
      stock: 30,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      ],
      options: { Color: 'Jet Black' },
    },
    {
      slug: 'aarong-premium-silk-panjabi',
      category: 'mens-wear',
      brand: 'aarong',
      titleEn: 'Aarong Men’s Royal Silk Embroidered Panjabi',
      titleBn: 'আড়ং মেনস রয়্যাল সিল্ক এমব্রয়ডারি করা পাঞ্জাবি',
      shortEn: 'Crafted from pure Rajshahi silk with subtle hand embroidery along collar and placket.',
      shortBn: 'খাঁটি রাজশাহী সিল্ক কাপড়ে হাতের নিপুণ কারুকাজ করা বিশেষ পাঞ্জাবি।',
      priceMinor: 785000,
      compareAtMinor: 890000,
      sku: 'AAR-PANJ-SLK-40',
      stock: 25,
      images: [
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      ],
      options: { Size: '40', Color: 'Deep Maroon' },
    },
    {
      slug: 'aarong-handloom-cotton-saree',
      category: 'womens-wear',
      brand: 'aarong',
      titleEn: 'Aarong Handloom Pure Cotton Jamdani Motif Saree',
      titleBn: 'আড়ং তাঁতের খাঁটি সুতি জামদানি মোটিফ শাড়ি',
      shortEn: 'Breathable Tangail handloom cotton with traditional Jamdani floral motifs. Includes unstitched blouse piece.',
      shortBn: 'ঐতিহ্যবাহী টাঙ্গাইল তাঁতের নরম সুতি জামদানি ডিজাইনের শাড়ি।',
      priceMinor: 520000,
      compareAtMinor: 580000,
      sku: 'AAR-SAREE-COT-01',
      stock: 40,
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
      ],
      options: { Color: 'Royal Blue & Gold' },
    },
    {
      slug: 'apex-mens-leather-formal-shoes',
      category: 'footwear',
      brand: 'apex',
      titleEn: 'Apex Men’s Genuine Leather Derby Formal Shoes',
      titleBn: 'এপেক্স পুরুষদের জেনুইন লেদার ফর্মাল ডার্বি জুতা',
      shortEn: 'Full-grain genuine leather with cushioned memory foam insole and slip-resistant PU outsole.',
      shortBn: '১০০% জেনুইন লেদার এবং আরামদায়ক মেমোরি ফোম ইনসোলযুক্ত অফিসিয়াল জুতা।',
      priceMinor: 499000,
      compareAtMinor: 549000,
      sku: 'APX-DRB-BLK-42',
      stock: 50,
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      ],
      options: { Size: '42', Color: 'Classic Black' },
    },
    {
      slug: 'walton-inverter-air-conditioner-1-5ton',
      category: 'appliances',
      brand: 'walton',
      titleEn: 'Walton 1.5 Ton Voice Control Smart Inverter AC',
      titleBn: 'ওয়ালটন ১.৫ টন ভয়েস কন্ট্রোল স্মার্ট ইনভার্টার এসি',
      shortEn: 'Up to 70% energy saving dual inverter compressor with smart WiFi app control and 10-year compressor warranty.',
      shortBn: '৭০% পর্যন্ত বিদ্যুৎ সাশ্রয়ী ডুয়াল ইনভার্টার কম্প্রেসার ও ওয়াইফাই কন্ট্রোলসহ ১০ বছরের ওয়ারেন্টি।',
      priceMinor: 6490000,
      compareAtMinor: 7200000,
      sku: 'WLT-AC-15T-INV',
      stock: 15,
      images: [
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      ],
      options: { Capacity: '1.5 Ton', Type: 'Split Inverter' },
    },
    {
      slug: 'philips-multipurpose-kitchen-mixer-grinder',
      category: 'kitchen-dining',
      brand: 'philips',
      titleEn: 'Philips 750W Turbo Juicer Mixer Grinder (3 Jars)',
      titleBn: 'ফিলিপস ৭৫০ ওয়াট টার্বো মিক্সার গ্রাইন্ডার ও জুসার',
      shortEn: 'Tough motor with air ventilation for continuous heavy grinding of dry and wet spices.',
      shortBn: 'শক্তিশালী ৭৫০ ওয়াট মোটর ও ৩টি স্টেইনলেস স্টিল জারসহ মসলা গুঁড়ো করার সেরা ব্লেন্ডার।',
      priceMinor: 745000,
      compareAtMinor: 850000,
      sku: 'PHL-MXG-750W',
      stock: 35,
      images: [
        'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80',
      ],
      options: { Power: '750W', Jars: '3 Stainless Steel' },
    },
    {
      slug: 'radhuni-pure-mustard-oil-1l',
      category: 'cooking-essentials',
      brand: 'radhuni',
      titleEn: 'Radhuni Pure Cold-Pressed Mustard Oil 1L',
      titleBn: 'রাঁধুনী খাঁটি ঘানি ভাঙা সরিষার তেল ১ লিটার',
      shortEn: 'Made from premium selected mustard seeds, rich pungent aroma and zero chemical additives.',
      shortBn: 'বাছাইকৃত সেরা সরিষা থেকে প্রস্তুত ঝাঁজালো ও শতভাগ খাঁটি সরিষার তেল।',
      priceMinor: 31000,
      compareAtMinor: 34000,
      sku: 'RAD-OIL-MUST-1L',
      stock: 150,
      images: [
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
      ],
      options: { Volume: '1 Litre' },
    },
  ];

  for (const p of productsData) {
    const categoryId = categoryMap.get(p.category) || categoryMap.get('electronics')!;
    const brandId = brandMap.get(p.brand);

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: { status: 'ACTIVE' },
      create: {
        slug: p.slug,
        categoryId,
        brandId,
        status: 'ACTIVE',
        publishedAt: new Date(),
        returnPolicyCode: 'STANDARD_7_DAY',
        taxClassCode: 'STANDARD_VAT_15',
        translations: {
          create: [
            {
              locale: 'EN_BD',
              title: p.titleEn,
              shortDescription: p.shortEn,
              description: `${p.shortEn}\n\n100% Genuine product with authorized brand warranty and fast doorstep delivery across Bangladesh.`,
            },
            {
              locale: 'BN_BD',
              title: p.titleBn,
              shortDescription: p.shortBn,
              description: `${p.shortBn}\n\n১০০% অথেনটিক পণ্য, দ্রুততম হোম ডেলিভারি ও সহজ রিটার্ন সুবিধা।`,
            },
          ],
        },
        media: {
          create: p.images.map((url, i) => ({
            objectKey: url,
            mediaType: 'image/jpeg',
            altEn: p.titleEn,
            altBn: p.titleBn,
            sortOrder: i,
          })),
        },
        variants: {
          create: [
            {
              sku: p.sku,
              title: Object.values(p.options).join(' - '),
              optionValues: p.options,
              prices: {
                create: {
                  currency: 'BDT',
                  amountMinor: BigInt(p.priceMinor),
                  compareAtMinor: p.compareAtMinor ? BigInt(p.compareAtMinor) : null,
                },
              },
              inventory: {
                create: [
                  {
                    warehouseId: dhakaWarehouse.id,
                    onHand: p.stock,
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

  // 7. Promotional Coupons
  console.log('7. Seeding Promotional Coupons...');
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
      code: 'EID2026',
      name: 'Eid Special 15% Festive Discount',
      type: 'COUPON' as const,
      discountKind: 'PERCENTAGE' as const,
      value: 15,
      rules: { minOrderMinor: 100000, maxDiscountMinor: 150000 },
    },
    {
      code: 'FREESHIP',
      name: 'Free Delivery Anywhere in Bangladesh',
      type: 'COUPON' as const,
      discountKind: 'FREE_SHIPPING' as const,
      value: 0,
      rules: { minOrderMinor: 100000 },
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

  // 8. Demo Order for Public Tracking
  console.log('8. Seeding Demo Tracking Order...');
  const demoOrderNumber = 'KK-2026-89412';
  const demoProduct = await prisma.product.findFirst({
    where: { slug: 'samsung-galaxy-a55-5g' },
    include: { variants: { include: { prices: true } } },
  });

  if (demoProduct) {
    const variant = demoProduct.variants[0];
    const demoCustomer = await prisma.customer.upsert({
      where: { phoneE164: '+8801712345678' },
      update: {},
      create: {
        phoneE164: '+8801712345678',
        name: 'Tanvir Hossain',
        email: 'tanvir@example.com',
        phoneVerifiedAt: new Date(),
        status: 'ACTIVE',
      },
    });

    const demoOrder = await prisma.order.upsert({
      where: { orderNumber: demoOrderNumber },
      update: {},
      create: {
        orderNumber: demoOrderNumber,
        customerId: demoCustomer.id,
        phoneE164: '+8801712345678',
        locale: 'EN_BD',
        currency: 'BDT',
        status: 'IN_TRANSIT',
        paymentStatus: 'CAPTURED',
        fulfilmentStatus: 'HANDED_OVER',
        subtotalMinor: BigInt(4599900),
        shippingMinor: BigInt(6000),
        discountMinor: BigInt(0),
        totalMinor: BigInt(4605900),
        addressSnapshot: {
          recipientName: 'Tanvir Hossain',
          phone: '+8801712345678',
          division: 'Dhaka',
          district: 'Dhaka',
          upazilaThana: 'Dhanmondi',
          addressLine: 'House 42, Apt 5B, Road 27, Dhanmondi',
        },
        deliveryPromise: { estimateDays: '2-3 Business Days' },
        placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        items: {
          create: [
            {
              variantId: variant.id,
              sku: variant.sku,
              quantity: 1,
              unitPriceMinor: BigInt(4599900),
              totalMinor: BigInt(4599900),
              productSnapshot: {
                title: 'Samsung Galaxy A55 5G',
                variantTitle: '8GB / 128GB',
                image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
              },
              returnPolicySnapshot: { policy: 'STANDARD_7_DAY' },
            },
          ],
        },
        transitions: {
          create: [
            {
              fromStatus: null,
              toStatus: 'CONFIRMED',
              source: 'CUSTOMER_CHECKOUT',
              note: 'Order confirmed and payment verified via bKash',
              createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
            {
              fromStatus: 'CONFIRMED',
              toStatus: 'PROCESSING',
              source: 'WAREHOUSE',
              note: 'Item picked and packaged at Dhaka Central Hub',
              createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
            },
            {
              fromStatus: 'PROCESSING',
              toStatus: 'IN_TRANSIT',
              source: 'COURIER_PATHAO',
              note: 'Handed over to Pathao Express courier (Tracking: PTH-892147)',
              createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            },
          ],
        },
      },
    });
  }

  // 9. Merchants, Shops & KYC Intakes
  console.log('9. Seeding Multi-Vendor Merchants & KYC Verification Records...');
  const merchantPasswordHash = await bcrypt.hash('Shop@123456', 10);

  // 9A. Approved Live Merchant (Dhaka Tech Hub)
  const approvedMerchant = await prisma.merchant.upsert({
    where: { email: 'dhaka.electronics@kenakata.co' },
    update: {},
    create: {
      email: 'dhaka.electronics@kenakata.co',
      phone: '+8801711223344',
      name: 'Tanvir Hossain',
      passwordHash: merchantPasswordHash,
      status: 'APPROVED',
      commissionRate: 5.0,
      verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      verifiedBy: 'Compliance Lead',
      shop: {
        create: {
          name: 'Dhaka Tech Hub',
          slug: 'dhaka-tech-hub',
          description: 'Premier authorized distributor for consumer electronics and smart accessories in Dhaka.',
          entityType: 'PRIVATE_LIMITED',
          tradeLicenseNo: 'TL-DHK-2024-9812',
          tradeLicenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          tinNo: '123456789012',
          binNo: '987654321098',
          nidNo: '19902692812345678',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Motijheel',
          fullAddress: 'Level 4, BCS Computer City, Dhaka 1205',
          pickupAddress: 'Shop 42, Multiplan Center, Elephant Road, Dhaka',
          contactPhone: '+8801711223344',
          contactEmail: 'dhaka.electronics@kenakata.co',
          logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
          bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
          isVerified: true,
          rating: 4.9,
          totalSalesMinor: BigInt(28500000),
        },
      },
      kycDocuments: {
        create: [
          {
            documentType: 'TRADE_LICENSE',
            documentNumber: 'TL-DHK-2024-9812',
            fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
            fileName: 'Trade_License_2026_DhakaTech.pdf',
            fileSize: 1420000,
            mimeType: 'application/pdf',
            status: 'VERIFIED',
            verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            verifiedBy: 'Compliance Lead',
          },
          {
            documentType: 'NID_FRONT',
            documentNumber: '19902692812345678',
            fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
            fileName: 'NID_Tanvir_Front.jpg',
            fileSize: 850000,
            mimeType: 'image/jpeg',
            status: 'VERIFIED',
            verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            verifiedBy: 'Compliance Lead',
          },
          {
            documentType: 'TIN_CERTIFICATE',
            documentNumber: '123456789012',
            fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800',
            fileName: 'eTIN_Certificate_DhakaTech.pdf',
            fileSize: 620000,
            mimeType: 'application/pdf',
            status: 'VERIFIED',
            verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            verifiedBy: 'Compliance Lead',
          },
          {
            documentType: 'BANK_CHEQUE',
            fileUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800',
            fileName: 'BRAC_Bank_Cheque_Leaf.jpg',
            fileSize: 1100000,
            mimeType: 'image/jpeg',
            status: 'VERIFIED',
            verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            verifiedBy: 'Compliance Lead',
          },
        ],
      },
      bankAccounts: {
        create: [
          {
            accountType: 'BANK_ACCOUNT',
            bankName: 'BRAC Bank PLC',
            branchName: 'Gulshan 1 Branch',
            routingNumber: '060261234',
            accountHolderName: 'Dhaka Tech Hub Ltd',
            accountNumber: '1501203456789001',
            isDefault: true,
            isVerified: true,
          },
        ],
      },
    },
    include: { shop: true },
  });

  // Link initial seeded products to approved merchant
  if (approvedMerchant.shop) {
    await prisma.product.updateMany({
      where: { category: { slug: { in: ['smartphones', 'electronics'] } } },
      data: {
        shopId: approvedMerchant.shop.id,
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: 'Admin Catalog Team',
      },
    });
  }

  // 9B. Pending KYC Review Merchant (Ctg Lifestyle)
  await prisma.merchant.upsert({
    where: { email: 'ctg.fashion@kenakata.co' },
    update: {},
    create: {
      email: 'ctg.fashion@kenakata.co',
      phone: '+8801819988776',
      name: 'Rashedul Karim',
      passwordHash: merchantPasswordHash,
      status: 'UNDER_REVIEW',
      commissionRate: 6.0,
      shop: {
        create: {
          name: 'Ctg Lifestyle',
          slug: 'ctg-lifestyle',
          description: 'Contemporary ethnic wear, formal leather shoes, and traditional artisanal crafts from Chattogram.',
          entityType: 'SOLE_PROPRIETORSHIP',
          tradeLicenseNo: 'TL-CTG-2025-4519',
          tradeLicenseExpiry: new Date(Date.now() + 280 * 24 * 60 * 60 * 1000),
          tinNo: '987654321987',
          nidNo: '19882691234567890',
          division: 'Chattogram',
          district: 'Chattogram',
          upazila: 'Agrabad',
          fullAddress: 'Shop 12, GEC Circle Plaza, Chattogram 4000',
          pickupAddress: 'Shop 12, GEC Circle Plaza, Chattogram 4000',
          contactPhone: '+8801819988776',
          contactEmail: 'ctg.fashion@kenakata.co',
          isVerified: false,
        },
      },
      kycDocuments: {
        create: [
          {
            documentType: 'TRADE_LICENSE',
            documentNumber: 'TL-CTG-2025-4519',
            fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
            fileName: 'Trade_License_Ctg_2026.pdf',
            fileSize: 1250000,
            mimeType: 'application/pdf',
            status: 'PENDING',
          },
          {
            documentType: 'NID_FRONT',
            documentNumber: '19882691234567890',
            fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
            fileName: 'NID_Rashedul_Front.jpg',
            fileSize: 720000,
            mimeType: 'image/jpeg',
            status: 'PENDING',
          },
          {
            documentType: 'NID_BACK',
            fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
            fileName: 'NID_Rashedul_Back.jpg',
            fileSize: 710000,
            mimeType: 'image/jpeg',
            status: 'PENDING',
          },
          {
            documentType: 'BANK_CHEQUE',
            fileUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800',
            fileName: 'Islami_Bank_Cheque.jpg',
            fileSize: 940000,
            mimeType: 'image/jpeg',
            status: 'PENDING',
          },
        ],
      },
      bankAccounts: {
        create: [
          {
            accountType: 'BANK_ACCOUNT',
            bankName: 'Islami Bank Bangladesh PLC',
            branchName: 'Agrabad Branch',
            routingNumber: '125261890',
            accountHolderName: 'Ctg Lifestyle Enterprise',
            accountNumber: '2050123456789012',
            isDefault: true,
            isVerified: false,
          },
        ],
      },
    },
  });

  // 9C. Rejected / Resubmission Required Merchant (Sylhet Tea & Agro)
  await prisma.merchant.upsert({
    where: { email: 'sylhet.organic@kenakata.co' },
    update: {},
    create: {
      email: 'sylhet.organic@kenakata.co',
      phone: '+8801915544332',
      name: 'Nazmul Islam',
      passwordHash: merchantPasswordHash,
      status: 'REJECTED',
      rejectionReason: 'Trade License expired on December 31, 2025. Please upload a renewed 2026-2027 valid copy.',
      shop: {
        create: {
          name: 'Sylhet Tea & Agro',
          slug: 'sylhet-tea-agro',
          description: 'Finest organic Sylhet garden tea, cold pressed oils, and authentic natural foods.',
          entityType: 'PARTNERSHIP',
          tradeLicenseNo: 'TL-SYL-2023-1102',
          tinNo: '556677889900',
          nidNo: '19922693456789012',
          division: 'Sylhet',
          district: 'Sylhet',
          upazila: 'Kotwali',
          fullAddress: 'Zindabazar Commercial Area, Sylhet 3100',
          contactPhone: '+8801915544332',
          contactEmail: 'sylhet.organic@kenakata.co',
          isVerified: false,
        },
      },
      kycDocuments: {
        create: [
          {
            documentType: 'TRADE_LICENSE',
            documentNumber: 'TL-SYL-2023-1102',
            fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
            fileName: 'Old_Trade_License_2024.pdf',
            fileSize: 890000,
            mimeType: 'application/pdf',
            status: 'REJECTED',
            rejectionReason: 'Document is expired. Valid copy required.',
          },
        ],
      },
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('Admin Account: admin@kenakata.co / Admin@123456');
  console.log('Approved Merchant Shop: dhaka.electronics@kenakata.co / Shop@123456 (Dhaka Tech Hub)');
  console.log('Pending Review Shop: ctg.fashion@kenakata.co / Shop@123456 (Ctg Lifestyle)');
  console.log('Rejected/Resubmission Shop: sylhet.organic@kenakata.co / Shop@123456 (Sylhet Tea & Agro)');
  console.log('Customer Account: customer@kenakata.co / +8801712345678 (PIN: 123456)');
  console.log('Demo Tracking Order: KK-2026-89412 (+8801712345678)');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
