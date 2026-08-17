const fs = require('fs');
const path = require('path');

const catalogJsonPath = path.join(__dirname, '..', 'data', 'resellerhub-catalog.json');
const rawProducts = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));

// Extract unique brands
const brandMap = new Map();
rawProducts.forEach(p => {
  if (!brandMap.has(p.brandSlug)) {
    brandMap.set(p.brandSlug, {
      id: `brand-${p.brandSlug}`,
      slug: p.brandSlug,
      name: p.brand,
      productCount: 1,
      colorHue: p.colorHue || 200
    });
  } else {
    brandMap.get(p.brandSlug).productCount++;
  }
});
const brands = Array.from(brandMap.values());

// Build categories
const subcatCounts = {};
rawProducts.forEach(p => {
  subcatCounts[p.categorySlug] = (subcatCounts[p.categorySlug] || 0) + 1;
});

const categories = [
  {
    id: 'cat-gadgets',
    slug: 'gadgets',
    name: 'Gadgets & Electronics',
    nameBn: 'গ্যাজেটস ও ইলেকট্রনিক্স',
    parentId: null,
    icon: '⚡',
    productCount: rawProducts.filter(p => p.mainCategorySlug === 'gadgets').length,
    children: [
      { id: 'cat-camera', slug: 'camera', name: 'Security & Action Cameras', nameBn: 'ক্যামেরা ও সিসিটিভি', parentId: 'cat-gadgets', icon: '📹', productCount: subcatCounts['camera'] || 0 },
      { id: 'cat-earbuds', slug: 'earbuds', name: 'Earbuds & Audio', nameBn: 'ইয়ারবাডস ও হেডফোন', parentId: 'cat-gadgets', icon: '🎧', productCount: subcatCounts['earbuds'] || 0 },
      { id: 'cat-electronics', slug: 'electronics', name: 'Smart Electronics & Gadgets', nameBn: 'স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস', parentId: 'cat-gadgets', icon: '💻', productCount: subcatCounts['electronics'] || 0 },
      { id: 'cat-fan', slug: 'fan', name: 'Rechargeable Fans', nameBn: 'রিচার্জেবল ও পোর্টেবল ফ্যান', parentId: 'cat-gadgets', icon: '🌀', productCount: subcatCounts['fan'] || 0 },
      { id: 'cat-light', slug: 'light', name: 'Smart Lights & Lamps', nameBn: 'স্মার্ট লাইট ও ল্যাম্প', parentId: 'cat-gadgets', icon: '💡', productCount: subcatCounts['light'] || 0 },
      { id: 'cat-mobile-accessories', slug: 'mobile-accessories', name: 'Mobile Accessories', nameBn: 'মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক', parentId: 'cat-gadgets', icon: '🔌', productCount: subcatCounts['mobile-accessories'] || 0 },
      { id: 'cat-mobile-phone', slug: 'mobile-phone', name: 'Feature & Mini Phones', nameBn: 'ফিচার ও মিনি ফোন', parentId: 'cat-gadgets', icon: '📱', productCount: subcatCounts['mobile-phone'] || 0 },
      { id: 'cat-mouse-keyboard', slug: 'mouse-keyboard', name: 'Keyboards & Mice', nameBn: 'কীবোর্ড ও মাউস', parentId: 'cat-gadgets', icon: '⌨️', productCount: subcatCounts['mouse-keyboard'] || 0 },
      { id: 'cat-pillow', slug: 'pillow', name: 'Comfort & Health Pillows', nameBn: 'পিলো ও ব্যাক সাপোর্ট', parentId: 'cat-gadgets', icon: '🛏️', productCount: subcatCounts['pillow'] || 0 },
      { id: 'cat-printer', slug: 'printer', name: 'Thermal & Label Printers', nameBn: 'থার্মাল প্রিন্টার', parentId: 'cat-gadgets', icon: '🖨️', productCount: subcatCounts['printer'] || 0 },
      { id: 'cat-speaker', slug: 'speaker', name: 'Bluetooth Speakers & Sound', nameBn: 'ব্লুটুথ স্পিকার ও অডিও', parentId: 'cat-gadgets', icon: '🔊', productCount: subcatCounts['speaker'] || 0 },
      { id: 'cat-ups', slug: 'ups', name: 'Mini Router UPS', nameBn: 'মিনি রাউটার ইউপিএস', parentId: 'cat-gadgets', icon: '🔋', productCount: subcatCounts['ups'] || 0 },
    ]
  },
  {
    id: 'cat-home-appliance',
    slug: 'home-appliance',
    name: 'Home & Living',
    nameBn: 'হোম অ্যাপ্লায়েন্সেস',
    parentId: null,
    icon: '🏠',
    productCount: rawProducts.filter(p => p.mainCategorySlug === 'home-appliance').length,
    children: [
      { id: 'cat-bed-sheets', slug: 'bed-sheets', name: '3D Bed Sheets & Bedding', nameBn: 'থ্রিডি বেডশিট ও বেডিং', parentId: 'cat-home-appliance', icon: '🛏️', productCount: subcatCounts['bed-sheets'] || 0 },
    ]
  }
];

const trendingSearches = [
  'Bluetooth Speaker', 'Neckband', 'Power Bank', 'Rechargeable Fan', 'Thermal Printer',
  '3D Bed Sheet', 'Wireless Camera', 'Mini Phone', 'RGB Keyboard', 'Mini UPS'
];

