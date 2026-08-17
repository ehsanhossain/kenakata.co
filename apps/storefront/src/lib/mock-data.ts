/* ═══════════════════════════════════════════════════════
   MOCK DATA — Realistic Bangladesh e-commerce catalog
   All prices in BDT poisha (minor units)
   ═══════════════════════════════════════════════════════ */

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  brand: string;
  brandSlug: string;
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
  colorHue: number;   // For placeholder images
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
export const categories: Category[] = [
  {
    id: 'cat-1', slug: 'electronics', name: 'Electronics', nameBn: 'ইলেকট্রনিক্স',
    parentId: null, icon: '📱', productCount: 342,
    children: [
      { id: 'cat-1-1', slug: 'smartphones', name: 'Smartphones', nameBn: 'স্মার্টফোন', parentId: 'cat-1', icon: '📱', productCount: 128 },
      { id: 'cat-1-2', slug: 'laptops', name: 'Laptops', nameBn: 'ল্যাপটপ', parentId: 'cat-1', icon: '💻', productCount: 89 },
      { id: 'cat-1-3', slug: 'headphones', name: 'Headset', nameBn: 'হেডফোন', parentId: 'cat-1', icon: '🎧', productCount: 64 },
      { id: 'cat-1-4', slug: 'tablets', name: 'Tablets', nameBn: 'ট্যাবলেট', parentId: 'cat-1', icon: '📟', productCount: 45 },
      { id: 'cat-1-5', slug: 'cameras', name: 'Cameras', nameBn: 'ক্যামেরা', parentId: 'cat-1', icon: '📷', productCount: 16 },
    ],
  },
  {
    id: 'cat-2', slug: 'fashion', name: 'Fashion', nameBn: 'ফ্যাশন',
    parentId: null, icon: '👕', productCount: 567,
    children: [
      { id: 'cat-2-1', slug: 'mens-clothing', name: "Men's Clothing", nameBn: 'পুরুষদের পোশাক', parentId: 'cat-2', icon: '👔', productCount: 234 },
      { id: 'cat-2-2', slug: 'womens-clothing', name: "Women's Clothing", nameBn: 'মহিলাদের পোশাক', parentId: 'cat-2', icon: '👗', productCount: 289 },
      { id: 'cat-2-3', slug: 'shoes', name: 'Shoes', nameBn: 'জুতা', parentId: 'cat-2', icon: '👟', productCount: 44 },
    ],
  },
  {
    id: 'cat-3', slug: 'home-living', name: 'House & Living', nameBn: 'হোম ও লিভিং',
    parentId: null, icon: '🏠', productCount: 230,
    children: [
      { id: 'cat-3-1', slug: 'furniture', name: 'Furniture', nameBn: 'আসবাবপত্র', parentId: 'cat-3', icon: '🪑', productCount: 78 },
      { id: 'cat-3-2', slug: 'kitchen', name: 'Kitchen', nameBn: 'রান্নাঘর', parentId: 'cat-3', icon: '🍳', productCount: 92 },
      { id: 'cat-3-3', slug: 'decor', name: 'Decor', nameBn: 'সাজসজ্জা', parentId: 'cat-3', icon: '🖼', productCount: 60 },
    ],
  },
  {
    id: 'cat-4', slug: 'health-beauty', name: 'Health & Beauty', nameBn: 'স্বাস্থ্য ও সৌন্দর্য',
    parentId: null, icon: '💄', productCount: 198,
  },
  {
    id: 'cat-5', slug: 'sports-outdoor', name: 'Sports & Outdoor', nameBn: 'স্পোর্টস ও আউটডোর',
    parentId: null, icon: '⚽', productCount: 145,
  },
  {
    id: 'cat-6', slug: 'books-stationery', name: 'Books & Stationery', nameBn: 'বই ও স্টেশনারি',
    parentId: null, icon: '📚', productCount: 312,
  },
  {
    id: 'cat-7', slug: 'groceries', name: 'Groceries', nameBn: 'মুদিখানা',
    parentId: null, icon: '🛒', productCount: 425,
  },
  {
    id: 'cat-8', slug: 'baby-kids', name: 'Baby & Kids', nameBn: 'শিশু ও বাচ্চা',
    parentId: null, icon: '👶', productCount: 167,
  },
];

// ── Brands ──
export const brands: Brand[] = [
  { id: 'br-1', slug: 'samsung', name: 'Samsung', productCount: 89, colorHue: 220 },
  { id: 'br-2', slug: 'xiaomi', name: 'Xiaomi', productCount: 76, colorHue: 25 },
  { id: 'br-3', slug: 'walton', name: 'Walton', productCount: 54, colorHue: 200 },
  { id: 'br-4', slug: 'sony', name: 'Sony', productCount: 42, colorHue: 210 },
  { id: 'br-5', slug: 'apple', name: 'Apple', productCount: 38, colorHue: 0 },
  { id: 'br-6', slug: 'hp', name: 'HP', productCount: 35, colorHue: 195 },
  { id: 'br-7', slug: 'aarong', name: 'Aarong', productCount: 112, colorHue: 30 },
  { id: 'br-8', slug: 'yellow', name: 'Yellow', productCount: 87, colorHue: 45 },
];