const heroBanners = [
  {
    id: 'b1',
    titleEn: 'Premium Gadgets & Home Living',
    titleBn: 'প্রিমিয়াম গ্যাজেট ও হোম লিভিং',
    subtitleEn: '100% Genuine Electronics, Mobile Accessories & Bedding Sets',
    subtitleBn: '১০০% অথেনটিক গ্যাজেট, মোবাইল এক্সেসরিজ ও বেডিং সেট',
    ctaEn: 'Explore Catalog',
    ctaBn: 'ক্যাটালগ দেখুন',
    link: '/categories/gadgets',
    gradient: 'from-brand-charcoal to-slate-800'
  },
  {
    id: 'b2',
    titleEn: 'Smart Electronics & Accessories',
    titleBn: 'স্মার্ট ইলেকট্রনিক্স ও মোবাইল এক্সেসরিজ',
    subtitleEn: 'Top-rated Power Banks, Cooling Fans, Wireless Mics & Chargers',
    subtitleBn: 'সেরা মানের পাওয়ার ব্যাংক, কুলিং ফ্যান, ওয়্যারলেস মাইক ও চার্জার',
    ctaEn: 'Shop Gadgets',
    ctaBn: 'গ্যাজেট কিনুন',
    link: '/categories/gadgets',
    gradient: 'from-brand-blue to-blue-800'
  },
  {
    id: 'b3',
    titleEn: 'Premium 3D Waterproof Bed Sheets',
    titleBn: 'প্রিমিয়াম ৩ডি ওয়াটারপ্রুফ বেডশিট কালেকশন',
    subtitleEn: 'China Velvet 7/8 Feet Bedding Sets with Pillow Covers',
    subtitleBn: 'চায়না ভেলভেট ৭/৮ ফিট চাদর ও বালিশের কাভার সেট',
    ctaEn: 'Shop Home Living',
    ctaBn: 'হোম লিভিং কিনুন',
    link: '/categories/home-appliance',
    gradient: 'from-amber-800 to-orange-900'
  }
];

const output = `/* ═══════════════════════════════════════════════════════
   RESELLERHUB BD OFFICIAL CATALOG DATA (Kenakata.co)
   Merchant: resellerhubbd.com (Verified & Approved)
   Total Products: ${rawProducts.length}
   All prices in BDT poisha (minor units)
   ═══════════════════════════════════════════════════════ */

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  brand: string;
  brandSlug: string;
  mainCategorySlug?: string;
  mainCategoryName?: string;
  mainCategoryNameBn?: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  categoryNameBn: string;
  price: number;       // BDT minor (poisha)
  compareAt: number | null;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQty: number;
  sku: string;
  tags: string[];
  variants: Variant[];
  highlights: string[];
  highlightsBn: string[];
  specifications: Record<string, string>;
  specificationsBn: Record<string, string>;
  description: string;
  descriptionBn: string;
  warranty: string;
  returnPolicy: string;
  weight: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  colorHue: number;
  images: string[];
  merchant?: {
    name: string;
    slug: string;
    isVerified: boolean;
  };
}

export interface Variant {
  id: string;
  sku: string;
  title: string;
  optionValues: Record<string, string>;
  price: number;
  compareAt: number | null;
  inStock: boolean;
  stockQty: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  parentId: string | null;
  icon: string;
  productCount: number;
  children?: Category[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  productCount: number;
  colorHue: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: Variant | null;
  quantity: number;
}

// ── Categories ──
export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

// ── Brands ──
export const brands: Brand[] = ${JSON.stringify(brands, null, 2)};

// ── Products ──
export const products: Product[] = ${JSON.stringify(rawProducts, null, 2)};

// ── Helper Functions ──

export function formatBDT(amountMinor: number): string {
  const taka = Math.round(amountMinor / 100);
  return \`৳\${taka.toLocaleString('en-BD')}\`;
}

export function formatBDTEn(amountMinor: number): string {
  const taka = Math.round(amountMinor / 100);
  return \`৳\${taka.toLocaleString('en-IN')}\`;
}

export function calcDiscount(price: number, compareAt: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  // Support both parent category matching (gadgets, home-appliance) and subcategory matching
  return products.filter(p => p.categorySlug === categorySlug || p.mainCategorySlug === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter(p => p.brandSlug === brandSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    (p.titleBn && p.titleBn.toLowerCase().includes(q)) ||
    p.brand.toLowerCase().includes(q) ||
    p.categoryName.toLowerCase().includes(q) ||
    (p.categoryNameBn && p.categoryNameBn.toLowerCase().includes(q)) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.sku.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

// ── Flash deals ──
export const flashDeals = products.slice(0, 8).map((p, idx) => ({
  ...p,
  flashPrice: Math.round(p.price * 0.85),
  flashEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  claimed: 15 + (idx * 9) % 65,
  total: 100,
}));

// ── Banner data ──
export const heroBanners = ${JSON.stringify(heroBanners, null, 2)};

// ── Trending searches ──
export const trendingSearches = ${JSON.stringify(trendingSearches, null, 2)};
`;

const mockDataPath = path.join(__dirname, '..', 'apps', 'storefront', 'src', 'lib', 'mock-data.ts');
fs.writeFileSync(mockDataPath, output, 'utf8');
console.log(`Generated ${mockDataPath} with ${rawProducts.length} products and ${categories.length} categories.`);