// ── Products ──
export const products: Product[] = [
  {
    id: 'prod-1', slug: 'samsung-galaxy-a55-5g', title: 'Samsung Galaxy A55 5G 8/128GB',
    titleBn: 'স্যামসাং গ্যালাক্সি A55 5G ৮/১২৮জিবি', brand: 'Samsung', brandSlug: 'samsung',
    categoryId: 'cat-1-1', categorySlug: 'smartphones', categoryName: 'Smartphones', categoryNameBn: 'স্মার্টফোন',
    price: 4299900, compareAt: 4799900, rating: 4.5, reviewCount: 234, inStock: true, stockQty: 45,
    sku: 'SM-A556E-128', tags: ['5G', 'AMOLED', 'IP67'], isFeatured: true, isNew: false, isBestSeller: true, colorHue: 220,
    variants: [
      { id: 'v-1-1', sku: 'SM-A556E-128-BK', title: 'Awesome Navy', optionValues: { Color: 'Navy', Storage: '128GB' }, price: 4299900, compareAt: 4799900, inStock: true, stockQty: 20 },
      { id: 'v-1-2', sku: 'SM-A556E-128-LV', title: 'Awesome Lilac', optionValues: { Color: 'Lilac', Storage: '128GB' }, price: 4299900, compareAt: 4799900, inStock: true, stockQty: 15 },
      { id: 'v-1-3', sku: 'SM-A556E-256-BK', title: 'Awesome Navy 256GB', optionValues: { Color: 'Navy', Storage: '256GB' }, price: 4799900, compareAt: 5299900, inStock: true, stockQty: 10 },
    ],
    highlights: ['6.6" Super AMOLED Display', 'Exynos 1480 Processor', '50MP Triple Camera', '5000mAh Battery with 25W Fast Charging'],
    highlightsBn: ['৬.৬" সুপার AMOLED ডিসপ্লে', 'Exynos ১৪৮০ প্রসেসর', '৫০MP ট্রিপল ক্যামেরা', '৫০০০mAh ব্যাটারি ২৫W ফাস্ট চার্জিং'],
    specifications: { 'Display': '6.6" FHD+ Super AMOLED, 120Hz', 'Processor': 'Exynos 1480', 'RAM': '8GB', 'Storage': '128GB', 'Camera': '50MP + 12MP + 5MP', 'Battery': '5000mAh', 'OS': 'Android 14, One UI 6.1', 'SIM': 'Dual Nano SIM + eSIM', 'Weight': '213g' },
    specificationsBn: { 'ডিসপ্লে': '৬.৬" FHD+ সুপার AMOLED, ১২০Hz', 'প্রসেসর': 'Exynos ১৪৮০', 'র‍্যাম': '৮জিবি', 'স্টোরেজ': '১২৮জিবি', 'ক্যামেরা': '৫০MP + ১২MP + ৫MP', 'ব্যাটারি': '৫০০০mAh', 'ওএস': 'Android ১৪, One UI ৬.১', 'সিম': 'ডুয়াল ন্যানো সিম + eSIM', 'ওজন': '২১৩গ্রাম' },
    description: 'Experience the Samsung Galaxy A55 5G with its stunning Super AMOLED display, powerful Exynos processor, and versatile triple camera system. Built with IP67 water resistance and Gorilla Glass Victus+.',
    descriptionBn: 'Samsung Galaxy A55 5G-এর অসাধারণ Super AMOLED ডিসপ্লে, শক্তিশালী Exynos প্রসেসর এবং বহুমুখী ট্রিপল ক্যামেরা সিস্টেম উপভোগ করুন।',
    warranty: '1 Year Official Warranty', returnPolicy: '7 Days Return', weight: 213,
  },
  {
    id: 'prod-2', slug: 'xiaomi-redmi-note-13-pro', title: 'Xiaomi Redmi Note 13 Pro 8/256GB',
    titleBn: 'শাওমি রেডমি নোট ১৩ প্রো ৮/২৫৬জিবি', brand: 'Xiaomi', brandSlug: 'xiaomi',
    categoryId: 'cat-1-1', categorySlug: 'smartphones', categoryName: 'Smartphones', categoryNameBn: 'স্মার্টফোন',
    price: 2999900, compareAt: 3499900, rating: 4.3, reviewCount: 189, inStock: true, stockQty: 62,
    sku: 'RN13P-256', tags: ['200MP', 'AMOLED', 'Fast Charge'], isFeatured: true, isNew: true, isBestSeller: false, colorHue: 25,
    variants: [
      { id: 'v-2-1', sku: 'RN13P-256-BK', title: 'Midnight Black', optionValues: { Color: 'Black', Storage: '256GB' }, price: 2999900, compareAt: 3499900, inStock: true, stockQty: 30 },
      { id: 'v-2-2', sku: 'RN13P-256-BL', title: 'Ocean Blue', optionValues: { Color: 'Blue', Storage: '256GB' }, price: 2999900, compareAt: 3499900, inStock: true, stockQty: 32 },
    ],
    highlights: ['200MP Main Camera', '6.67" AMOLED Display, 120Hz', 'Snapdragon 7s Gen 2', '67W Turbo Charging'],
    highlightsBn: ['২০০MP মেইন ক্যামেরা', '৬.৬৭" AMOLED ডিসপ্লে, ১২০Hz', 'Snapdragon 7s Gen 2', '৬৭W টার্বো চার্জিং'],
    specifications: { 'Display': '6.67" FHD+ AMOLED, 120Hz', 'Processor': 'Snapdragon 7s Gen 2', 'RAM': '8GB', 'Storage': '256GB', 'Camera': '200MP + 8MP + 2MP', 'Battery': '5100mAh', 'Weight': '187g' },
    specificationsBn: { 'ডিসপ্লে': '৬.৬৭" FHD+ AMOLED, ১২০Hz', 'প্রসেসর': 'Snapdragon 7s Gen 2', 'র‍্যাম': '৮জিবি', 'স্টোরেজ': '২৫৬জিবি', 'ক্যামেরা': '২০০MP + ৮MP + ২MP', 'ব্যাটারি': '৫১০০mAh', 'ওজন': '১৮৭গ্রাম' },
    description: 'The Redmi Note 13 Pro brings a stunning 200MP camera, vibrant AMOLED display, and the powerful Snapdragon 7s Gen 2 processor at an incredible price point.',
    descriptionBn: 'Redmi Note 13 Pro তে আছে অসাধারণ 200MP ক্যামেরা, প্রাণবন্ত AMOLED ডিসপ্লে এবং শক্তিশালী Snapdragon 7s Gen 2 প্রসেসর।',
    warranty: '1 Year Official Warranty', returnPolicy: '7 Days Return', weight: 187,
  },
  {
    id: 'prod-3', slug: 'sony-wh-1000xm5-headphones', title: 'Sony WH-1000XM5 Wireless Headset',
    titleBn: 'সনি WH-1000XM5 ওয়্যারলেস হেডফোন', brand: 'Sony', brandSlug: 'sony',
    categoryId: 'cat-1-3', categorySlug: 'headphones', categoryName: 'Headset', categoryNameBn: 'হেডফোন',
    price: 3500000, compareAt: 3999900, rating: 4.8, reviewCount: 312, inStock: true, stockQty: 18,
    sku: 'WH1000XM5-B', tags: ['ANC', 'Wireless', 'Premium'], isFeatured: true, isNew: false, isBestSeller: true, colorHue: 0,
    variants: [
      { id: 'v-3-1', sku: 'WH1000XM5-BK', title: 'Black', optionValues: { Color: 'Black' }, price: 3500000, compareAt: 3999900, inStock: true, stockQty: 10 },
      { id: 'v-3-2', sku: 'WH1000XM5-SV', title: 'Silver', optionValues: { Color: 'Silver' }, price: 3500000, compareAt: 3999900, inStock: true, stockQty: 8 },
    ],
    highlights: ['Industry-leading Noise Cancellation', '30-hour Battery Life', 'Multipoint Connection', 'Ultra-comfortable Design'],
    highlightsBn: ['শিল্প-নেতৃত্বাধীন নয়েজ ক্যান্সেলেশন', '৩০ ঘণ্টা ব্যাটারি লাইফ', 'মাল্টিপয়েন্ট কানেকশন', 'অতি আরামদায়ক ডিজাইন'],
    specifications: { 'Type': 'Over-ear Wireless', 'Driver': '30mm', 'ANC': 'Yes, 8 Microphones', 'Battery': '30 Hours', 'Charging': 'USB-C', 'Codec': 'LDAC, AAC, SBC', 'Weight': '250g' },
    specificationsBn: { 'ধরন': 'ওভার-ইয়ার ওয়্যারলেস', 'ড্রাইভার': '৩০মিমি', 'ANC': 'হ্যাঁ, ৮ মাইক্রোফোন', 'ব্যাটারি': '৩০ ঘণ্টা', 'চার্জিং': 'USB-C', 'কোডেক': 'LDAC, AAC, SBC', 'ওজন': '২৫০গ্রাম' },
    description: 'Sony WH-1000XM5 delivers industry-leading noise cancellation with exceptional sound quality. Features Auto NC Optimizer, Speak-to-Chat, and 30-hour battery life.',
    descriptionBn: 'Sony WH-1000XM5 শিল্প-নেতৃত্বাধীন নয়েজ ক্যান্সেলেশন এবং অসাধারণ সাউন্ড কোয়ালিটি প্রদান করে।',
    warranty: '1 Year Official Warranty', returnPolicy: '14 Days Return', weight: 250,
  },
  {
    id: 'prod-4', slug: 'walton-primo-nh5-lite', title: 'Walton Primo NH5 Lite 4/64GB',
    titleBn: 'ওয়ালটন প্রাইমো NH5 Lite ৪/৬৪জিবি', brand: 'Walton', brandSlug: 'walton',
    categoryId: 'cat-1-1', categorySlug: 'smartphones', categoryName: 'Smartphones', categoryNameBn: 'স্মার্টফোন',
    price: 1099900, compareAt: null, rating: 4.0, reviewCount: 67, inStock: true, stockQty: 120,
    sku: 'WP-NH5L-64', tags: ['Budget', 'Made in BD'], isFeatured: false, isNew: true, isBestSeller: false, colorHue: 200,
    variants: [
      { id: 'v-4-1', sku: 'WP-NH5L-64-BK', title: 'Black', optionValues: { Color: 'Black', Storage: '64GB' }, price: 1099900, compareAt: null, inStock: true, stockQty: 60 },
      { id: 'v-4-2', sku: 'WP-NH5L-64-GR', title: 'Green', optionValues: { Color: 'Green', Storage: '64GB' }, price: 1099900, compareAt: null, inStock: true, stockQty: 60 },
    ],
    highlights: ['6.5" HD+ Display', 'Unisoc SC9863A', '13MP AI Camera', '5000mAh Battery'],
    highlightsBn: ['৬.৫" HD+ ডিসপ্লে', 'Unisoc SC9863A', '১৩MP AI ক্যামেরা', '৫০০০mAh ব্যাটারি'],
    specifications: { 'Display': '6.5" HD+ IPS', 'Processor': 'Unisoc SC9863A', 'RAM': '4GB', 'Storage': '64GB', 'Camera': '13MP + 2MP', 'Battery': '5000mAh', 'OS': 'Android 13' },
    specificationsBn: { 'ডিসপ্লে': '৬.৫" HD+ IPS', 'প্রসেসর': 'Unisoc SC9863A', 'র‍্যাম': '৪জিবি', 'স্টোরেজ': '৬৪জিবি', 'ক্যামেরা': '১৩MP + ২MP', 'ব্যাটারি': '৫০০০mAh', 'ওএস': 'Android ১৩' },
    description: 'Made in Bangladesh, the Walton Primo NH5 Lite offers excellent value with its large display, long battery life, and AI camera features.',
    descriptionBn: 'বাংলাদেশে তৈরি, ওয়ালটন প্রাইমো NH5 Lite বড় ডিসপ্লে, দীর্ঘ ব্যাটারি লাইফ এবং AI ক্যামেরা ফিচার সহ দুর্দান্ত মূল্য প্রদান করে।',
    warranty: '1 Year Official Warranty', returnPolicy: '7 Days Return', weight: 195,
  },
  {
    id: 'prod-5', slug: 'hp-pavilion-15-laptop', title: 'HP Pavilion 15 Core i5 13th Gen 8/512GB',
    titleBn: 'HP Pavilion ১৫ Core i5 ১৩তম জেন ৮/৫১২জিবি', brand: 'HP', brandSlug: 'hp',
    categoryId: 'cat-1-2', categorySlug: 'laptops', categoryName: 'Laptops', categoryNameBn: 'ল্যাপটপ',
    price: 7499900, compareAt: 8499900, rating: 4.4, reviewCount: 98, inStock: true, stockQty: 12,
    sku: 'HP-PAV15-I5', tags: ['Intel i5', 'Lightweight', 'IPS'], isFeatured: true, isNew: false, isBestSeller: false, colorHue: 195,
    variants: [
      { id: 'v-5-1', sku: 'HP-PAV15-I5-SV', title: 'Natural Silver', optionValues: { Color: 'Silver' }, price: 7499900, compareAt: 8499900, inStock: true, stockQty: 12 },
    ],
    highlights: ['15.6" FHD IPS Display', 'Intel Core i5-1335U', '512GB NVMe SSD', 'Lightweight at 1.75kg'],
    highlightsBn: ['১৫.৬" FHD IPS ডিসপ্লে', 'Intel Core i5-1335U', '৫১২জিবি NVMe SSD', 'হালকা ১.৭৫কেজি'],
    specifications: { 'Display': '15.6" FHD IPS, 250 nits', 'Processor': 'Intel Core i5-1335U', 'RAM': '8GB DDR4', 'Storage': '512GB PCIe NVMe', 'Graphics': 'Intel Iris Xe', 'Battery': 'Up to 8 hours', 'OS': 'Windows 11 House', 'Weight': '1.75kg' },
    specificationsBn: { 'ডিসপ্লে': '১৫.৬" FHD IPS, ২৫০ নিট', 'প্রসেসর': 'Intel Core i5-1335U', 'র‍্যাম': '৮জিবি DDR4', 'স্টোরেজ': '৫১২জিবি PCIe NVMe', 'গ্রাফিক্স': 'Intel Iris Xe', 'ব্যাটারি': '৮ ঘণ্টা পর্যন্ত', 'ওএস': 'Windows 11 House', 'ওজন': '১.৭৫কেজি' },
    description: 'The HP Pavilion 15 combines a powerful Intel 13th Gen Core i5 processor with a vibrant FHD IPS display and a fast 512GB NVMe SSD.',
    descriptionBn: 'HP Pavilion 15 শক্তিশালী Intel 13th Gen Core i5 প্রসেসর, প্রাণবন্ত FHD IPS ডিসপ্লে এবং দ্রুত 512GB NVMe SSD এর সমন্বয় করে।',
    warranty: '2 Years Official Warranty', returnPolicy: '14 Days Return', weight: 1750,
  },
  {
    id: 'prod-6', slug: 'aarong-cotton-punjabi-blue', title: 'Aarong Premium Cotton Punjabi - Royal Blue',
    titleBn: 'আড়ং প্রিমিয়াম কটন পাঞ্জাবি - রয়্যাল ব্লু', brand: 'Aarong', brandSlug: 'aarong',
    categoryId: 'cat-2-1', categorySlug: 'mens-clothing', categoryName: "Men's Clothing", categoryNameBn: 'পুরুষদের পোশাক',
    price: 349900, compareAt: 449900, rating: 4.6, reviewCount: 156, inStock: true, stockQty: 35,
    sku: 'ARN-PJ-BL-01', tags: ['Cotton', 'Festive', 'Premium'], isFeatured: true, isNew: false, isBestSeller: true, colorHue: 30,
    variants: [
      { id: 'v-6-1', sku: 'ARN-PJ-BL-M', title: 'M', optionValues: { Size: 'M' }, price: 349900, compareAt: 449900, inStock: true, stockQty: 10 },
      { id: 'v-6-2', sku: 'ARN-PJ-BL-L', title: 'L', optionValues: { Size: 'L' }, price: 349900, compareAt: 449900, inStock: true, stockQty: 15 },
      { id: 'v-6-3', sku: 'ARN-PJ-BL-XL', title: 'XL', optionValues: { Size: 'XL' }, price: 349900, compareAt: 449900, inStock: true, stockQty: 10 },
    ],
    highlights: ['Premium 100% Cotton', 'Traditional Hand Embroidery', 'Pre-shrunk Fabric', 'Comfortable Regular Fit'],
    highlightsBn: ['প্রিমিয়াম ১০০% কটন', 'ঐতিহ্যবাহী হাতের সূচিশিল্প', 'প্রি-শ্রাংক ফ্যাব্রিক', 'আরামদায়ক রেগুলার ফিট'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Regular', 'Sleeve': 'Full Sleeve', 'Pattern': 'Embroidered', 'Care': 'Machine Wash Cold' },
    specificationsBn: { 'উপাদান': '১০০% কটন', 'ফিট': 'রেগুলার', 'হাতা': 'ফুল স্লিভ', 'প্যাটার্ন': 'এমব্রয়ডারি', 'যত্ন': 'মেশিন ওয়াশ কোল্ড' },
    description: 'An exquisite Aarong cotton punjabi featuring traditional hand embroidery on premium fabric. Perfect for festive occasions and everyday elegance.',
    descriptionBn: 'প্রিমিয়াম ফ্যাব্রিকে ঐতিহ্যবাহী হাতের সূচিশিল্প সমৃদ্ধ একটি দারুণ আড়ং কটন পাঞ্জাবি। উৎসব এবং দৈনন্দিন কমনীয়তার জন্য উপযুক্ত।',
    warranty: 'N/A', returnPolicy: '7 Days Return (unworn with tags)', weight: 350,
  },
  {
    id: 'prod-7', slug: 'apple-airpods-pro-2', title: 'Apple AirPods Pro 2nd Gen USB-C',
    titleBn: 'অ্যাপল এয়ারপডস প্রো ২য় জেন USB-C', brand: 'Apple', brandSlug: 'apple',
    categoryId: 'cat-1-3', categorySlug: 'headphones', categoryName: 'Headset', categoryNameBn: 'হেডফোন',
    price: 2899900, compareAt: null, rating: 4.7, reviewCount: 445, inStock: true, stockQty: 25,
    sku: 'APP-APP2-USC', tags: ['ANC', 'Wireless', 'Apple'], isFeatured: false, isNew: false, isBestSeller: true, colorHue: 0,
    variants: [],
    highlights: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C Charging Case', 'IP54 Dust & Water Resistant'],
    highlightsBn: ['অ্যাক্টিভ নয়েজ ক্যান্সেলেশন', 'অ্যাডাপ্টিভ অডিও', 'USB-C চার্জিং কেস', 'IP54 ধুলো ও পানি প্রতিরোধী'],
    specifications: { 'Type': 'In-ear TWS', 'ANC': 'Yes', 'Chip': 'Apple H2', 'Battery': '6h ANC / 30h total', 'Charging': 'USB-C, MagSafe, Qi', 'Resistance': 'IP54', 'Weight': '5.3g per bud' },
    specificationsBn: { 'ধরন': 'ইন-ইয়ার TWS', 'ANC': 'হ্যাঁ', 'চিপ': 'Apple H2', 'ব্যাটারি': '৬ঘ ANC / ৩০ঘ মোট', 'চার্জিং': 'USB-C, MagSafe, Qi', 'প্রতিরোধ': 'IP54', 'ওজন': '৫.৩গ্রাম প্রতি বাড' },
    description: 'Apple AirPods Pro 2nd Generation with the powerful H2 chip for industry-leading Active Noise Cancellation, Adaptive Audio, and now with USB-C charging.',
    descriptionBn: 'Apple AirPods Pro 2nd Generation শক্তিশালী H2 চিপ সহ শিল্প-নেতৃত্বাধীন Active Noise Cancellation, Adaptive Audio এবং এখন USB-C চার্জিং।',
    warranty: '1 Year Apple Warranty', returnPolicy: '14 Days Return', weight: 51,
  },
  {
    id: 'prod-8', slug: 'yellow-casual-sneakers-white', title: 'Yellow Classic Casual Sneakers - White',
    titleBn: 'ইয়েলো ক্লাসিক ক্যাজুয়াল স্নিকার্স - সাদা', brand: 'Yellow', brandSlug: 'yellow',
    categoryId: 'cat-2-3', categorySlug: 'shoes', categoryName: 'Shoes', categoryNameBn: 'জুতা',
    price: 279900, compareAt: 359900, rating: 4.2, reviewCount: 87, inStock: true, stockQty: 48,
    sku: 'YLW-SNK-WH', tags: ['Casual', 'Comfortable', 'BD Brand'], isFeatured: false, isNew: true, isBestSeller: false, colorHue: 45,
    variants: [
      { id: 'v-8-1', sku: 'YLW-SNK-WH-40', title: 'EU 40', optionValues: { Size: '40' }, price: 279900, compareAt: 359900, inStock: true, stockQty: 12 },
      { id: 'v-8-2', sku: 'YLW-SNK-WH-41', title: 'EU 41', optionValues: { Size: '41' }, price: 279900, compareAt: 359900, inStock: true, stockQty: 12 },
      { id: 'v-8-3', sku: 'YLW-SNK-WH-42', title: 'EU 42', optionValues: { Size: '42' }, price: 279900, compareAt: 359900, inStock: true, stockQty: 12 },
      { id: 'v-8-4', sku: 'YLW-SNK-WH-43', title: 'EU 43', optionValues: { Size: '43' }, price: 279900, compareAt: 359900, inStock: true, stockQty: 12 },
    ],
    highlights: ['Premium Canvas Upper', 'Cushioned Insole', 'Durable Rubber Sole', 'Versatile Everyday Style'],
    highlightsBn: ['প্রিমিয়াম ক্যানভাস আপার', 'কুশনড ইনসোল', 'টেকসই রাবার সোল', 'বহুমুখী দৈনন্দিন স্টাইল'],
    specifications: { 'Upper': 'Canvas', 'Sole': 'Rubber', 'Closure': 'Lace-up', 'Insole': 'Cushioned EVA' },
    specificationsBn: { 'আপার': 'ক্যানভাস', 'সোল': 'রাবার', 'ক্লোজার': 'লেস-আপ', 'ইনসোল': 'কুশনড EVA' },
    description: 'Step out in style with Yellow Classic Casual Sneakers. Premium canvas upper with a cushioned insole for all-day comfort.',
    descriptionBn: 'Yellow Classic Casual Sneakers দিয়ে স্টাইলে পা রাখুন। সারাদিনের আরামের জন্য কুশনড ইনসোল সহ প্রিমিয়াম ক্যানভাস আপার।',
    warranty: '3 Months Warranty', returnPolicy: '7 Days Return (unworn)', weight: 420,
  },
  {
    id: 'prod-9', slug: 'stainless-steel-water-bottle-1l', title: 'Premium Stainless Steel Water Bottle 1L',
    titleBn: 'প্রিমিয়াম স্টেইনলেস স্টিল ওয়াটার বোতল ১লি', brand: 'HomeLux', brandSlug: 'homelux',
    categoryId: 'cat-3-2', categorySlug: 'kitchen', categoryName: 'Kitchen', categoryNameBn: 'রান্নাঘর',
    price: 89900, compareAt: 129900, rating: 4.5, reviewCount: 213, inStock: true, stockQty: 200,
    sku: 'HL-WB-1L-SS', tags: ['BPA Free', 'Insulated', 'Eco'], isFeatured: false, isNew: false, isBestSeller: true, colorHue: 190,
    variants: [],
    highlights: ['Double-wall Vacuum Insulation', 'Keeps Cold 24h / Hot 12h', '18/8 Stainless Steel', 'BPA-free, Leak-proof'],
    highlightsBn: ['ডাবল-ওয়াল ভ্যাকুয়াম ইনসুলেশন', 'ঠান্ডা ২৪ঘ / গরম ১২ঘ', '১৮/৮ স্টেইনলেস স্টিল', 'BPA-ফ্রি, লিক-প্রুফ'],
    specifications: { 'Material': '18/8 Stainless Steel', 'Capacity': '1 Liter', 'Insulation': 'Double-wall Vacuum', 'Lid': 'Leak-proof Screw Cap', 'Weight': '350g' },
    specificationsBn: { 'উপাদান': '১৮/৮ স্টেইনলেস স্টিল', 'ধারণক্ষমতা': '১ লিটার', 'ইনসুলেশন': 'ডাবল-ওয়াল ভ্যাকুয়াম', 'ঢাকনা': 'লিক-প্রুফ স্ক্রু ক্যাপ', 'ওজন': '৩৫০গ্রাম' },
    description: 'Stay hydrated with this premium double-wall insulated stainless steel water bottle. Keeps drinks cold for 24 hours and hot for 12 hours.',
    descriptionBn: 'এই প্রিমিয়াম ডাবল-ওয়াল ইনসুলেটেড স্টেইনলেস স্টিল ওয়াটার বোতল দিয়ে হাইড্রেটেড থাকুন। পানীয় ২৪ ঘণ্টা ঠান্ডা এবং ১২ ঘণ্টা গরম রাখে।',
    warranty: '6 Months Warranty', returnPolicy: '7 Days Return', weight: 350,
  },
  {
    id: 'prod-10', slug: 'samsung-galaxy-tab-a9-plus', title: 'Samsung Galaxy Tab A9+ WiFi 8/128GB',
    titleBn: 'স্যামসাং গ্যালাক্সি ট্যাব A9+ WiFi ৮/১২৮জিবি', brand: 'Samsung', brandSlug: 'samsung',
    categoryId: 'cat-1-4', categorySlug: 'tablets', categoryName: 'Tablets', categoryNameBn: 'ট্যাবলেট',
    price: 2799900, compareAt: 3199900, rating: 4.3, reviewCount: 56, inStock: true, stockQty: 15,
    sku: 'SM-X210-128', tags: ['Tab', 'Entertainment', 'Samsung'], isFeatured: false, isNew: true, isBestSeller: false, colorHue: 220,
    variants: [],
    highlights: ['11" TFT LCD Display', 'Snapdragon 695', 'Quad Speakers with Dolby Atmos', '7040mAh Battery'],
    highlightsBn: ['১১" TFT LCD ডিসপ্লে', 'Snapdragon ৬৯৫', 'ডলবি অ্যাটমোস সহ কোয়াড স্পিকার', '৭০৪০mAh ব্যাটারি'],
    specifications: { 'Display': '11" WUXGA TFT', 'Processor': 'Snapdragon 695', 'RAM': '8GB', 'Storage': '128GB + microSD', 'Camera': '8MP rear, 5MP front', 'Battery': '7040mAh', 'Weight': '480g' },
    specificationsBn: { 'ডিসপ্লে': '১১" WUXGA TFT', 'প্রসেসর': 'Snapdragon ৬৯৫', 'র‍্যাম': '৮জিবি', 'স্টোরেজ': '১২৮জিবি + microSD', 'ক্যামেরা': '৮MP পিছনে, ৫MP সামনে', 'ব্যাটারি': '৭০৪০mAh', 'ওজন': '৪৮০গ্রাম' },
    description: 'The Samsung Galaxy Tab A9+ offers a large 11-inch display with quad speakers and Dolby Atmos for immersive entertainment on the go.',
    descriptionBn: 'Samsung Galaxy Tab A9+ চলার পথে নিমজ্জিত বিনোদনের জন্য কোয়াড স্পিকার এবং Dolby Atmos সহ একটি বড় ১১-ইঞ্চি ডিসপ্লে অফার করে।',
    warranty: '1 Year Official Warranty', returnPolicy: '14 Days Return', weight: 480,
  },
  {
    id: 'prod-11', slug: 'organic-mustard-oil-1l', title: 'Organic Cold-Pressed Mustard Oil 1L',
    titleBn: 'অর্গানিক কোল্ড-প্রেসড সরিষার তেল ১লি', brand: 'FreshBD', brandSlug: 'freshbd',
    categoryId: 'cat-7', categorySlug: 'groceries', categoryName: 'Groceries', categoryNameBn: 'মুদিখানা',
    price: 39900, compareAt: null, rating: 4.4, reviewCount: 342, inStock: true, stockQty: 500,
    sku: 'FBD-MO-1L', tags: ['Organic', 'Cold Pressed', 'Natural'], isFeatured: false, isNew: false, isBestSeller: true, colorHue: 50,
    variants: [],
    highlights: ['100% Organic Mustard Seeds', 'Cold-Pressed for Purity', 'No Additives or Preservatives', 'Traditional BD Processing'],
    highlightsBn: ['১০০% অর্গানিক সরিষা বীজ', 'বিশুদ্ধতার জন্য কোল্ড-প্রেসড', 'কোন সংযোজক বা প্রিজার্ভেটিভ নেই', 'ঐতিহ্যবাহী বাংলাদেশি প্রক্রিয়াজাতকরণ'],
    specifications: { 'Volume': '1 Liter', 'Type': 'Cold-Pressed Mustard Oil', 'Ingredients': '100% Mustard Seeds', 'Shelf Life': '12 Months', 'Storage': 'Cool, Dry Place' },
    specificationsBn: { 'পরিমাণ': '১ লিটার', 'ধরন': 'কোল্ড-প্রেসড সরিষার তেল', 'উপাদান': '১০০% সরিষা বীজ', 'শেলফ লাইফ': '১২ মাস', 'সংরক্ষণ': 'ঠান্ডা, শুষ্ক স্থান' },
    description: 'Pure organic cold-pressed mustard oil made from premium Bangladesh mustard seeds using traditional methods. No additives, no preservatives.',
    descriptionBn: 'ঐতিহ্যবাহী পদ্ধতি ব্যবহার করে প্রিমিয়াম বাংলাদেশি সরিষা বীজ থেকে তৈরি বিশুদ্ধ অর্গানিক কোল্ড-প্রেসড সরিষার তেল।',
    warranty: 'N/A', returnPolicy: 'Non-returnable (food item)', weight: 1050,
  },
  {
    id: 'prod-12', slug: 'xiaomi-smart-band-9', title: 'Xiaomi Smart Band 9',
    titleBn: 'শাওমি স্মার্ট ব্যান্ড ৯', brand: 'Xiaomi', brandSlug: 'xiaomi',
    categoryId: 'cat-1', categorySlug: 'electronics', categoryName: 'Electronics', categoryNameBn: 'ইলেকট্রনিক্স',
    price: 349900, compareAt: 399900, rating: 4.4, reviewCount: 178, inStock: true, stockQty: 75,
    sku: 'XM-SB9', tags: ['Fitness', 'AMOLED', 'Waterproof'], isFeatured: true, isNew: true, isBestSeller: false, colorHue: 25,
    variants: [
      { id: 'v-12-1', sku: 'XM-SB9-BK', title: 'Midnight Black', optionValues: { Color: 'Black' }, price: 349900, compareAt: 399900, inStock: true, stockQty: 25 },
      { id: 'v-12-2', sku: 'XM-SB9-BL', title: 'Arctic Blue', optionValues: { Color: 'Blue' }, price: 349900, compareAt: 399900, inStock: true, stockQty: 25 },
      { id: 'v-12-3', sku: 'XM-SB9-PK', title: 'Mystic Rose', optionValues: { Color: 'Pink' }, price: 349900, compareAt: 399900, inStock: true, stockQty: 25 },
    ],
    highlights: ['1.62" AMOLED Display, 60Hz', '21-day Battery Life', '5ATM Water Resistant', '150+ Sports Modes'],
    highlightsBn: ['১.৬২" AMOLED ডিসপ্লে, ৬০Hz', '২১ দিন ব্যাটারি লাইফ', '5ATM জল প্রতিরোধী', '১৫০+ স্পোর্টস মোড'],
    specifications: { 'Display': '1.62" AMOLED, 60Hz', 'Battery': '233mAh, ~21 days', 'Sensors': 'Heart Rate, SpO2, Accelerometer', 'Water': '5ATM', 'Weight': '15.8g (without strap)' },
    specificationsBn: { 'ডিসপ্লে': '১.৬২" AMOLED, ৬০Hz', 'ব্যাটারি': '২৩৩mAh, ~২১ দিন', 'সেন্সর': 'হার্ট রেট, SpO2, অ্যাক্সেলেরোমিটার', 'জল': '5ATM', 'ওজন': '১৫.৮গ্রাম (স্ট্র্যাপ ছাড়া)' },
    description: 'The Xiaomi Smart Band 9 features a vivid AMOLED display, up to 21-day battery life, and comprehensive health tracking in a sleek, lightweight design.',
    descriptionBn: 'Xiaomi Smart Band 9-এ আছে প্রাণবন্ত AMOLED ডিসপ্লে, ২১ দিন পর্যন্ত ব্যাটারি লাইফ এবং একটি মসৃণ, হালকা ডিজাইনে ব্যাপক স্বাস্থ্য ট্র্যাকিং।',
    warranty: '1 Year Warranty', returnPolicy: '14 Days Return', weight: 27,
  },
];

// ── Helper Functions ──

export function formatBDT(amountMinor: number): string {
  const taka = amountMinor / 100;
  return `৳${taka.toLocaleString('en-BD')}`;
}

export function formatBDTEn(amountMinor: number): string {
  const taka = amountMinor / 100;
  return `৳${taka.toLocaleString('en-IN')}`;
}

export function calcDiscount(price: number, compareAt: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
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
    p.titleBn.includes(query) ||
    p.brand.toLowerCase().includes(q) ||
    p.categoryName.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.sku.toLowerCase().includes(q)
  );
}

// ── Flash deals with countdown ──
export const flashDeals = products.slice(0, 4).map(p => ({
  ...p,
  flashPrice: Math.round(p.price * 0.8),
  flashEndsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours
  claimed: Math.floor(Math.random() * 80 + 10),
  total: 100,
}));

// ── Banner data ──
export const heroBanners = [
  { id: 'b1', titleEn: 'Shop the Best of Bangladesh', titleBn: 'বাংলাদেশের সেরা কেনাকাটা করুন', subtitleEn: 'Authentic products, trusted delivery, your way', subtitleBn: 'আসল পণ্য, বিশ্বস্ত ডেলিভারি, আপনার পথে', ctaEn: 'Explore Now', ctaBn: 'এখনই দেখুন', link: '/categories/electronics', gradient: 'from-brand-charcoal to-slate-800' },
  { id: 'b2', titleEn: 'Flash Deals — Up to 50% Off', titleBn: 'ফ্ল্যাশ ডিল — ৫০% পর্যন্ত ছাড়', subtitleEn: 'Limited time offers on top products', subtitleBn: 'শীর্ষ পণ্যে সীমিত সময়ের অফার', ctaEn: 'Grab the Deal', ctaBn: 'ডিল ধরুন', link: '/categories/electronics', gradient: 'from-brand-blue to-blue-800' },
  { id: 'b3', titleEn: 'Festival Collection 2026', titleBn: 'উৎসব কালেকশন ২০২৬', subtitleEn: 'Traditional meets modern — curated for every occasion', subtitleBn: 'ঐতিহ্যের সাথে আধুনিকতা — প্রতিটি উপলক্ষের জন্য', ctaEn: 'Shop Fashion', ctaBn: 'ফ্যাশন কিনুন', link: '/categories/fashion', gradient: 'from-amber-800 to-orange-900' },
];

// ── Trending searches ──
export const trendingSearches = [
  'Samsung Galaxy', 'AirPods', 'Laptop under 50000', 'Punjabi', 'Smart Watch',
  'Water Bottle', 'Running Shoes', 'Power Bank', 'Xiaomi', 'Aarong',
];
