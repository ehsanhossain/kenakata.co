/* ═══════════════════════════════════════════════════════
   RESELLERHUB BD OFFICIAL CATALOG DATA (Kenakata.co)
   Merchant: resellerhubbd.com (Verified & Approved)
   Total Products: 74
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
export const categories: Category[] = [
  {
    "id": "cat-gadgets",
    "slug": "gadgets",
    "name": "Gadgets & Electronics",
    "nameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "parentId": null,
    "icon": "⚡",
    "productCount": 71,
    "children": [
      {
        "id": "cat-camera",
        "slug": "camera",
        "name": "Security & Action Cameras",
        "nameBn": "ক্যামেরা ও সিসিটিভি",
        "parentId": "cat-gadgets",
        "icon": "📹",
        "productCount": 6
      },
      {
        "id": "cat-earbuds",
        "slug": "earbuds",
        "name": "Earbuds & Audio",
        "nameBn": "ইয়ারবাডস ও হেডফোন",
        "parentId": "cat-gadgets",
        "icon": "🎧",
        "productCount": 3
      },
      {
        "id": "cat-electronics",
        "slug": "electronics",
        "name": "Smart Electronics & Gadgets",
        "nameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
        "parentId": "cat-gadgets",
        "icon": "💻",
        "productCount": 8
      },
      {
        "id": "cat-fan",
        "slug": "fan",
        "name": "Rechargeable Fans",
        "nameBn": "রিচার্জেবল ও পোর্টেবল ফ্যান",
        "parentId": "cat-gadgets",
        "icon": "🌀",
        "productCount": 4
      },
      {
        "id": "cat-light",
        "slug": "light",
        "name": "Smart Lights & Lamps",
        "nameBn": "স্মার্ট লাইট ও ল্যাম্প",
        "parentId": "cat-gadgets",
        "icon": "💡",
        "productCount": 5
      },
      {
        "id": "cat-mobile-accessories",
        "slug": "mobile-accessories",
        "name": "Mobile Accessories",
        "nameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
        "parentId": "cat-gadgets",
        "icon": "🔌",
        "productCount": 25
      },
      {
        "id": "cat-mobile-phone",
        "slug": "mobile-phone",
        "name": "Feature & Mini Phones",
        "nameBn": "ফিচার ও মিনি ফোন",
        "parentId": "cat-gadgets",
        "icon": "📱",
        "productCount": 9
      },
      {
        "id": "cat-mouse-keyboard",
        "slug": "mouse-keyboard",
        "name": "Keyboards & Mice",
        "nameBn": "কীবোর্ড ও মাউস",
        "parentId": "cat-gadgets",
        "icon": "⌨️",
        "productCount": 2
      },
      {
        "id": "cat-pillow",
        "slug": "pillow",
        "name": "Comfort & Health Pillows",
        "nameBn": "পিলো ও ব্যাক সাপোর্ট",
        "parentId": "cat-gadgets",
        "icon": "🛏️",
        "productCount": 1
      },
      {
        "id": "cat-printer",
        "slug": "printer",
        "name": "Thermal & Label Printers",
        "nameBn": "থার্মাল প্রিন্টার",
        "parentId": "cat-gadgets",
        "icon": "🖨️",
        "productCount": 1
      },
      {
        "id": "cat-speaker",
        "slug": "speaker",
        "name": "Bluetooth Speakers & Sound",
        "nameBn": "ব্লুটুথ স্পিকার ও অডিও",
        "parentId": "cat-gadgets",
        "icon": "🔊",
        "productCount": 6
      },
      {
        "id": "cat-ups",
        "slug": "ups",
        "name": "Mini Router UPS",
        "nameBn": "মিনি রাউটার ইউপিএস",
        "parentId": "cat-gadgets",
        "icon": "🔋",
        "productCount": 1
      }
    ]
  },
  {
    "id": "cat-home-appliance",
    "slug": "home-appliance",
    "name": "Home & Living",
    "nameBn": "হোম অ্যাপ্লায়েন্সেস",
    "parentId": null,
    "icon": "🏠",
    "productCount": 3,
    "children": [
      {
        "id": "cat-bed-sheets",
        "slug": "bed-sheets",
        "name": "3D Bed Sheets & Bedding",
        "nameBn": "থ্রিডি বেডশিট ও বেডিং",
        "parentId": "cat-home-appliance",
        "icon": "🛏️",
        "productCount": 3
      }
    ]
  }
];

// ── Brands ──
export const brands: Brand[] = [
  {
    "id": "brand-v380",
    "slug": "v380",
    "name": "V380",
    "productCount": 6,
    "colorHue": 200
  },
  {
    "id": "brand-boat",
    "slug": "boat",
    "name": "boAt",
    "productCount": 1,
    "colorHue": 282
  },
  {
    "id": "brand-recrsi",
    "slug": "recrsi",
    "name": "Recrsi",
    "productCount": 1,
    "colorHue": 329
  },
  {
    "id": "brand-apple",
    "slug": "apple",
    "name": "Apple",
    "productCount": 8,
    "colorHue": 16
  },
  {
    "id": "brand-kenakata-choice",
    "slug": "kenakata-choice",
    "name": "Kenakata Choice",
    "productCount": 30,
    "colorHue": 63
  },
  {
    "id": "brand-jysuper",
    "slug": "jysuper",
    "name": "JYSUPER",
    "productCount": 1,
    "colorHue": 79
  },
  {
    "id": "brand-ewa",
    "slug": "ewa",
    "name": "EWA",
    "productCount": 2,
    "colorHue": 142
  },
  {
    "id": "brand-ven-dens",
    "slug": "ven-dens",
    "name": "VEN-DENS",
    "productCount": 3,
    "colorHue": 189
  },
  {
    "id": "brand-awei",
    "slug": "awei",
    "name": "Awei",
    "productCount": 1,
    "colorHue": 236
  },
  {
    "id": "brand-memo",
    "slug": "memo",
    "name": "MEMO",
    "productCount": 3,
    "colorHue": 283
  },
  {
    "id": "brand-hollyland",
    "slug": "hollyland",
    "name": "Hollyland",
    "productCount": 1,
    "colorHue": 80
  },
  {
    "id": "brand-plokama",
    "slug": "plokama",
    "name": "Plokama",
    "productCount": 1,
    "colorHue": 268
  },
  {
    "id": "brand-newrixing",
    "slug": "newrixing",
    "name": "NewRixing",
    "productCount": 2,
    "colorHue": 315
  },
  {
    "id": "brand-baseus",
    "slug": "baseus",
    "name": "Baseus",
    "productCount": 1,
    "colorHue": 143
  },
  {
    "id": "brand-maxtel",
    "slug": "maxtel",
    "name": "Max",
    "productCount": 1,
    "colorHue": 237
  },
  {
    "id": "brand-winstar",
    "slug": "winstar",
    "name": "Winstar",
    "productCount": 1,
    "colorHue": 284
  },
  {
    "id": "brand-sanee",
    "slug": "sanee",
    "name": "Sanee",
    "productCount": 1,
    "colorHue": 331
  },
  {
    "id": "brand-icon",
    "slug": "icon",
    "name": "iCon",
    "productCount": 3,
    "colorHue": 18
  },
  {
    "id": "brand-vmax",
    "slug": "vmax",
    "name": "Vmax",
    "productCount": 2,
    "colorHue": 65
  },
  {
    "id": "brand-titanic",
    "slug": "titanic",
    "name": "Titanic",
    "productCount": 1,
    "colorHue": 253
  },
  {
    "id": "brand-jbl",
    "slug": "jbl",
    "name": "JBL",
    "productCount": 2,
    "colorHue": 128
  },
  {
    "id": "brand-xtreme",
    "slug": "xtreme",
    "name": "XTREME",
    "productCount": 1,
    "colorHue": 269
  },
  {
    "id": "brand-trs",
    "slug": "trs",
    "name": "TRS",
    "productCount": 1,
    "colorHue": 50
  }
];

// ── Products ──
export const products: Product[] = [
  {
    "id": "rhb-prod-1",
    "slug": "panorama-wifi-ip-camera-fish-eye",
    "title": "Panorama WiFi IP Camera ( Fish Eye)",
    "titleBn": "Panorama WiFi IP Camera ( Fish Eye)",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 140000,
    "compareAt": 199000,
    "rating": 4.8,
    "reviewCount": 12,
    "inStock": true,
    "stockQty": 25,
    "sku": "2085",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-1-1",
        "sku": "2085",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 140000,
        "compareAt": 199000,
        "inStock": true,
        "stockQty": 25
      }
    ],
    "highlights": [
      "App: V380",
      "Megapixel: 1.3mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380",
      "Megapixel": "1.3mp",
      "Model": "Panorama WiFi IP Camera ( Fish Eye)"
    },
    "specificationsBn": {
      "মডেল": "Panorama WiFi IP Camera ( Fish Eye)",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Panorama WiFi IP Camera ( Fish Eye)",
    "descriptionBn": "Panorama WiFi IP Camera ( Fish Eye)",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": true,
    "colorHue": 0,
    "images": [
      "/uploads/products/camera/1/product_1780818030_6768-5.jpg",
      "/uploads/products/camera/1/product_1780989286_1346.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-2",
    "slug": "v7-vr-cam",
    "title": "V7 VR CAM",
    "titleBn": "V7 VR CAM",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 205000,
    "compareAt": 279900,
    "rating": 4.8999999999999995,
    "reviewCount": 19,
    "inStock": true,
    "stockQty": 38,
    "sku": "2086",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-2-1",
        "sku": "2086",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 205000,
        "compareAt": 279900,
        "inStock": true,
        "stockQty": 38
      }
    ],
    "highlights": [
      "App: V380",
      "Megapixel: 3mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380",
      "Megapixel": "3mp",
      "Model": "V7 VR CAM"
    },
    "specificationsBn": {
      "মডেল": "V7 VR CAM",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "With Adapter & Lan Port",
    "descriptionBn": "With Adapter & Lan Port",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 47,
    "images": [
      "/uploads/products/camera/2/product_1780818030_6768-4.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-3",
    "slug": "bulb-panoramic-fish-eye",
    "title": "Bulb Panoramic (Fish Eye)",
    "titleBn": "Bulb Panoramic (Fish Eye)",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 170000,
    "compareAt": 235000,
    "rating": 5,
    "reviewCount": 26,
    "inStock": true,
    "stockQty": 51,
    "sku": "2087",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-3-1",
        "sku": "2087",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 170000,
        "compareAt": 235000,
        "inStock": true,
        "stockQty": 51
      }
    ],
    "highlights": [
      "App: V380",
      "Megapixel: 2mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380",
      "Megapixel": "2mp",
      "Model": "Bulb Panoramic (Fish Eye)"
    },
    "specificationsBn": {
      "মডেল": "Bulb Panoramic (Fish Eye)",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "wifi ip camera E27",
    "descriptionBn": "wifi ip camera E27",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 94,
    "images": [
      "/uploads/products/camera/3/product_1780818030_6768-3.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-4",
    "slug": "dual-lens-h1",
    "title": "Dual lens H1",
    "titleBn": "Dual lens H1",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 250000,
    "compareAt": 350000,
    "rating": 4.8,
    "reviewCount": 33,
    "inStock": true,
    "stockQty": 64,
    "sku": "2088",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-4-1",
        "sku": "2088",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 250000,
        "compareAt": 350000,
        "inStock": true,
        "stockQty": 64
      }
    ],
    "highlights": [
      "App: V380",
      "Megapixel: 3+3mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380",
      "Megapixel": "3+3mp",
      "Model": "Dual lens H1"
    },
    "specificationsBn": {
      "মডেল": "Dual lens H1",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Wifi With Adapter & Lan Port",
    "descriptionBn": "Wifi With Adapter & Lan Port",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 141,
    "images": [
      "/uploads/products/camera/4/product_1780818030_6768-2-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-5",
    "slug": "c30-video-calling-camera",
    "title": "C30 (Video Calling Camera)",
    "titleBn": "C30 (Video Calling Camera)",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 190000,
    "compareAt": 250000,
    "rating": 4.8999999999999995,
    "reviewCount": 40,
    "inStock": true,
    "stockQty": 77,
    "sku": "2100",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-5-1",
        "sku": "2100",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 190000,
        "compareAt": 250000,
        "inStock": true,
        "stockQty": 77
      }
    ],
    "highlights": [
      "App: V380 Pro",
      "Megapixel: 2mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380 Pro",
      "Megapixel": "2mp",
      "Model": "C30 (Video Calling Camera)"
    },
    "specificationsBn": {
      "মডেল": "C30 (Video Calling Camera)",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "C30 (Video Calling Camera)",
    "descriptionBn": "C30 (Video Calling Camera)",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 188,
    "images": [
      "/uploads/products/camera/5/product_1780818030_6768-1.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-6",
    "slug": "ap-q7-one-antenna-camera",
    "title": "AP Q7 (One Antenna) Camera",
    "titleBn": "AP Q7 (One Antenna) Camera",
    "brand": "V380",
    "brandSlug": "v380",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-camera",
    "categorySlug": "camera",
    "categoryName": "Security & Action Cameras",
    "categoryNameBn": "ক্যামেরা ও সিসিটিভি",
    "price": 130000,
    "compareAt": 189900,
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "stockQty": 90,
    "sku": "2077",
    "tags": [
      "gadgets",
      "camera",
      "v380",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-6-1",
        "sku": "2077",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 130000,
        "compareAt": 189900,
        "inStock": true,
        "stockQty": 90
      }
    ],
    "highlights": [
      "App: V380",
      "Megapixel: 2mp"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "App": "V380",
      "Megapixel": "2mp",
      "Model": "AP Q7 (One Antenna)"
    },
    "specificationsBn": {
      "মডেল": "AP Q7 (One Antenna) Camera",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "AP Q7 (One Antenna) Camera",
    "descriptionBn": "AP Q7 (One Antenna) Camera",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 235,
    "images": [
      "/uploads/products/camera/6/product_1780818030_6768.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-7",
    "slug": "boat-eb09-200-hours-bluetooth-neckband",
    "title": "boAt EB09 200 Hours Bluetooth Neckband",
    "titleBn": "boAt EB09 200 Hours Bluetooth Neckband",
    "brand": "boAt",
    "brandSlug": "boat",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-earbuds",
    "categorySlug": "earbuds",
    "categoryName": "Earbuds & Audio",
    "categoryNameBn": "ইয়ারবাডস ও হেডফোন",
    "price": 45000,
    "compareAt": 89900,
    "rating": 4.8,
    "reviewCount": 54,
    "inStock": true,
    "stockQty": 103,
    "sku": "00000-1",
    "tags": [
      "gadgets",
      "earbuds",
      "boat",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-7-1",
        "sku": "00000-1",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 45000,
        "compareAt": 89900,
        "inStock": true,
        "stockQty": 103
      }
    ],
    "highlights": [
      "১০০% Original High Quality",
      "Magnetic ON/OFF",
      "5 Voice Change",
      "Calling Vibration",
      "দীর্ঘস্থায়ী ব্যাটারি লাইফ",
      "200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "boAt EB09 200 Hours Bluetooth Neckband",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "boAt EB09 200 Hours Bluetooth Neckband",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "‼️২০০ ঘন্টা নিকব্যান্ড ‼️\n\n✅ ১০০% Original High Quality\n\n◼️ Model-EB09\n\n🔵যেসকল ফিচার রয়েছে:__\n\n✅Magnetic ON/OFF\n\n✅5 Voice Change\n\n✅Calling Vibration\n\n✅দীর্ঘস্থায়ী ব্যাটারি লাইফ\n\n✅200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।\n\n✅সম্পূর্ণ স্বচ্ছ ডিজাইন\n\n✅Type-c charging port\n\n✅গানের মোড চেঞ্জ করে Bass বাড়ানো কমানোর অপশন রয়েছে।\n\n✅100% Original Product\n\n✅fast charging support\n\n✅calling system\n\n✅high quality product\n\n✅Bass Port Superior Sound\n\n✅Hand Free Call\n\n✅Use For Sport\n\n✅Distance 15 miter",
    "descriptionBn": "‼️২০০ ঘন্টা নিকব্যান্ড ‼️\n\n✅ ১০০% Original High Quality\n\n◼️ Model-EB09\n\n🔵যেসকল ফিচার রয়েছে:__\n\n✅Magnetic ON/OFF\n\n✅5 Voice Change\n\n✅Calling Vibration\n\n✅দীর্ঘস্থায়ী ব্যাটারি লাইফ\n\n✅200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।\n\n✅সম্পূর্ণ স্বচ্ছ ডিজাইন\n\n✅Type-c charging port\n\n✅গানের মোড চেঞ্জ করে Bass বাড়ানো কমানোর অপশন রয়েছে।\n\n✅100% Original Product\n\n✅fast charging support\n\n✅calling system\n\n✅high quality product\n\n✅Bass Port Superior Sound\n\n✅Hand Free Call\n\n✅Use For Sport\n\n✅Distance 15 miter",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 282,
    "images": [
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.46-AM-1-1024x718.jpeg",
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.46-AM-683x1024.jpeg",
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.47-AM-1-1024x683.jpeg",
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.47-AM-576x1024.jpeg",
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.48-AM-1.jpeg",
      "/uploads/products/earbuds/1/WhatsApp-Image-2026-06-03-at-4.21.48-AM-683x1024.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-8",
    "slug": "recrsi-re-ny060-200-hours-bluetooth-neckband",
    "title": "Recrsi RE-NY060 200 Hours Bluetooth Neckband",
    "titleBn": "Recrsi RE-NY060 200 Hours Bluetooth Neckband",
    "brand": "Recrsi",
    "brandSlug": "recrsi",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-earbuds",
    "categorySlug": "earbuds",
    "categoryName": "Earbuds & Audio",
    "categoryNameBn": "ইয়ারবাডস ও হেডফোন",
    "price": 40000,
    "compareAt": 75000,
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "stockQty": 36,
    "sku": "00000",
    "tags": [
      "gadgets",
      "earbuds",
      "recrsi",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-8-1",
        "sku": "00000",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 40000,
        "compareAt": 75000,
        "inStock": true,
        "stockQty": 36
      }
    ],
    "highlights": [
      "১০০% Original High Quality",
      "ডিজিটাল ডিসপ্লে__",
      "দীর্ঘস্থায়ী ব্যাটারি লাইফ",
      "200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।",
      "সম্পূর্ণ স্বচ্ছ ডিজাইন",
      "মেমোরিকার্ড ব্যবহার করতে পারবেন।"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Recrsi RE-NY060 200 Hours Bluetooth Neckband",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Recrsi RE-NY060 200 Hours Bluetooth Neckband",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "‼️২০০ ঘন্টা নিকব্যান্ড ‼️\n\n✅ ১০০% Original High Quality\n\n◼️ Recarsi RE NY060\n\n🔵যেসকল ফিচার রয়েছে:__\n\n✅ডিজিটাল ডিসপ্লে__\n\n✅দীর্ঘস্থায়ী ব্যাটারি লাইফ\n\n✅200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।\n\n✅সম্পূর্ণ স্বচ্ছ ডিজাইন\n\n✅মেমোরিকার্ড ব্যবহার করতে পারবেন।\n\n✅Type-c charging port\n\n✅গানের মোড চেঞ্জ করে Bass বাড়ানো কমানোর অপশন রয়েছে।\n\n✅100% Original Product\n\n✅fast charging support\n\n✅calling system\n\n✅high quality product\n\n✅Bass Port Superior Sound\n\n✅Hand Free Call\n\n✅Use For Sport\n\n✅Distance 15 miter",
    "descriptionBn": "‼️২০০ ঘন্টা নিকব্যান্ড ‼️\n\n✅ ১০০% Original High Quality\n\n◼️ Recarsi RE NY060\n\n🔵যেসকল ফিচার রয়েছে:__\n\n✅ডিজিটাল ডিসপ্লে__\n\n✅দীর্ঘস্থায়ী ব্যাটারি লাইফ\n\n✅200ঘন্টা চার্জিং ব্যাকআপ,,পাবেন।\n\n✅সম্পূর্ণ স্বচ্ছ ডিজাইন\n\n✅মেমোরিকার্ড ব্যবহার করতে পারবেন।\n\n✅Type-c charging port\n\n✅গানের মোড চেঞ্জ করে Bass বাড়ানো কমানোর অপশন রয়েছে।\n\n✅100% Original Product\n\n✅fast charging support\n\n✅calling system\n\n✅high quality product\n\n✅Bass Port Superior Sound\n\n✅Hand Free Call\n\n✅Use For Sport\n\n✅Distance 15 miter",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 329,
    "images": [
      "/uploads/products/earbuds/2/1762715133-giant_366429.jpg",
      "/uploads/products/earbuds/2/1762715133-giant_366430.jpg",
      "/uploads/products/earbuds/2/1762715133-giant_366431.jpg",
      "/uploads/products/earbuds/2/WhatsApp-Image-2026-06-03-at-4.20.55-AM-768x1024.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-9",
    "slug": "dubai-made-airpods-pro-master-copy-black",
    "title": "Dubai Made AirPods Pro Master Copy - Black",
    "titleBn": "Dubai Made AirPods Pro Master Copy - Black",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-earbuds",
    "categorySlug": "earbuds",
    "categoryName": "Earbuds & Audio",
    "categoryNameBn": "ইয়ারবাডস ও হেডফোন",
    "price": 45000,
    "compareAt": 79900,
    "rating": 5,
    "reviewCount": 23,
    "inStock": true,
    "stockQty": 49,
    "sku": "0008",
    "tags": [
      "gadgets",
      "earbuds",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-9-1",
        "sku": "0008",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 45000,
        "compareAt": 79900,
        "inStock": true,
        "stockQty": 49
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Dubai Made AirPods Pro Master Copy - Black",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Dubai Made AirPods Pro Master Copy - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Dubai Made AirPods Pro Master Copy হলো তাদের জন্য একটি ভালো অপশন, যারা কম দামে AirPods Pro-এর ডিজাইন ও ওয়্যারলেস সুবিধা উপভোগ করতে চান। বাংলাদেশে দৈনন্দিন ব্যবহার—কল, গান, ভিডিও দেখা এবং অনলাইন ক্লাসের জন্য এটি উপযোগী। অপ্রয়োজনীয় ফিচার না থাকায় দামও তুলনামূলক কম রাখা হয়েছে।\n\nএই AirPods Pro Dubai ভার্সনটি আরামদায়ক ফিট, সহজ টাচ কন্ট্রোল এবং স্টেবল ব্লুটুথ কানেকশন দেয়, যা প্রতিদিনের ব্যবহারের জন্য যথেষ্ট নির্ভরযোগ্য।\n\n🔹 মূল বৈশিষ্ট্য\n\nDubai made AirPods Pro master copy\n\nপ্রিমিয়াম AirPods Pro–স্টাইল ডিজাইন\n\nআধুনিক Type-C চার্জিং কেস\n\nকল ও মিউজিকের জন্য স্মুথ টাচ কন্ট্রোল\n\nনিয়মিত ব্যবহার উপযোগী পরিষ্কার সাউন্ড\n\nদীর্ঘ সময় ব্যবহারের জন্য আরামদায়ক ফিট\n\nActive Noise Cancellation (ANC) নেই\n\n🔋 ব্যাটারি ও চার্জিং\n\nপ্রতিটি ইয়ারবাড একবার চার্জে প্রায় ২.৫ থেকে ৩ ঘণ্টা পর্যন্ত ব্যবহার করা যায়। চার্জিং কেসের মাধ্যমে প্রায় ৩ বার সম্পূর্ণ চার্জ দেওয়া যায়, ফলে সাধারণ ব্যবহারে সারাদিন চালানো সম্ভব।\n\nType-C চার্জিং পোর্ট থাকায় দ্রুত ও নির্ভরযোগ্য চার্জিং পাওয়া যায়। খরচ কম রাখতে বক্সে একটি ডামি চার্জিং কেবল দেওয়া হয়েছে।\n\n👤 কার জন্য উপযুক্ত?\n\nএই AirPods Pro master copyটি বিশেষভাবে উপযোগী:\n\nশিক্ষার্থী ও অনলাইন ক্লাস ব্যবহারকারীদের জন্য\n\nসাধারণ মিউজিক শোনার জন্য\n\nঅফিস কল ও মিটিংয়ের জন্য\n\nযারা কম দামে AirPods Pro Dubai ভার্সন খুঁজছেন\n\nআপনি যদি প্রিমিয়াম লুক চান কিন্তু বেশি খরচ করতে না চান, তাহলে এটি একটি ভ্যালু-ফর-মানি প্রোডাক্ট।\n\n📦 বক্সে যা থাকছে\n\n১× Dubai Made AirPods Pro Master Copy\n\n১× Type-C Charging Case\n\n১× Dummy Charging Cable\n\n❓ সাধারণ প্রশ্নোত্তর\n\nপ্রশ্ন: এতে কি ANC আছে?\n\nউত্তর: না, এই ভার্সনে Active Noise Cancellation (ANC) নেই।\n\nপ্রশ্ন: ব্যাটারি ব্যাকআপ কত?\n\nউত্তর: ইয়ারবাডে ২.৫–৩ ঘণ্টা, কেস দিয়ে অতিরিক্ত প্রায় ৩ বার চার্জ দেওয়া যায়।\n\nপ্রশ্ন: এটি কি অরিজিনাল Apple প্রোডাক্ট?\n\nউত্তর: না, এটি একটি Dubai-made master copy, অরিজিনাল Apple প্রোডাক্ট নয়।",
    "descriptionBn": "Dubai Made AirPods Pro Master Copy হলো তাদের জন্য একটি ভালো অপশন, যারা কম দামে AirPods Pro-এর ডিজাইন ও ওয়্যারলেস সুবিধা উপভোগ করতে চান। বাংলাদেশে দৈনন্দিন ব্যবহার—কল, গান, ভিডিও দেখা এবং অনলাইন ক্লাসের জন্য এটি উপযোগী। অপ্রয়োজনীয় ফিচার না থাকায় দামও তুলনামূলক কম রাখা হয়েছে।\n\nএই AirPods Pro Dubai ভার্সনটি আরামদায়ক ফিট, সহজ টাচ কন্ট্রোল এবং স্টেবল ব্লুটুথ কানেকশন দেয়, যা প্রতিদিনের ব্যবহারের জন্য যথেষ্ট নির্ভরযোগ্য।\n\n🔹 মূল বৈশিষ্ট্য\n\nDubai made AirPods Pro master copy\n\nপ্রিমিয়াম AirPods Pro–স্টাইল ডিজাইন\n\nআধুনিক Type-C চার্জিং কেস\n\nকল ও মিউজিকের জন্য স্মুথ টাচ কন্ট্রোল\n\nনিয়মিত ব্যবহার উপযোগী পরিষ্কার সাউন্ড\n\nদীর্ঘ সময় ব্যবহারের জন্য আরামদায়ক ফিট\n\nActive Noise Cancellation (ANC) নেই\n\n🔋 ব্যাটারি ও চার্জিং\n\nপ্রতিটি ইয়ারবাড একবার চার্জে প্রায় ২.৫ থেকে ৩ ঘণ্টা পর্যন্ত ব্যবহার করা যায়। চার্জিং কেসের মাধ্যমে প্রায় ৩ বার সম্পূর্ণ চার্জ দেওয়া যায়, ফলে সাধারণ ব্যবহারে সারাদিন চালানো সম্ভব।\n\nType-C চার্জিং পোর্ট থাকায় দ্রুত ও নির্ভরযোগ্য চার্জিং পাওয়া যায়। খরচ কম রাখতে বক্সে একটি ডামি চার্জিং কেবল দেওয়া হয়েছে।\n\n👤 কার জন্য উপযুক্ত?\n\nএই AirPods Pro master copyটি বিশেষভাবে উপযোগী:\n\nশিক্ষার্থী ও অনলাইন ক্লাস ব্যবহারকারীদের জন্য\n\nসাধারণ মিউজিক শোনার জন্য\n\nঅফিস কল ও মিটিংয়ের জন্য\n\nযারা কম দামে AirPods Pro Dubai ভার্সন খুঁজছেন\n\nআপনি যদি প্রিমিয়াম লুক চান কিন্তু বেশি খরচ করতে না চান, তাহলে এটি একটি ভ্যালু-ফর-মানি প্রোডাক্ট।\n\n📦 বক্সে যা থাকছে\n\n১× Dubai Made AirPods Pro Master Copy\n\n১× Type-C Charging Case\n\n১× Dummy Charging Cable\n\n❓ সাধারণ প্রশ্নোত্তর\n\nপ্রশ্ন: এতে কি ANC আছে?\n\nউত্তর: না, এই ভার্সনে Active Noise Cancellation (ANC) নেই।\n\nপ্রশ্ন: ব্যাটারি ব্যাকআপ কত?\n\nউত্তর: ইয়ারবাডে ২.৫–৩ ঘণ্টা, কেস দিয়ে অতিরিক্ত প্রায় ৩ বার চার্জ দেওয়া যায়।\n\nপ্রশ্ন: এটি কি অরিজিনাল Apple প্রোডাক্ট?\n\nউত্তর: না, এটি একটি Dubai-made master copy, অরিজিনাল Apple প্রোডাক্ট নয়।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 16,
    "images": [
      "/uploads/products/earbuds/3/image-1.jpg",
      "/uploads/products/earbuds/3/image-2-1.jpg",
      "/uploads/products/earbuds/3/image-3.jpg",
      "/uploads/products/earbuds/3/WhatsApp-Image-2026-06-03-at-4.24.58-AM-1024x1024.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-10",
    "slug": "stacking-blocks-rgb-color-led-night-light",
    "title": "Stacking Blocks RGB Color LED Night Light",
    "titleBn": "Stacking Blocks RGB Color LED Night Light",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 49000,
    "compareAt": 99000,
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "stockQty": 62,
    "sku": "12177",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-10-1",
        "sku": "12177",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 49000,
        "compareAt": 99000,
        "inStock": true,
        "stockQty": 62
      }
    ],
    "highlights": [
      "Power Button: ল্যাম্পটি খুব সহজেই অন বা অফ করার জন্য।"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Power Button": "ল্যাম্পটি খুব সহজেই অন বা অফ করার জন্য।",
      "Brightness/Mode Button": "সূর্যের মতো আইকন যুক্ত এই বাটনটি দিয়ে আপনার মুড অনুযায়ী আলোর তীব্রতা (Brightness) বা কালার মোড পরিবর্তন করা যায়।"
    },
    "specificationsBn": {
      "মডেল": "Stacking Blocks RGB Color LED Night Light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "স্ট্যাকিং ব্লকস RGB কালার LED নাইট লাইট: আপনার ঘরের নান্দনিক আলোর উৎস\n\nঘরের পরিবেশকে আরও আকর্ষণীয় ও স্নিগ্ধ করে তুলতে স্ট্যাকিং ব্লকস আরজিবি (RGB) নাইট লাইট একটি চমৎকার সংযোজন। এর আধুনিক ডিজাইন এবং কাস্টমাইজেবল শেপ আপনার বেডরুম, ড্রইংরুম কিংবা ওয়ার্কস্পেসে নিয়ে আসবে এক অনন্য আভিজাত্য ও প্রশান্তি।\n\nমূল বৈশিষ্ট্যসমূহ\n\nট্রান্সলুসেন্ট ও প্রিমিয়াম বডি: ল্যাম্পটির বডি উন্নতমানের ঈষৎস্বচ্ছ (Translucent) ম্যাটেরিয়াল দিয়ে তৈরি, যার ভেতর থেকে আলো চারদিকে অত্যন্ত মসৃণ ও সুন্দরভাবে ছড়িয়ে পড়ে।\n\nকাস্টমাইজড ডিজাইন: আপনার সৃজনশীলতাকে কাজে লাগিয়ে ব্লকগুলোকে পছন্দমতো একে অপরের ওপর সোজা করে বা এলোমেলোভাবে সাজিয়ে প্রতিদিন নতুন ডিজাইনের ল্যাম্প তৈরি করতে পারবেন।\n\nস্মার্ট টাচ কন্ট্রোল: এর নিচে থাকা শুভ্র সাদা বেস বা স্ট্যান্ডটিতে দুটি অত্যাধুনিক টাচ-সেন্সিটিভ বাটন রয়েছে:\n\nসর্বাধুনিক টাইপ-সি (Type-C) চার্জিং: বেসের সামনের দিকে থাকা টাইপ-সি পোর্টের মাধ্যমে ল্যাম্পটি খুব সহজেই রিচার্জ করা যায়। এছাড়া চাইলে সরাসরি ক্যাবল যুক্ত করেও নিরবচ্ছিন্নভাবে ব্যবহার করতে পারবেন।\n\nচোখের জন্য আরামদায়ক আলো: এর ভেতরে রয়েছে এনার্জি-সেভিং এবং দীর্ঘস্থায়ী LED প্রযুক্তি। এটি চোখের জন্য সম্পূর্ণ নিরাপদ এবং অল্প আলোতে ঘরে এক মায়াবী ও স্নিগ্ধ পরিবেশ (Ambient lighting) তৈরি করে।\n\nকেন বেছে নেবেন এই ল্যাম্পটি?\n\nআধুনিক প্রযুক্তি, বিদ্যুৎ সাশ্রয়ী ডিজাইন এবং নান্দনিকতার এক অপূর্ব মিশ্রণ এই স্ট্যাকিং ব্লকস ল্যাম্প। এটি শুধু একটি সাধারণ নাইট লাইট নয়, বরং আপনার ঘরের ইন্টেরিয়র ডেকোরেশনের একটি আকর্ষণীয় অংশ।\n\nনিজের ব্যবহারের জন্য কিংবা প্রিয়জনকে উপহার দেওয়ার জন্য এটি হতে পারে সেরা একটি পছন্দ!",
    "descriptionBn": "স্ট্যাকিং ব্লকস RGB কালার LED নাইট লাইট: আপনার ঘরের নান্দনিক আলোর উৎস\n\nঘরের পরিবেশকে আরও আকর্ষণীয় ও স্নিগ্ধ করে তুলতে স্ট্যাকিং ব্লকস আরজিবি (RGB) নাইট লাইট একটি চমৎকার সংযোজন। এর আধুনিক ডিজাইন এবং কাস্টমাইজেবল শেপ আপনার বেডরুম, ড্রইংরুম কিংবা ওয়ার্কস্পেসে নিয়ে আসবে এক অনন্য আভিজাত্য ও প্রশান্তি।\n\nমূল বৈশিষ্ট্যসমূহ\n\nট্রান্সলুসেন্ট ও প্রিমিয়াম বডি: ল্যাম্পটির বডি উন্নতমানের ঈষৎস্বচ্ছ (Translucent) ম্যাটেরিয়াল দিয়ে তৈরি, যার ভেতর থেকে আলো চারদিকে অত্যন্ত মসৃণ ও সুন্দরভাবে ছড়িয়ে পড়ে।\n\nকাস্টমাইজড ডিজাইন: আপনার সৃজনশীলতাকে কাজে লাগিয়ে ব্লকগুলোকে পছন্দমতো একে অপরের ওপর সোজা করে বা এলোমেলোভাবে সাজিয়ে প্রতিদিন নতুন ডিজাইনের ল্যাম্প তৈরি করতে পারবেন।\n\nস্মার্ট টাচ কন্ট্রোল: এর নিচে থাকা শুভ্র সাদা বেস বা স্ট্যান্ডটিতে দুটি অত্যাধুনিক টাচ-সেন্সিটিভ বাটন রয়েছে:\n\nসর্বাধুনিক টাইপ-সি (Type-C) চার্জিং: বেসের সামনের দিকে থাকা টাইপ-সি পোর্টের মাধ্যমে ল্যাম্পটি খুব সহজেই রিচার্জ করা যায়। এছাড়া চাইলে সরাসরি ক্যাবল যুক্ত করেও নিরবচ্ছিন্নভাবে ব্যবহার করতে পারবেন।\n\nচোখের জন্য আরামদায়ক আলো: এর ভেতরে রয়েছে এনার্জি-সেভিং এবং দীর্ঘস্থায়ী LED প্রযুক্তি। এটি চোখের জন্য সম্পূর্ণ নিরাপদ এবং অল্প আলোতে ঘরে এক মায়াবী ও স্নিগ্ধ পরিবেশ (Ambient lighting) তৈরি করে।\n\nকেন বেছে নেবেন এই ল্যাম্পটি?\n\nআধুনিক প্রযুক্তি, বিদ্যুৎ সাশ্রয়ী ডিজাইন এবং নান্দনিকতার এক অপূর্ব মিশ্রণ এই স্ট্যাকিং ব্লকস ল্যাম্প। এটি শুধু একটি সাধারণ নাইট লাইট নয়, বরং আপনার ঘরের ইন্টেরিয়র ডেকোরেশনের একটি আকর্ষণীয় অংশ।\n\nনিজের ব্যবহারের জন্য কিংবা প্রিয়জনকে উপহার দেওয়ার জন্য এটি হতে পারে সেরা একটি পছন্দ!",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 63,
    "images": [
      "/uploads/products/electronics/1/1784706421ChatGPT-Image-Jul-22-2026-01_45_33-PM.png",
      "/uploads/products/electronics/1/bCwghPi4kOJIecJU26zEnctqJebabzvEUUotKIZj-1024x1024.png",
      "/uploads/products/electronics/1/Cp817Ml3tk4C6VDIqgNgrdjSByr3nde23TkLyxVt-1024x1024.png",
      "/uploads/products/electronics/1/fAvlvkDrarDGNEhN2s2rraUe6UuQoojncS2RCIy5-1024x1024.png",
      "/uploads/products/electronics/1/gwXitPaR3S7A9d9PZbWg7dB9cY4ARWMJN6wq825A-1024x1024.png"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-11",
    "slug": "3d-led-digital-wall-table-clock",
    "title": "3D LED Digital Wall & Table Clock",
    "titleBn": "3D LED Digital Wall & Table Clock",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 50000,
    "compareAt": 75000,
    "rating": 4.8999999999999995,
    "reviewCount": 37,
    "inStock": true,
    "stockQty": 75,
    "sku": "2252",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-11-1",
        "sku": "2252",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 50000,
        "compareAt": 75000,
        "inStock": true,
        "stockQty": 75
      }
    ],
    "highlights": [
      "Colour: Photo Color",
      "Material: ABS",
      "Size: 39 x 13cm"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Colour": "Photo Color",
      "Material": "ABS",
      "Size": "39 x 13cm"
    },
    "specificationsBn": {
      "মডেল": "3D LED Digital Wall & Table Clock",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "3D LED Digital Wall Alarm Clock 15 Inch Large Snooze Night Light USB Powered with Remote Control Function Time/Date\n\n1.This clock is fully functional and easy to operate. After receiving the clock, you only need to connect the adapter to complete the installation. Please read the manual carefully before operating the clock.(NOTE:This product is without power charger adapter)\n\n2.Function: The clock can display the time (12/24)/date/temperature. The clock has a built-in brightness sensor, which can automatically adjust the brightness according to the -time scene, or you can manually adjust the brightness. The clock also has an alarm function, you need to set the time first, the clock will ring when the time is up, so that you can better manage the time.\n\n3.Unique color: The color of this clock is in sharp contrast with the traditional clock. This clock can emit pink, mint blue, blue, orange,cool white, warm white colors and other colors. The unique color makes it popular, and it is also a good choice for gifts.\n\n4.Power adapter: The clock has a built-in battery, but the clock is powered by a power adapter instead of a battery. The built-in battery has a time memory function after the clock is disconnected from the power supply.\n\nPackage Contents:\n\n1 * 15 Inch 3D Wall Clock",
    "descriptionBn": "3D LED Digital Wall Alarm Clock 15 Inch Large Snooze Night Light USB Powered with Remote Control Function Time/Date\n\n1.This clock is fully functional and easy to operate. After receiving the clock, you only need to connect the adapter to complete the installation. Please read the manual carefully before operating the clock.(NOTE:This product is without power charger adapter)\n\n2.Function: The clock can display the time (12/24)/date/temperature. The clock has a built-in brightness sensor, which can automatically adjust the brightness according to the -time scene, or you can manually adjust the brightness. The clock also has an alarm function, you need to set the time first, the clock will ring when the time is up, so that you can better manage the time.\n\n3.Unique color: The color of this clock is in sharp contrast with the traditional clock. This clock can emit pink, mint blue, blue, orange,cool white, warm white colors and other colors. The unique color makes it popular, and it is also a good choice for gifts.\n\n4.Power adapter: The clock has a built-in battery, but the clock is powered by a power adapter instead of a battery. The built-in battery has a time memory function after the clock is disconnected from the power supply.\n\nPackage Contents:\n\n1 * 15 Inch 3D Wall Clock",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 110,
    "images": [
      "/uploads/products/electronics/2/product_1784543786_7497.jpg",
      "/uploads/products/electronics/2/S24a5012c9c2546b8900db0e959e0edfaj.jpg_720x720q80.jpg_.webp",
      "/uploads/products/electronics/2/Sf6282a606c2d48bb81514da12697d04et-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-12",
    "slug": "smart-water-bottle-premium-leather-wrapped-hip-flask",
    "title": "Smart Water Bottle – Premium Leather Wrapped Hip Flask",
    "titleBn": "Smart Water Bottle – Premium Leather Wrapped Hip Flask",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 45000,
    "compareAt": 89000,
    "rating": 5,
    "reviewCount": 44,
    "inStock": true,
    "stockQty": 88,
    "sku": "13115",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-12-1",
        "sku": "13115",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 45000,
        "compareAt": 89000,
        "inStock": true,
        "stockQty": 88
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Smart Water Bottle – Premium Leather Wrapped Hip Flask",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Smart Water Bottle – Premium Leather Wrapped Hip Flask",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Smart Water Bottle – Premium Leather Wrapped Hip Flask, যা আপনার দৈনন্দিন স্টাইলকে করে আরও classy এবং premium\n\nঅনেক সময় একটি সাধারণ bottle শুধু পানির container হিসেবেই থাকে, কিন্তু দেখতে আকর্ষণীয় হয় না, carry করতেও তেমন comfortable লাগে না। Travel, office, business meeting বা gifting-এর জন্য এমন একটি product দরকার হয়, যা একই সঙ্গে stylish, compact এবং reliable। আবার অনেকেই চান এমন একটি water bottle in bangladesh বা steel water bottle যেটা premium look দেবে, সহজে bag-এ রাখা যাবে, আর daily use-এ inconvenient হবে না।\n\nকীভাবে এই Smart Water Bottle আপনার সমস্যা সহজে সমাধান করে\n\nএই Smart Water Bottle – Premium Leather Wrapped Hip Flask সেই প্রয়োজনটাই খুব সুন্দরভাবে পূরণ করে। এটি ছোট size-এর হলেও design-এ বড় impression তৈরি করে। বাইরের premium leather wrap, ভেতরের durable stainless steel body আর leak-proof screw cap—সব মিলিয়ে এটি এমন একটি accessory, যা everyday carry-কে আরও easy, smart এবং refined করে তোলে।\n\nএই Smart Water Bottle আসলে কী এবং কার জন্য পারফেক্ট ?\n\nএটি একটি 250ml water bottle বা premium hip flask style smart bottle, যা যারা compact এবং elegant lifestyle product পছন্দ করেন তাদের জন্য তৈরি। যারা stainless steel water bottle, steel water bottle, বা sports water bottle-এর মধ্যে এমন কিছু খুঁজছেন যা দেখতে premium এবং carry করতে comfortable, তাদের জন্য এটি ideal choice।\n\nএই product বিশেষভাবে উপযোগী:\n\nঅফিসে personal use-এর জন্য\n\ntravel ও outdoor lifestyle-এর জন্য\n\ngifting-এর জন্য\n\nstylish daily carry accessory হিসেবে",
    "descriptionBn": "Smart Water Bottle – Premium Leather Wrapped Hip Flask, যা আপনার দৈনন্দিন স্টাইলকে করে আরও classy এবং premium\n\nঅনেক সময় একটি সাধারণ bottle শুধু পানির container হিসেবেই থাকে, কিন্তু দেখতে আকর্ষণীয় হয় না, carry করতেও তেমন comfortable লাগে না। Travel, office, business meeting বা gifting-এর জন্য এমন একটি product দরকার হয়, যা একই সঙ্গে stylish, compact এবং reliable। আবার অনেকেই চান এমন একটি water bottle in bangladesh বা steel water bottle যেটা premium look দেবে, সহজে bag-এ রাখা যাবে, আর daily use-এ inconvenient হবে না।\n\nকীভাবে এই Smart Water Bottle আপনার সমস্যা সহজে সমাধান করে\n\nএই Smart Water Bottle – Premium Leather Wrapped Hip Flask সেই প্রয়োজনটাই খুব সুন্দরভাবে পূরণ করে। এটি ছোট size-এর হলেও design-এ বড় impression তৈরি করে। বাইরের premium leather wrap, ভেতরের durable stainless steel body আর leak-proof screw cap—সব মিলিয়ে এটি এমন একটি accessory, যা everyday carry-কে আরও easy, smart এবং refined করে তোলে।\n\nএই Smart Water Bottle আসলে কী এবং কার জন্য পারফেক্ট ?\n\nএটি একটি 250ml water bottle বা premium hip flask style smart bottle, যা যারা compact এবং elegant lifestyle product পছন্দ করেন তাদের জন্য তৈরি। যারা stainless steel water bottle, steel water bottle, বা sports water bottle-এর মধ্যে এমন কিছু খুঁজছেন যা দেখতে premium এবং carry করতে comfortable, তাদের জন্য এটি ideal choice।\n\nএই product বিশেষভাবে উপযোগী:\n\nঅফিসে personal use-এর জন্য\n\ntravel ও outdoor lifestyle-এর জন্য\n\ngifting-এর জন্য\n\nstylish daily carry accessory হিসেবে",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 157,
    "images": [
      "/uploads/products/electronics/3/hp5mU9ghNIGC9lUsCDnet5HHcDR1XDap0x2pXp3l-1.jpg",
      "/uploads/products/electronics/3/hp5mU9ghNIGC9lUsCDnet5HHcDR1XDap0x2pXp3l.jpg",
      "/uploads/products/electronics/3/MG7MqGyvmkVMbfJB0ktSUqYsh90H9M2OpURyLBt6-931x1024.jpg",
      "/uploads/products/electronics/3/QvLwGXgDZKwZtXcbIFiW5vPT7YEGTEpV21oOISYX.jpg",
      "/uploads/products/electronics/3/z7n4uz92lZUHX5gLLCKOIKXmGU2lUVV8kUrTwjXD-931x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-13",
    "slug": "new-sensory-shoulder-and-neck-massager",
    "title": "New Sensory Shoulder And Neck Massager",
    "titleBn": "New Sensory Shoulder And Neck Massager",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 199000,
    "compareAt": 259000,
    "rating": 4.8,
    "reviewCount": 51,
    "inStock": true,
    "stockQty": 101,
    "sku": "12600",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-13-1",
        "sku": "12600",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 199000,
        "compareAt": 259000,
        "inStock": true,
        "stockQty": 101
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "New Sensory Shoulder And Neck Massager",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "New Sensory Shoulder And Neck Massager",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "New Sensory Shoulder And Neck Massager FH-670\n\nঘাড় ও পিঠের দীর্ঘদিনের ব্যথা থেকে মুক্তি পান চিরতরে!\n\nপ্রধান বৈশিষ্ট্যসমূহ:\n\nএতে হালকা গরম হওয়ার সুবিধা আছে, যা রক্ত সঞ্চালন বাড়াতে এবং পেশির শক্ত ভাব কমাতে সাহায্য করে।\n\nএটি চার্জ দিয়ে ব্যবহার করা যায়, তাই ব্যবহারের সময় তারের ঝামেলা থাকে না।\n\nযারা দীর্ঘক্ষণ ডেস্কে কাজ করেন বা মোবাইল ব্যবহার করেন, তাদের ঘাড় ও কাঁধের ব্যথায় এটি দ্রুত আরাম দেয়।\n\nদিনের ক্লান্তি শেষে এটি ব্যবহারে মানসিক চাপ ও স্ট্রেস কমতে সাহায্য করে।\n\nএটা কেন কিনবেন?\n\nদীর্ঘস্থায়ী ব্যথার আরাম দেয়।\n\nএর হিটিং (Heat) ফাংশন রক্ত চলাচলে সাহায্য করে।\n\nএটি কেবল ঘাড়ের জন্য নয়, আপনি এটি শরীরের অন্যান্য অংশেও ব্যবহার করতে পারবেন।\n\nআপনি নিজের সহ্যক্ষমতা অনুযায়ী এর স্পিড বা চাপ নিয়ন্ত্রণ করতে পারেন।\n\nএতে হাত রাখার জন্য স্ট্র্যাপ আছে, ফলে ম্যাসাজ চলাকালীন আপনি বসে বই পড়তে পারেন বা হালকা কাজ করতে পারেন।",
    "descriptionBn": "New Sensory Shoulder And Neck Massager FH-670\n\nঘাড় ও পিঠের দীর্ঘদিনের ব্যথা থেকে মুক্তি পান চিরতরে!\n\nপ্রধান বৈশিষ্ট্যসমূহ:\n\nএতে হালকা গরম হওয়ার সুবিধা আছে, যা রক্ত সঞ্চালন বাড়াতে এবং পেশির শক্ত ভাব কমাতে সাহায্য করে।\n\nএটি চার্জ দিয়ে ব্যবহার করা যায়, তাই ব্যবহারের সময় তারের ঝামেলা থাকে না।\n\nযারা দীর্ঘক্ষণ ডেস্কে কাজ করেন বা মোবাইল ব্যবহার করেন, তাদের ঘাড় ও কাঁধের ব্যথায় এটি দ্রুত আরাম দেয়।\n\nদিনের ক্লান্তি শেষে এটি ব্যবহারে মানসিক চাপ ও স্ট্রেস কমতে সাহায্য করে।\n\nএটা কেন কিনবেন?\n\nদীর্ঘস্থায়ী ব্যথার আরাম দেয়।\n\nএর হিটিং (Heat) ফাংশন রক্ত চলাচলে সাহায্য করে।\n\nএটি কেবল ঘাড়ের জন্য নয়, আপনি এটি শরীরের অন্যান্য অংশেও ব্যবহার করতে পারবেন।\n\nআপনি নিজের সহ্যক্ষমতা অনুযায়ী এর স্পিড বা চাপ নিয়ন্ত্রণ করতে পারেন।\n\nএতে হাত রাখার জন্য স্ট্র্যাপ আছে, ফলে ম্যাসাজ চলাকালীন আপনি বসে বই পড়তে পারেন বা হালকা কাজ করতে পারেন।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 204,
    "images": [
      "/uploads/products/electronics/4/Dbunfdd0DaiuT22Yb76Qkm1tiYTX8Sy2cb1CPucr.jpg",
      "/uploads/products/electronics/4/ndBDDBeAsZFAuOgg7YZ8EyPTmY6YzaKWB0I0qhVc-1.jpg",
      "/uploads/products/electronics/4/ndBDDBeAsZFAuOgg7YZ8EyPTmY6YzaKWB0I0qhVc.jpg",
      "/uploads/products/electronics/4/OIP-3.webp",
      "/uploads/products/electronics/4/z302zLJOleeAt5kSebClPZnLh74AKIYUdDHwxlPS.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-14",
    "slug": "magic-handwriting-practice-book-for-kids-5-pcs-set",
    "title": "Magic Handwriting Practice Book For kids 5 PCS Set",
    "titleBn": "Magic Handwriting Practice Book For kids 5 PCS Set",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 29000,
    "compareAt": 49000,
    "rating": 4.8999999999999995,
    "reviewCount": 13,
    "inStock": true,
    "stockQty": 34,
    "sku": "13247",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-14-1",
        "sku": "13247",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 29000,
        "compareAt": 49000,
        "inStock": true,
        "stockQty": 34
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Magic Handwriting Practice Book For kids 5 PCS Set",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Magic Handwriting Practice Book For kids 5 PCS Set",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Magic Handwriting Practice Book For kids 5 PCS Set\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএই বইগুলোর সাথে একটি বিশেষ ম্যাজিক পেন, ৫/৭টি রিফিল এবং একটি গ্রিপার (পেন হোল্ডার) থাকে। এই কলম দিয়ে লেখার কিছু সময় পর কালি নিজে থেকেই সম্পূর্ণ মুছে যায়, ফলে শিশুরা একই বই বারবার ব্যবহারের সুযোগ পায়।\n\nপ্রতিটা অক্ষরের ওপর থ্রিডি খাঁজ বা গর্ত করা থাকে, যার ভেতর দিয়ে পেন চালিয়ে শিশুরা খুব সহজেই অক্ষরের সঠিক গঠন ও সোজা বা বাঁকা দাগ দেওয়ার কৌশল আয়ত্ত করতে পারে।\n\nবইগুলো প্রিমিয়াম কোয়ালিটির মোটা ও ল্যামিনেটেড হার্ড পেপার দিয়ে তৈরি, যার কারণে এগুলো সহজে ছেঁড়ে না এবং দীর্ঘস্থায়ী হয়।\n\nকলমের সাথে থাকা রাবার গ্রিপারটি শিশুদের আঙুলের সঠিক পজিশনে কলম ধরতে সাহায্য করে, যা তাদের হাতের পেশির ক্লান্তি দূর করে।\n\nবইয়ের তালিকায় যা যা থাকছে\n\n১. Alphabet (ABC): ইংরেজি অক্ষর ও শব্দ লেখার অনুশীলনের জন্য।\n\n২. বর্ণমালা: বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণ সুন্দর করে লেখার জন্য।\n\n৩. সংখ্যা ও NUMBER: বাংলা এবং ইংরেজি সংখ্যা গণনা ও লেখার জন্য।\n\n৪. আরবি: সহজ উপায়ে আরবি হরফ ও ক্যালিগ্রাফি শেখার জন্য।\n\n৫. Drawing & Puzzle: শিশুদের সৃজনশীলতা ও বুদ্ধিমত্তা বাড়ানোর জন্য ছবি আঁকা ও মজার পাজল গেম।",
    "descriptionBn": "Magic Handwriting Practice Book For kids 5 PCS Set\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএই বইগুলোর সাথে একটি বিশেষ ম্যাজিক পেন, ৫/৭টি রিফিল এবং একটি গ্রিপার (পেন হোল্ডার) থাকে। এই কলম দিয়ে লেখার কিছু সময় পর কালি নিজে থেকেই সম্পূর্ণ মুছে যায়, ফলে শিশুরা একই বই বারবার ব্যবহারের সুযোগ পায়।\n\nপ্রতিটা অক্ষরের ওপর থ্রিডি খাঁজ বা গর্ত করা থাকে, যার ভেতর দিয়ে পেন চালিয়ে শিশুরা খুব সহজেই অক্ষরের সঠিক গঠন ও সোজা বা বাঁকা দাগ দেওয়ার কৌশল আয়ত্ত করতে পারে।\n\nবইগুলো প্রিমিয়াম কোয়ালিটির মোটা ও ল্যামিনেটেড হার্ড পেপার দিয়ে তৈরি, যার কারণে এগুলো সহজে ছেঁড়ে না এবং দীর্ঘস্থায়ী হয়।\n\nকলমের সাথে থাকা রাবার গ্রিপারটি শিশুদের আঙুলের সঠিক পজিশনে কলম ধরতে সাহায্য করে, যা তাদের হাতের পেশির ক্লান্তি দূর করে।\n\nবইয়ের তালিকায় যা যা থাকছে\n\n১. Alphabet (ABC): ইংরেজি অক্ষর ও শব্দ লেখার অনুশীলনের জন্য।\n\n২. বর্ণমালা: বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণ সুন্দর করে লেখার জন্য।\n\n৩. সংখ্যা ও NUMBER: বাংলা এবং ইংরেজি সংখ্যা গণনা ও লেখার জন্য।\n\n৪. আরবি: সহজ উপায়ে আরবি হরফ ও ক্যালিগ্রাফি শেখার জন্য।\n\n৫. Drawing & Puzzle: শিশুদের সৃজনশীলতা ও বুদ্ধিমত্তা বাড়ানোর জন্য ছবি আঁকা ও মজার পাজল গেম।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 251,
    "images": [
      "/uploads/products/electronics/5/JGPubZEfVKdxoXX5HBbMJvxNAg1OuaekykE8FzUW.jpg",
      "/uploads/products/electronics/5/sXdch4VGFvzeB2xrudQ7VHayNoeLsYjQaw6lbX7D-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-15",
    "slug": "mk500-5-in-1-mobile-game-combo-pack",
    "title": "MK500 5-in-1 Mobile Game Combo Pack",
    "titleBn": "MK500 5-in-1 Mobile Game Combo Pack",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 125000,
    "compareAt": 180000,
    "rating": 5,
    "reviewCount": 20,
    "inStock": true,
    "stockQty": 47,
    "sku": "2168",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-15-1",
        "sku": "2168",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 125000,
        "compareAt": 180000,
        "inStock": true,
        "stockQty": 47
      }
    ],
    "highlights": [
      "Layout: 35 keys, one-handed",
      "Backlight: 8-color RGB",
      "Keycaps: Two-color injection",
      "Features: Anti-ghosting, fringe decoration, ergonomic soft wrist support",
      "Material: Durable ABS plastic"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MK500",
      "Layout": "35 keys, one-handed",
      "Backlight": "8-color RGB",
      "Keycaps": "Two-color injection",
      "Features": "No lag, full pressure support, scroll zoom compatibility",
      "Material": "Durable ABS plastic",
      "Compatibility": "Android, iOS, Windows, macOS",
      "Type": "Optical",
      "Design": "Ergonomic, non-slip grip",
      "Lights": "Colorful breathing effect",
      "DPI": "Adjustable sensitivity",
      "Click Lifespan": "Up to 5 million clicks",
      "Connection": "Bluetooth 4.2",
      "Size": "11.5 × 11.5 × 4 cm",
      "Function": "Secure wireless pairing with Android/iOS",
      "Mechanical Keyboard Experience": "Enjoy rapid response and tactile feedback from a 35-key layout built for high-action gameplay.",
      "RGB Backlighting": "8 stunning backlight colors enhance immersion and match your gaming environment.",
      "Ergonomic Comfort": "Built-in wrist support with a curved surface design minimizes fatigue during long sessions.",
      "Anti-Ghosting Keys": "Press multiple keys simultaneously without any input conflict—perfect for high-speed actions.",
      "High-Performance Mouse": "Optical sensor with smooth tracking and fast click response ensures better aim and control.",
      "Lag-Free Wireless Connectivity": "Bluetooth 4.2 converter guarantees stable, secure, and low-latency performance.",
      "Universal Compatibility": "Works seamlessly with Android, iOS, Windows, and other major platforms.",
      "Portable & Plug-and-Play": "Compact design, no drivers needed—ideal for gamers on the move.",
      "All-in-One Convenience": "No need to buy separate accessories. Get a keyboard, mouse, converter, and holder in one value-packed set.",
      "Built for Mobile Gaming": "Specially optimized for popular games like PUBG, Free Fire, Call of Duty Mobile, and more.",
      "Gaming-Level Performance": "From key response to sensor precision, everything is designed to enhance your reaction speed.",
      "Safe & Secure Use": "The converter connects without risking your game ID or permissions—a reliable choice for competitive players.",
      "Affordable Yet Premium": "Offers a balance of price and performance, making it an ideal combo for both beginners and pro gamers."
    },
    "specificationsBn": {
      "মডেল": "MK500 5-in-1 Mobile Game Combo Pack",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Key Specifications of the 5-in-1 Mobile Gaming Combo\n\nKeyboard:\n\nMouse:\n\nConverter:\n\nPackage Includes:\n\n1 x Gaming Keyboard\n\n1 x Gaming Mouse\n\n1 x Bluetooth Converter\n\n1 x USB Cable\n\n1 x Phone Holder\n\nKey Features:\n\nWhy Purchase the MK500 Combo?\n\nfor PUBG for Call of duty for Knives Out for The Terminator for CrossFire for Free Fire for Genshin Impact for Mine Craft for Sausage Man for Arena Breakout for Last Day Rules: Survival for Apex Legends for Earth: Revival",
    "descriptionBn": "Key Specifications of the 5-in-1 Mobile Gaming Combo\n\nKeyboard:\n\nMouse:\n\nConverter:\n\nPackage Includes:\n\n1 x Gaming Keyboard\n\n1 x Gaming Mouse\n\n1 x Bluetooth Converter\n\n1 x USB Cable\n\n1 x Phone Holder\n\nKey Features:\n\nWhy Purchase the MK500 Combo?\n\nfor PUBG for Call of duty for Knives Out for The Terminator for CrossFire for Free Fire for Genshin Impact for Mine Craft for Sausage Man for Arena Breakout for Last Day Rules: Survival for Apex Legends for Earth: Revival",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 298,
    "images": [
      "/uploads/products/electronics/6/5-in-1-Gaming-Keyboard-and-Mouse-Combo-MK500-Price-in-Bangladesh-1.png",
      "/uploads/products/electronics/6/7ab0d7fc71e7e36d413ec6e1b03e1bb9.jpg_2200x2200q80.jpg_.webp",
      "/uploads/products/electronics/6/product_1782742948_5521.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-16",
    "slug": "period-pain-relief-waist-belt-heating-pad-device",
    "title": "Period Pain Relief Waist Belt Heating Pad Device",
    "titleBn": "Period Pain Relief Waist Belt Heating Pad Device",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 49000,
    "compareAt": 85000,
    "rating": 4.8,
    "reviewCount": 27,
    "inStock": true,
    "stockQty": 60,
    "sku": "1374",
    "tags": [
      "gadgets",
      "electronics",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-16-1",
        "sku": "1374",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 49000,
        "compareAt": 85000,
        "inStock": true,
        "stockQty": 60
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Period Pain Relief Waist Belt Heating Pad Device",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Period Pain Relief Waist Belt Heating Pad Device",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "🌸 3 Heat & 3 Vibration Modes: আপনার প্রয়োজন অনুযায়ী Adjustable Heat Settings এবং Massage Modes বেছে নিন — period cramp relief এখন আরও সহজ!\n\n💖 Soft & Comfortable Material: Premium Cotton দিয়ে তৈরি এই Rechargeable Heating Pad ত্বকের জন্য একদম নরম ও আরামদায়ক, সমানভাবে heat ছড়িয়ে দেয়।\n\n⚡ Rechargeable & Cordless Design: Portable Cordless Heating Pad – কোনো wire এর ঝামেলা ছাড়াই সহজে ব্যবহার করুন যেকোনো সময়, যেকোনো জায়গায়।\n\n👗 Adjustable Waist Belt: Adjustable Belt design 50” পর্যন্ত fit করে, তাই সব সাইজের মেয়েদের জন্য perfect।\n\n🔥 Warm Palace Fat Burner Belt: period pain relief এর পাশাপাশি belly fat burner হিসেবেও ব্যবহারযোগ্য – একসাথে comfort ও beauty care!\n\n🎁 Perfect Gift Choice: আপনার girlfriend, daughter, mother বা friend – সবার জন্য ideal gift এই Electric Heating Belt for Wom💫 Introducing the Heating Pad Electric!\n\nমেয়েদের জন্য period cramps এখন আর ভয় নয়! 🔥 এই heating pad electric একদম নিরাপদ ও কার্যকর সমাধান — কোনো medicine ছাড়াই period pain relief দেয় সহজে ও দ্রুত।\n\n💖 Natural Pain Relief:\n\nHeat শরীরে রক্ত চলাচল বাড়ায়, muscle relax করে এবং cramps কমায়। তাই menstrual heating pad ব্যবহার করে ব্যথা কমে যায় কয়েক মিনিটের মধ্যেই!\n\n⚡ Portable & Comfortable:\n\nএই heating belt electric for pain relief একদম lightweight ও portable — পোশাকের নিচে সহজেই ব্যবহার করা যায়, তাই বাইরে থাকলেও discomfort ছাড়াই কাজ চালিয়ে যেতে পারবেন।\n\n🌷 Everyday Relief, Anytime:\n\nবাসায়, অফিসে, বা ভ্রমণে – এই electric heat pad for pain relief আপনার সব সময়ের সঙ্গী, যখনই period pain শুরু হয়, সঙ্গে সঙ্গেই নিয়েt 5 hours to full power.",
    "descriptionBn": "🌸 3 Heat & 3 Vibration Modes: আপনার প্রয়োজন অনুযায়ী Adjustable Heat Settings এবং Massage Modes বেছে নিন — period cramp relief এখন আরও সহজ!\n\n💖 Soft & Comfortable Material: Premium Cotton দিয়ে তৈরি এই Rechargeable Heating Pad ত্বকের জন্য একদম নরম ও আরামদায়ক, সমানভাবে heat ছড়িয়ে দেয়।\n\n⚡ Rechargeable & Cordless Design: Portable Cordless Heating Pad – কোনো wire এর ঝামেলা ছাড়াই সহজে ব্যবহার করুন যেকোনো সময়, যেকোনো জায়গায়।\n\n👗 Adjustable Waist Belt: Adjustable Belt design 50” পর্যন্ত fit করে, তাই সব সাইজের মেয়েদের জন্য perfect।\n\n🔥 Warm Palace Fat Burner Belt: period pain relief এর পাশাপাশি belly fat burner হিসেবেও ব্যবহারযোগ্য – একসাথে comfort ও beauty care!\n\n🎁 Perfect Gift Choice: আপনার girlfriend, daughter, mother বা friend – সবার জন্য ideal gift এই Electric Heating Belt for Wom💫 Introducing the Heating Pad Electric!\n\nমেয়েদের জন্য period cramps এখন আর ভয় নয়! 🔥 এই heating pad electric একদম নিরাপদ ও কার্যকর সমাধান — কোনো medicine ছাড়াই period pain relief দেয় সহজে ও দ্রুত।\n\n💖 Natural Pain Relief:\n\nHeat শরীরে রক্ত চলাচল বাড়ায়, muscle relax করে এবং cramps কমায়। তাই menstrual heating pad ব্যবহার করে ব্যথা কমে যায় কয়েক মিনিটের মধ্যেই!\n\n⚡ Portable & Comfortable:\n\nএই heating belt electric for pain relief একদম lightweight ও portable — পোশাকের নিচে সহজেই ব্যবহার করা যায়, তাই বাইরে থাকলেও discomfort ছাড়াই কাজ চালিয়ে যেতে পারবেন।\n\n🌷 Everyday Relief, Anytime:\n\nবাসায়, অফিসে, বা ভ্রমণে – এই electric heat pad for pain relief আপনার সব সময়ের সঙ্গী, যখনই period pain শুরু হয়, সঙ্গে সঙ্গেই নিয়েt 5 hours to full power.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": true,
    "colorHue": 345,
    "images": [
      "/uploads/products/electronics/7/product_1764232857_1126.jpg",
      "/uploads/products/electronics/7/product_1764232857_7572.jpg",
      "/uploads/products/electronics/7/product_1764232857_8737.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-17",
    "slug": "mili-mitag-duo-smart-finder",
    "title": "MiLi MiTag Duo Smart Finder",
    "titleBn": "MiLi MiTag Duo Smart Finder",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-electronics",
    "categorySlug": "electronics",
    "categoryName": "Smart Electronics & Gadgets",
    "categoryNameBn": "স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস",
    "price": 57000,
    "compareAt": 95000,
    "rating": 4.8999999999999995,
    "reviewCount": 34,
    "inStock": true,
    "stockQty": 73,
    "sku": "2188",
    "tags": [
      "gadgets",
      "electronics",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-17-1",
        "sku": "2188",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 57000,
        "compareAt": 95000,
        "inStock": true,
        "stockQty": 73
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MiLi MiTag Duo Smart Finder",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "MiLi MiTag Duo Smart Finder",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "MiLi MiTag একটি স্মার্ট ফাইন্ডার যা হারানো বা ভুলে যাওয়া আইটেম খুঁজে পেতে সাহায্য করে।\n\nকমপ্যাটিবিলিটি:\n\nMiLi MiTag গুলি iOS ডিভাইসের জন্য Apple এর Find My নেটওয়ার্ক এবং Android ডিভাইসের জন্য Google এর Find My Device নেটওয়ার্কের সাথে সঙ্গতিপূর্ণ।\n\nফিচারস:\n\nএই ট্র্যাকারগুলি রিয়েল টাইম অবস্থান আপডেট, নিকটে থাকলে ট্যাগ রিং করার সুবিধা এবং ভুলে যাওয়া আইটেমের জন্য নোটিফিকেশন প্রদান করে।\n\nডিজাইন:\n\nএগুলি কমপ্যাক্ট, লাইটওয়েট এবং সাধারণত একটি সুরক্ষা কেস বা কীরিং দিয়ে আসে যা চাবি, ব্যাগ বা পেটের কলারের মতো আইটেমের সাথে সহজে সংযুক্ত করা যায়।\n\nব্যাটারি:\n\nMiLi MiTag গুলি সাধারণত একটি প্রতিস্থাপনযোগ্য CR2032 বাটন সেল ব্যাটারি ব্যবহার করে, যার আয়ু প্রায় এক বছর।\n\nটেকসই:\n\nকিছু মডেল জলরোধী (IP67 রেটেড), যা পানির সংস্পর্শে আসলেও কার্যক্ষমতা বজায় রাখতে সক্ষম।",
    "descriptionBn": "MiLi MiTag একটি স্মার্ট ফাইন্ডার যা হারানো বা ভুলে যাওয়া আইটেম খুঁজে পেতে সাহায্য করে।\n\nকমপ্যাটিবিলিটি:\n\nMiLi MiTag গুলি iOS ডিভাইসের জন্য Apple এর Find My নেটওয়ার্ক এবং Android ডিভাইসের জন্য Google এর Find My Device নেটওয়ার্কের সাথে সঙ্গতিপূর্ণ।\n\nফিচারস:\n\nএই ট্র্যাকারগুলি রিয়েল টাইম অবস্থান আপডেট, নিকটে থাকলে ট্যাগ রিং করার সুবিধা এবং ভুলে যাওয়া আইটেমের জন্য নোটিফিকেশন প্রদান করে।\n\nডিজাইন:\n\nএগুলি কমপ্যাক্ট, লাইটওয়েট এবং সাধারণত একটি সুরক্ষা কেস বা কীরিং দিয়ে আসে যা চাবি, ব্যাগ বা পেটের কলারের মতো আইটেমের সাথে সহজে সংযুক্ত করা যায়।\n\nব্যাটারি:\n\nMiLi MiTag গুলি সাধারণত একটি প্রতিস্থাপনযোগ্য CR2032 বাটন সেল ব্যাটারি ব্যবহার করে, যার আয়ু প্রায় এক বছর।\n\nটেকসই:\n\nকিছু মডেল জলরোধী (IP67 রেটেড), যা পানির সংস্পর্শে আসলেও কার্যক্ষমতা বজায় রাখতে সক্ষম।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 32,
    "images": [
      "/uploads/products/electronics/8/GUefEnuOc4CXB2XBBGLUxRrXenmCRJK343TbMWPE.jpg",
      "/uploads/products/electronics/8/product_1783233654_8111.jpg",
      "/uploads/products/electronics/8/QuCLQJMS9eETuL1yykgrsT3t1GnVWEnWIFpwkxZt.jpg",
      "/uploads/products/electronics/8/WeXvoQySJQEyneg5SI1BVPSmtVPKZRJCJmrjawjc.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-18",
    "slug": "jysuper-jy-2570-rechargeable-fan-with-led-light",
    "title": "JYSUPER JY-2570 Rechargeable Fan with LED Light",
    "titleBn": "JYSUPER JY-2570 Rechargeable Fan with LED Light",
    "brand": "JYSUPER",
    "brandSlug": "jysuper",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-fan",
    "categorySlug": "fan",
    "categoryName": "Rechargeable Fans",
    "categoryNameBn": "রিচার্জেবল ও পোর্টেবল ফ্যান",
    "price": 189000,
    "compareAt": 239000,
    "rating": 5,
    "reviewCount": 41,
    "inStock": true,
    "stockQty": 86,
    "sku": "013236",
    "tags": [
      "gadgets",
      "fan",
      "jysuper",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-18-1",
        "sku": "013236",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 189000,
        "compareAt": 239000,
        "inStock": true,
        "stockQty": 86
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "JYSUPER JY-2570 Rechargeable Fan with LED Light",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "JYSUPER JY-2570 Rechargeable Fan with LED Light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "JYSUPER JY-2570 Rechargeable Fan with LED Light\n\nমূল বৈশিষ্ট্যঃ\n\nএই ফ্যানে রয়েছে শক্তিশালী ব্যাটারি, যা দীর্ঘ সময় নিরবচ্ছিন্ন বাতাস নিশ্চিত করে।\n\n৪টি আলাদা স্পিড সেট করে নিতে পারবেন।\n\nফ্যানটি স্বয়ংক্রিয়ভাবে ১০০° ডানে-বামে (Left-to-Right) ঘুরে ঘরের চারপাশ সমানভাবে ঠান্ডা রাখে।\n\nআপনার পছন্দমতো বাতাস পেতে ফ্যানটিকে উপর-নিচ বরাবর ১১৫° পর্যন্ত অ্যাডজাস্ট করে নিতে পারবেন।\n\nফ্যানটিতে রয়েছে আকর্ষণীয় মাল্টি-কালার নাইট লাইট, যা রাতে ঘরের সৌন্দর্য বাড়িয়ে দেয়।\n\nএর নিচের প্যানেলে থাকা চমৎকার বাটনগুলো দিয়ে সহজেই নির্দিষ্ট সময়ের জন্য টাইমার সেট করে রাখা যায়।\n\nবিদ্যুৎ না থাকলে বা আউটডোরে ব্যবহারের জন্য এটিকে সোলার প্যানেলের সাথে যুক্ত করে পরিবেশবান্ধব উপায়ে চার্জ করা যায়।",
    "descriptionBn": "JYSUPER JY-2570 Rechargeable Fan with LED Light\n\nমূল বৈশিষ্ট্যঃ\n\nএই ফ্যানে রয়েছে শক্তিশালী ব্যাটারি, যা দীর্ঘ সময় নিরবচ্ছিন্ন বাতাস নিশ্চিত করে।\n\n৪টি আলাদা স্পিড সেট করে নিতে পারবেন।\n\nফ্যানটি স্বয়ংক্রিয়ভাবে ১০০° ডানে-বামে (Left-to-Right) ঘুরে ঘরের চারপাশ সমানভাবে ঠান্ডা রাখে।\n\nআপনার পছন্দমতো বাতাস পেতে ফ্যানটিকে উপর-নিচ বরাবর ১১৫° পর্যন্ত অ্যাডজাস্ট করে নিতে পারবেন।\n\nফ্যানটিতে রয়েছে আকর্ষণীয় মাল্টি-কালার নাইট লাইট, যা রাতে ঘরের সৌন্দর্য বাড়িয়ে দেয়।\n\nএর নিচের প্যানেলে থাকা চমৎকার বাটনগুলো দিয়ে সহজেই নির্দিষ্ট সময়ের জন্য টাইমার সেট করে রাখা যায়।\n\nবিদ্যুৎ না থাকলে বা আউটডোরে ব্যবহারের জন্য এটিকে সোলার প্যানেলের সাথে যুক্ত করে পরিবেশবান্ধব উপায়ে চার্জ করা যায়।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 79,
    "images": [
      "/uploads/products/fan/1/4eNM14rzWAYfqzuOGxVoyNaI2KMzm6XH2a6NBJtR-1.jpg",
      "/uploads/products/fan/1/nYUam6KFMO6XVNKbCOEei5db00ghQ6QNSwOKa8Zg-1.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-19",
    "slug": "x05-handheld-high-speed-turbo-cooling-fan-3000mah-battery",
    "title": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery",
    "titleBn": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-fan",
    "categorySlug": "fan",
    "categoryName": "Rechargeable Fans",
    "categoryNameBn": "রিচার্জেবল ও পোর্টেবল ফ্যান",
    "price": 79000,
    "compareAt": 129000,
    "rating": 4.8,
    "reviewCount": 48,
    "inStock": true,
    "stockQty": 99,
    "sku": "13236",
    "tags": [
      "gadgets",
      "fan",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-19-1",
        "sku": "13236",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 79000,
        "compareAt": 129000,
        "inStock": true,
        "stockQty": 99
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery\n\nমূল বৈশিষ্ট্যসমূহঃ\n\nএটি সাধারণ ফ্যানের মতো শুধু বাতাস দেয় না, বরং দ্রুত ঠান্ডা করার জন্য আইস কুলিং টেকনোলজি আছে।\n\nকমপ্যাক্ট সাইজ হলেও এর বাতাস অনেক শক্তিশালী।\n\nফ্যানে একটি ডিজিটাল স্ক্রিন আছে যা দেখে আপনি উইন্ড স্পিড লেভেল বুঝতে পারবেন।\n\n১ থেকে ১০০ পর্যন্ত যেকোনো স্পিডে বাতাস কাস্টমাইজ বা অ্যাডজাস্ট করা যায়।\n\nসহজে হাতে নিয়ে ঘোরার মতো ডিজাইন, দেখতেও বেশ স্টাইলিশ ও মডার্ন (মেকানিক্যাল/স্বচ্ছ বডি ডিজাইন)।\n\nব্যাটারি ক্যাপাসিটি 3000mAh",
    "descriptionBn": "X05 Handheld High-Speed Turbo Cooling Fan 3000mAh Battery\n\nমূল বৈশিষ্ট্যসমূহঃ\n\nএটি সাধারণ ফ্যানের মতো শুধু বাতাস দেয় না, বরং দ্রুত ঠান্ডা করার জন্য আইস কুলিং টেকনোলজি আছে।\n\nকমপ্যাক্ট সাইজ হলেও এর বাতাস অনেক শক্তিশালী।\n\nফ্যানে একটি ডিজিটাল স্ক্রিন আছে যা দেখে আপনি উইন্ড স্পিড লেভেল বুঝতে পারবেন।\n\n১ থেকে ১০০ পর্যন্ত যেকোনো স্পিডে বাতাস কাস্টমাইজ বা অ্যাডজাস্ট করা যায়।\n\nসহজে হাতে নিয়ে ঘোরার মতো ডিজাইন, দেখতেও বেশ স্টাইলিশ ও মডার্ন (মেকানিক্যাল/স্বচ্ছ বডি ডিজাইন)।\n\nব্যাটারি ক্যাপাসিটি 3000mAh",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 126,
    "images": [
      "/uploads/products/fan/2/660372550_122099081642844807_2003479340757496523_n-1024x1024.jpg",
      "/uploads/products/fan/2/666012134_975596771884478_9182811922165460433_n.jpg",
      "/uploads/products/fan/2/668001662_1465253972279206_2922709757833740416_n.jpg",
      "/uploads/products/fan/2/OIP-1-1.webp",
      "/uploads/products/fan/2/OIP-1.webp"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-20",
    "slug": "high-speed-fan-model-jgf009",
    "title": "HIGH SPEED FAN ( MODEL - JGF009 )",
    "titleBn": "HIGH SPEED FAN ( MODEL - JGF009 )",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-fan",
    "categorySlug": "fan",
    "categoryName": "Rechargeable Fans",
    "categoryNameBn": "রিচার্জেবল ও পোর্টেবল ফ্যান",
    "price": 98000,
    "compareAt": 145000,
    "rating": 4.8999999999999995,
    "reviewCount": 55,
    "inStock": true,
    "stockQty": 32,
    "sku": "2185",
    "tags": [
      "gadgets",
      "fan",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-20-1",
        "sku": "2185",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 98000,
        "compareAt": 145000,
        "inStock": true,
        "stockQty": 32
      }
    ],
    "highlights": [
      "Input: 5.0v = 2A",
      "Battery Capacity: 4000 Mah",
      "Size: 55/56/164mm"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "JGF009",
      "Input": "5.0v = 2A",
      "Battery Capacity": "4000 Mah",
      "Size": "55/56/164mm"
    },
    "specificationsBn": {
      "মডেল": "HIGH SPEED FAN ( MODEL - JGF009 )",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "High Speed Fan",
    "descriptionBn": "High Speed Fan",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 173,
    "images": [
      "/uploads/products/fan/3/product_1783153207_5087.jpg",
      "/uploads/products/fan/3/product_1783153207_6198.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-21",
    "slug": "foldable-powerful-winds-turbo-fan-multy-color-black",
    "title": "Foldable Powerful Winds Turbo Fan - Multy Color - Black",
    "titleBn": "Foldable Powerful Winds Turbo Fan - Multy Color - Black",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-fan",
    "categorySlug": "fan",
    "categoryName": "Rechargeable Fans",
    "categoryNameBn": "রিচার্জেবল ও পোর্টেবল ফ্যান",
    "price": 35000,
    "compareAt": 79900,
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "stockQty": 45,
    "sku": "13258",
    "tags": [
      "gadgets",
      "fan",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-21-1",
        "sku": "13258",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 35000,
        "compareAt": 79900,
        "inStock": true,
        "stockQty": 45
      }
    ],
    "highlights": [
      "Type: Folding Handheld Fan",
      "Battery: Built-in 1800mAh rechargeable battery",
      "Speed Levels: 5 adjustable speeds",
      "Design: 180° folding with compact, portable build",
      "Charging: Type-C interface for fast charging"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Type": "Folding Handheld Fan",
      "Battery": "Built-in 1800mAh rechargeable battery",
      "Speed Levels": "5 adjustable speeds",
      "Design": "180° folding with compact, portable build",
      "Charging": "Type-C interface for fast charging",
      "Special Feature": "Lanyard for hands-free use",
      "Applications": "Travel, outdoor activities, home, or office use"
    },
    "specificationsBn": {
      "মডেল": "Foldable Powerful Winds Turbo Fan - Multy Color - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Foldable Powerful Winds Turbo Fan",
    "descriptionBn": "Foldable Powerful Winds Turbo Fan",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 220,
    "images": [
      "/uploads/products/fan/4/gktOLJiUNuSy7bNHMgqXgpTY52WNGYMjXsneQPYv.jpg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-17-at-8.15.07-PM-1-1024x1024.jpeg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-18-at-12.34.03-AM.jpeg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-18-at-12.34.04-AM-1.jpeg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-18-at-12.34.04-AM-2.jpeg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-18-at-12.34.04-AM.jpeg",
      "/uploads/products/fan/4/WhatsApp-Image-2026-05-18-at-12.34.05-AM.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-22",
    "slug": "16-colors-plug-in-usb-galaxy-night-light-ocean-wave-with-remote-control",
    "title": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control",
    "titleBn": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-light",
    "categorySlug": "light",
    "categoryName": "Smart Lights & Lamps",
    "categoryNameBn": "স্মার্ট লাইট ও ল্যাম্প",
    "price": 59000,
    "compareAt": 115000,
    "rating": 4.8,
    "reviewCount": 24,
    "inStock": true,
    "stockQty": 58,
    "sku": "9992",
    "tags": [
      "gadgets",
      "light",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-22-1",
        "sku": "9992",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 59000,
        "compareAt": 115000,
        "inStock": true,
        "stockQty": 58
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control আপনার ঘরকে এক পলকেই স্বপ্নের মতো সুন্দর আর শান্তময় করতে চান? নিয়ে এলাম চমৎকার 16 Colors Plug-In USB Galaxy Night Light Ocean Wave! একটি বাটনের চাপেই আপনার ঘরের চার দেয়ালজুড়ে ছড়িয়ে পড়বে গ্যালাক্সি আর সাগরের ঢেউয়ের জাদুকরী আলো। একটু রিল্যাক্স করতে, বই পড়তে, কিংবা প্রিমিয়াম ঘরোয়া পরিবেশ তৈরি করতে এটি এক অনন্য সংযোজন। 💖 🎨 প্রিমিয়াম ডিজাইন ও বিল্ড: এর আকর্ষণীয় এক্রিলিক/ক্রিস্টাল ফিনিশিং কিউব (Cube) ডিজাইন এবং নান্দনিক কাঠের বা মেটাল বেজ আপনার ঘরের সৌন্দর্য বাড়িয়ে দেবে বহুগুণ! 🎮 সহজ রিমোট কন্ট্রোল ও ফিচারসমূহ: 🔴 ON / OFF: লাল ও কালো বাটন দিয়ে খুব সহজেই আলো অন-অফ করার সুবিধাজনক ফিচার। ☀️ Brighten / Dim: ওপরের বাম পাশের সূর্য আকৃতির বাটন চেপে আলোর উজ্জ্বলতা প্রয়োজন অনুযায়ী বাড়াতে বা কমাতে পারবেন। 🌈 16 Light Colors: লাল, সবুজ, নীল, হলুদসহ ১৬টি মনমুগ্ধকর কালার অপশন। আপনার মুড অনুযায়ী বেছে নিন পছন্দের আলো! 🎭 স্পেশাল লাইটিং মোডসমূহ: ⚡ FLASH: আলো ব্লিংক করবে এবং ব্রাইটনেস চেঞ্জ হয়ে তৈরি করবে চমৎকার এক লাইট শো। 🌟 STROBE: ক্লাসিক স্ট্রোব ইফেক্টে আলো অন-অফ হতে থাকবে। 🌬️ FADE: ধীরে ধীরে এক রঙ থেকে অন্য রঙে পরিবর্তন (Breathing Effect 1) 🌊 SMOOTH: অত্যন্ত স্মুথ ও রিল্যাক্সিং উপায়ে কালার চেঞ্জ (Breathing Effect 2)",
    "descriptionBn": "16 Colors Plug-In USB Galaxy Night Light Ocean Wave with Remote Control আপনার ঘরকে এক পলকেই স্বপ্নের মতো সুন্দর আর শান্তময় করতে চান? নিয়ে এলাম চমৎকার 16 Colors Plug-In USB Galaxy Night Light Ocean Wave! একটি বাটনের চাপেই আপনার ঘরের চার দেয়ালজুড়ে ছড়িয়ে পড়বে গ্যালাক্সি আর সাগরের ঢেউয়ের জাদুকরী আলো। একটু রিল্যাক্স করতে, বই পড়তে, কিংবা প্রিমিয়াম ঘরোয়া পরিবেশ তৈরি করতে এটি এক অনন্য সংযোজন। 💖 🎨 প্রিমিয়াম ডিজাইন ও বিল্ড: এর আকর্ষণীয় এক্রিলিক/ক্রিস্টাল ফিনিশিং কিউব (Cube) ডিজাইন এবং নান্দনিক কাঠের বা মেটাল বেজ আপনার ঘরের সৌন্দর্য বাড়িয়ে দেবে বহুগুণ! 🎮 সহজ রিমোট কন্ট্রোল ও ফিচারসমূহ: 🔴 ON / OFF: লাল ও কালো বাটন দিয়ে খুব সহজেই আলো অন-অফ করার সুবিধাজনক ফিচার। ☀️ Brighten / Dim: ওপরের বাম পাশের সূর্য আকৃতির বাটন চেপে আলোর উজ্জ্বলতা প্রয়োজন অনুযায়ী বাড়াতে বা কমাতে পারবেন। 🌈 16 Light Colors: লাল, সবুজ, নীল, হলুদসহ ১৬টি মনমুগ্ধকর কালার অপশন। আপনার মুড অনুযায়ী বেছে নিন পছন্দের আলো! 🎭 স্পেশাল লাইটিং মোডসমূহ: ⚡ FLASH: আলো ব্লিংক করবে এবং ব্রাইটনেস চেঞ্জ হয়ে তৈরি করবে চমৎকার এক লাইট শো। 🌟 STROBE: ক্লাসিক স্ট্রোব ইফেক্টে আলো অন-অফ হতে থাকবে। 🌬️ FADE: ধীরে ধীরে এক রঙ থেকে অন্য রঙে পরিবর্তন (Breathing Effect 1) 🌊 SMOOTH: অত্যন্ত স্মুথ ও রিল্যাক্সিং উপায়ে কালার চেঞ্জ (Breathing Effect 2)",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 267,
    "images": [
      "/uploads/products/light/1/5f9e29f1-c15a-479d-85bb-0ecbee3d5c27-1024x958.jpg",
      "/uploads/products/light/1/74b6e9d7-6be2-4f6e-9357-3c87e3e5b12d.jpg",
      "/uploads/products/light/1/cd847040-f3f9-41ea-9253-5dbe99488ff0-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-23",
    "slug": "led-neon-rgb-magic-flexible-strip-light-with-app-control",
    "title": "LED Neon RGB Magic Flexible Strip Light With App control",
    "titleBn": "LED Neon RGB Magic Flexible Strip Light With App control",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-light",
    "categorySlug": "light",
    "categoryName": "Smart Lights & Lamps",
    "categoryNameBn": "স্মার্ট লাইট ও ল্যাম্প",
    "price": 109000,
    "compareAt": 159000,
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "stockQty": 71,
    "sku": "3156",
    "tags": [
      "gadgets",
      "light",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-23-1",
        "sku": "3156",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 109000,
        "compareAt": 159000,
        "inStock": true,
        "stockQty": 71
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "LED Neon RGB Magic Flexible Strip Light With App control",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "LED Neon RGB Magic Flexible Strip Light With App control",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "LED Neon RGB Magic Flexible Strip Light With App control\n\nমূল ফিচারসমূহ :\n\nঅ্যাপের মাধ্যমে আপনি নিজের পছন্দমতো কালার কম্বিনেশন তৈরি করে নিতে পারবেন।\n\nএতে বিল্ট-ইন সাউন্ড সেন্সর আছে। ঘরের গান, মিউজিক বা গেমের সাউন্ডের তালে তালে এই লাইটগুলো ওঠানামা করবে বা কালার চেঞ্জ করবে।\n\nলাইটটি কখন অন হবে আর কখন অফ হবে, তা টাইমার সেট করে অটোমেট করে রাখা যায়।\n\nএটি নিয়ন্ত্রণ করার জন্য বক্সের সাথে একটি ইনফ্রারেড রিমোট তো থাকছেই, পাশাপাশি স্মার্টফোনের অ্যাপ দিয়েও দূর থেকে সম্পূর্ণ কন্ট্রোল করা যাবে।",
    "descriptionBn": "LED Neon RGB Magic Flexible Strip Light With App control\n\nমূল ফিচারসমূহ :\n\nঅ্যাপের মাধ্যমে আপনি নিজের পছন্দমতো কালার কম্বিনেশন তৈরি করে নিতে পারবেন।\n\nএতে বিল্ট-ইন সাউন্ড সেন্সর আছে। ঘরের গান, মিউজিক বা গেমের সাউন্ডের তালে তালে এই লাইটগুলো ওঠানামা করবে বা কালার চেঞ্জ করবে।\n\nলাইটটি কখন অন হবে আর কখন অফ হবে, তা টাইমার সেট করে অটোমেট করে রাখা যায়।\n\nএটি নিয়ন্ত্রণ করার জন্য বক্সের সাথে একটি ইনফ্রারেড রিমোট তো থাকছেই, পাশাপাশি স্মার্টফোনের অ্যাপ দিয়েও দূর থেকে সম্পূর্ণ কন্ট্রোল করা যাবে।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 314,
    "images": [
      "/uploads/products/light/2/9RF3Drx9ms0IQcVjioZCgYOixoCGpgsXjC5XItoZ-1024x1024.png",
      "/uploads/products/light/2/fYlYuHlchPBUGyYwORCsiKc20JTMYNj9auYXPPtg-1024x915.jpg",
      "/uploads/products/light/2/NNxUvcr6EXDZdh3w2SKWjx5uRNL7TQ8YC4uRjGUF-1024x1024.png",
      "/uploads/products/light/2/OGuPLH9KzdwP2CYjGbnYFY1j9f5rfua7ZGm28nz3.webp"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-24",
    "slug": "lighting-us-plug-flower-vase-led-mushroom-night-light-mushroom-light-led-mushroom-light",
    "title": "Lighting US Plug Flower Vase LED Mushroom Night Light mushroom light led mushroom light",
    "titleBn": "Lighting US Plug Flower Vase LED Mushroom Night Light mushroom light led mushroom light",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-light",
    "categorySlug": "light",
    "categoryName": "Smart Lights & Lamps",
    "categoryNameBn": "স্মার্ট লাইট ও ল্যাম্প",
    "price": 13000,
    "compareAt": 20000,
    "rating": 5,
    "reviewCount": 38,
    "inStock": true,
    "stockQty": 84,
    "sku": "00174",
    "tags": [
      "gadgets",
      "light",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-24-1",
        "sku": "00174",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 13000,
        "compareAt": 20000,
        "inStock": true,
        "stockQty": 84
      }
    ],
    "highlights": [
      "Material: Plastic",
      "Light Color: Changes colors randomly",
      "Light type: LED",
      "Leaf: Green",
      "Input voltage: 220V"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Material": "Plastic",
      "Light Color": "Changes colors randomly",
      "Light type": "LED",
      "Leaf": "Green",
      "Input voltage": "220V",
      "Consumption": "0.5W",
      "Power": "220V"
    },
    "specificationsBn": {
      "মডেল": "Lighting US Plug Flower Vase LED Mushroom Night Light mushroom light led mushroom light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Lighting US Plug Flower Vase LED Mushroom Night Light\n\nsame as pic\n\nLight brightness\n\nChange automatically according to light source brightness\n\nExtremely low power consumption\n\nAuto Brightness\n\nFinding romanticism in the light\n\nIf you get dark then it will burn\n\nEnergy saving lamp, So Long Lifetime",
    "descriptionBn": "Lighting US Plug Flower Vase LED Mushroom Night Light\n\nsame as pic\n\nLight brightness\n\nChange automatically according to light source brightness\n\nExtremely low power consumption\n\nAuto Brightness\n\nFinding romanticism in the light\n\nIf you get dark then it will burn\n\nEnergy saving lamp, So Long Lifetime",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 1,
    "images": [
      "/uploads/products/light/3/4e5369eb1c78af131b0302b5c1c70fd3.jpg",
      "/uploads/products/light/3/63d118a8478d521a3ab67ab9995d7d09.jpg",
      "/uploads/products/light/3/892c432a47c7e2e183d5eeedb647684e-1024x1024.jpg",
      "/uploads/products/light/3/a81bfcc9c13be29ffc7201cd2cb91167.jpg",
      "/uploads/products/light/3/d8970841918d45c192722130f39f7e77.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-25",
    "slug": "sensor-night-light-automatic-on-off-sensor-lights-plug-into-wall-stair-lamp-for-stairway-bathroom-room-garage-cabinet-bedroom",
    "title": "Sensor Night Light Automatic on Off Sensor Lights Plug Into Wall Stair Lamp for Stairway Bathroom Room Garage Cabinet Bedroom",
    "titleBn": "Sensor Night Light Automatic on Off Sensor Lights Plug Into Wall Stair Lamp for Stairway Bathroom Room Garage Cabinet Bedroom",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-light",
    "categorySlug": "light",
    "categoryName": "Smart Lights & Lamps",
    "categoryNameBn": "স্মার্ট লাইট ও ল্যাম্প",
    "price": 12000,
    "compareAt": 25000,
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "stockQty": 97,
    "sku": "0014",
    "tags": [
      "gadgets",
      "light",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-25-1",
        "sku": "0014",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 12000,
        "compareAt": 25000,
        "inStock": true,
        "stockQty": 97
      }
    ],
    "highlights": [
      "Product Name: Light Controlled (Sensor) Square Shaped Night Light/ Dim Light",
      "Product Size: 6.5X6.5X4.7 cm",
      "Plug System: US type",
      "Switch Mode: Optical Sensing / Light Sensor",
      "Light Source: LED"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Product Name": "Light Controlled (Sensor) Square Shaped Night Light/ Dim Light",
      "Product Size": "6.5X6.5X4.7 cm",
      "Plug System": "US type",
      "Switch Mode": "Optical Sensing / Light Sensor",
      "Light Source": "LED",
      "Texture Of Material": "ABS Plastic",
      "Voltage": "110-250V",
      "Power": "0.3W",
      "Shape": "Square"
    },
    "specificationsBn": {
      "মডেল": "Sensor Night Light Automatic on Off Sensor Lights Plug Into Wall Stair Lamp for Stairway Bathroom Room Garage Cabinet Bedroom",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Kindly watch the video for better understanding.\n\nYou will get the exactly same products as per your order.\n\nVery Long life (Around 10000 hours)",
    "descriptionBn": "Kindly watch the video for better understanding.\n\nYou will get the exactly same products as per your order.\n\nVery Long life (Around 10000 hours)",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 48,
    "images": [
      "/uploads/products/light/4/4de54e731f4980ee5603f7b9e79b3033.png",
      "/uploads/products/light/4/6728ca0dc3c0924def7e10868dcb34da.png",
      "/uploads/products/light/4/bed5f79656b2e7a7cc1747005fcd4280.png",
      "/uploads/products/light/4/f9e1389c8b5464c422a954fb2d50a521.png"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-26",
    "slug": "outdoor-solar-wall-lamp-wall-light-villa-lighting-night-light",
    "title": "Outdoor Solar Wall Lamp Wall Light Villa Lighting Night Light",
    "titleBn": "Outdoor Solar Wall Lamp Wall Light Villa Lighting Night Light",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-light",
    "categorySlug": "light",
    "categoryName": "Smart Lights & Lamps",
    "categoryNameBn": "স্মার্ট লাইট ও ল্যাম্প",
    "price": 45000,
    "compareAt": 99900,
    "rating": 4.8999999999999995,
    "reviewCount": 52,
    "inStock": true,
    "stockQty": 30,
    "sku": "0011",
    "tags": [
      "gadgets",
      "light",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-26-1",
        "sku": "0011",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 45000,
        "compareAt": 99900,
        "inStock": true,
        "stockQty": 30
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Outdoor Solar Wall Lamp Wall Light Villa Lighting Night Light",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Outdoor Solar Wall Lamp Wall Light Villa Lighting Night Light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "বৈশিষ্ট্যসমূহ:\n\nউন্নত সোলার প্যানেল যা সূর্যালোক শোষণ করে শক্তিতে রূপান্তর করে। দিনে চার্জ হয়, রাতে স্বয়ংক্রিয়ভাবে আলো দেয়।\n\nআধুনিক IC সেন্সর দিয়ে পরিবেশের আলো শনাক্ত করে, সন্ধ্যায় চালু ও ভোরে বন্ধ হয়।\n\nPIR মোশন সেন্সর ১৯ ফুট পর্যন্ত ও ১২০ ডিগ্রি কোণে গতি শনাক্ত করতে পারে। রাতে গতি বুঝলে আলো জ্বলে, ১৫ সেকেন্ড গতি না থাকলে বন্ধ হয়।\n\nবাড়ির বাইরে বারান্দা, বাগান, গ্যারেজ, প্রাচীর বা বাউন্ডারিতে ব্যবহারের জন্য উপযুক্ত।\n\nস্পেসিফিকেশন:\n\nরঙ: সাদা / কালো (ঐচ্ছিক)\n\nউপাদান: PC + ABS\n\nআলো জ্বলার সময়: ৬-১২ ঘণ্টা\n\nপানি ও ধুলা প্রতিরোধ: IP65\n\nআউটপুট পাওয়ার: ৩.২V / ৩W\n\nসুইচ টাইপ: ম্যানুয়াল\n\nসোলার প্যানেল: সিঙ্গেল ক্রিস্টাল সিলিকন ৫.৫V ১.৪৩W",
    "descriptionBn": "বৈশিষ্ট্যসমূহ:\n\nউন্নত সোলার প্যানেল যা সূর্যালোক শোষণ করে শক্তিতে রূপান্তর করে। দিনে চার্জ হয়, রাতে স্বয়ংক্রিয়ভাবে আলো দেয়।\n\nআধুনিক IC সেন্সর দিয়ে পরিবেশের আলো শনাক্ত করে, সন্ধ্যায় চালু ও ভোরে বন্ধ হয়।\n\nPIR মোশন সেন্সর ১৯ ফুট পর্যন্ত ও ১২০ ডিগ্রি কোণে গতি শনাক্ত করতে পারে। রাতে গতি বুঝলে আলো জ্বলে, ১৫ সেকেন্ড গতি না থাকলে বন্ধ হয়।\n\nবাড়ির বাইরে বারান্দা, বাগান, গ্যারেজ, প্রাচীর বা বাউন্ডারিতে ব্যবহারের জন্য উপযুক্ত।\n\nস্পেসিফিকেশন:\n\nরঙ: সাদা / কালো (ঐচ্ছিক)\n\nউপাদান: PC + ABS\n\nআলো জ্বলার সময়: ৬-১২ ঘণ্টা\n\nপানি ও ধুলা প্রতিরোধ: IP65\n\nআউটপুট পাওয়ার: ৩.২V / ৩W\n\nসুইচ টাইপ: ম্যানুয়াল\n\nসোলার প্যানেল: সিঙ্গেল ক্রিস্টাল সিলিকন ৫.৫V ১.৪৩W",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 95,
    "images": [
      "/uploads/products/light/5/2RGiwnFC354XHLkc09ymwLgM3tdMSYHAzYsjMgOT.jpg",
      "/uploads/products/light/5/jlJTkC02w9AaZJnBKe2KvEXNxGVBkgYRWwxJhXWz.jpg",
      "/uploads/products/light/5/JzHUolZgIo0HOGhMXDq4wxy5TMY8sngkj90zsZ9m.jpg",
      "/uploads/products/light/5/lIbJKasrkW3KCCO7opCr06xveztE6DKgOeehghMb.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-27",
    "slug": "ewa-a127-portable-mini-bluetooth-speaker",
    "title": "EWA A127 Portable Mini Bluetooth Speaker",
    "titleBn": "EWA A127 Portable Mini Bluetooth Speaker",
    "brand": "EWA",
    "brandSlug": "ewa",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 85000,
    "compareAt": 119000,
    "rating": 5,
    "reviewCount": 14,
    "inStock": true,
    "stockQty": 43,
    "sku": "13134",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "ewa",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-27-1",
        "sku": "13134",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 85000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 43
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "EWA A127 Portable Mini Bluetooth Speaker",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "EWA A127 Portable Mini Bluetooth Speaker",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "EWA A127 Portable Mini Bluetooth Speaker\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএর 3W হাই-পাওয়ার আউটপুট এবং 360-ডিগ্রি সারাউন্ড সাউন্ড প্রযুক্তি আপনাকে দেবে একটি অসাধারণ অডিও-ভিজ্যুয়াল অভিজ্ঞতা।\n\nএতে রয়েছে Bluetooth 5.0 + EDR চিপ, যা যেকোনো ব্লুটুথ ডিভাইসের সাথে দ্রুত এবং স্থিতিশীল কানেক্টিভিটি নিশ্চিত করে।\n\nবিল্ট-ইন মাইক্রোফোন থাকায় গান শোনার পাশাপাশি খুব সহজেই যেকোনো কল রিসিভ ও কথা বলা যায়।\n\nIPX5 রেটিং সমৃদ্ধ ওয়াটারপ্রুফ ডিজাইন, যা হালকা পানির ঝাপটা বা ঘাম থেকে স্পিকারটিকে সুরক্ষিত রাখে। আউটডোর বা ভ্রমণের জন্য এটি দারুণ।",
    "descriptionBn": "EWA A127 Portable Mini Bluetooth Speaker\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএর 3W হাই-পাওয়ার আউটপুট এবং 360-ডিগ্রি সারাউন্ড সাউন্ড প্রযুক্তি আপনাকে দেবে একটি অসাধারণ অডিও-ভিজ্যুয়াল অভিজ্ঞতা।\n\nএতে রয়েছে Bluetooth 5.0 + EDR চিপ, যা যেকোনো ব্লুটুথ ডিভাইসের সাথে দ্রুত এবং স্থিতিশীল কানেক্টিভিটি নিশ্চিত করে।\n\nবিল্ট-ইন মাইক্রোফোন থাকায় গান শোনার পাশাপাশি খুব সহজেই যেকোনো কল রিসিভ ও কথা বলা যায়।\n\nIPX5 রেটিং সমৃদ্ধ ওয়াটারপ্রুফ ডিজাইন, যা হালকা পানির ঝাপটা বা ঘাম থেকে স্পিকারটিকে সুরক্ষিত রাখে। আউটডোর বা ভ্রমণের জন্য এটি দারুণ।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 142,
    "images": [
      "/uploads/products/mobile-accessories/1/4Ld81JBryOO90OLYt8BFUjYiEG79ZjKH6JQiLrfj-1024x1024.png",
      "/uploads/products/mobile-accessories/1/EadUItvzQ74AKwGU7pUdrGmiHqfrgooyfZ4HJpUd.png",
      "/uploads/products/mobile-accessories/1/g5ZY36OUSexznqz8BCMqebIv5flLXF4ysr98DEn6-1024x1024.png",
      "/uploads/products/mobile-accessories/1/GIvbyzOFleP7nCY9mnpy5ZmxtQNcNV5kAg3GnEVP.jpg",
      "/uploads/products/mobile-accessories/1/Nslcro2hKkGpoBEDFT0bcyRxqEcTdff8cY4YgvWs-1024x1024.png",
      "/uploads/products/mobile-accessories/1/qq2zASfIjC4kxGmI0wKHo05EDvPzaKxleJJ0Y9Xe.png",
      "/uploads/products/mobile-accessories/1/QrTUDFto325uARuh6GjrFG6z4i6LJmvURmWJwKuO.png"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-28",
    "slug": "ven-dens-30000mah-power-bank",
    "title": "দীর্ঘ সময় ব্যাটারি ব্যাকআপ এবং দ্রুত চার্জিং সুবিধার জন্যVEN-DENS 30000mAh Power Bank একটি পারফেক্ট চয়েস।এটি বিশেষভাবে ডিজাইন করা হয়েছে আধুনিক ব্যবহারকারীদের জন্য, যারা সবসময় অনলাইনে থাকতে চান।",
    "titleBn": "দীর্ঘ সময় ব্যাটারি ব্যাকআপ এবং দ্রুত চার্জিং সুবিধার জন্যVEN-DENS 30000mAh Power Bank একটি পারফেক্ট চয়েস।এটি বিশেষভাবে ডিজাইন করা হয়েছে আধুনিক ব্যবহারকারীদের জন্য, যারা সবসময় অনলাইনে থাকতে চান।",
    "brand": "VEN-DENS",
    "brandSlug": "ven-dens",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 165000,
    "compareAt": 255000,
    "rating": 4.8,
    "reviewCount": 21,
    "inStock": true,
    "stockQty": 56,
    "sku": "2182",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "ven-dens",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-28-1",
        "sku": "2182",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 165000,
        "compareAt": 255000,
        "inStock": true,
        "stockQty": 56
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "দীর্ঘ সময় ব্যাটারি ব্যাকআপ এবং দ্রুত চার্জিং সুবিধার জন্যVEN-DENS 30000mAh Power Bank একটি পারফেক্ট চয়েস।এটি বিশেষভাবে ডিজাইন করা হয়েছে আধুনিক ব্যবহারকারীদের জন্য, যারা সবসময় অনলাইনে থাকতে চান।",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "দীর্ঘ সময় ব্যাটারি ব্যাকআপ এবং দ্রুত চার্জিং সুবিধার জন্যVEN-DENS 30000mAh Power Bank একটি পারফেক্ট চয়েস।এটি বিশেষভাবে ডিজাইন করা হয়েছে আধুনিক ব্যবহারকারীদের জন্য, যারা সবসময় অনলাইনে থাকতে চান।",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "VEN-DENS High-Capacity Power Bank (Model: VD-PB062)\n\nএই পাওয়ার ব্যাংকে রয় চার্জিং, বিল্ট-ইন কেবল এবং মাল্টিপল আউটপুট পোর, যার মাধ্যমে আপনি সহজেই একাধিক ডিভাইস চার্জ করতে পারবেন।\n\n🔹 প্রধান ফিচারসমূহ\n\n🔋 ৩০০০০mAh শক্তিশালী ব্যাটারি ক্যাপাসিটি\n\n🔌 USB, Type-C, Lightning আউটপুট\n\n🔥 ওভারহিটিং প্রোটেকশন\n\n🔋 হাই-কোয়ালিটি ব্যাটারি\n\n📱 সকল মোবাইল ও ডিভাইসের সাথে ব্যবহারযোগ্য\n\n🔄 একাধিক ডিভাইস একসাথে চার্জ করা যায়🔹 স্পেসিফিকেশন\n\nমডেল: VD-PB062\n\nক্যাপাসিটি: 30000mAh (111Wh)\n\nইনপুট (Type-C): 5V/3A, 9V/2A, 12V/1.5A\n\nআউটপুট (Type-C): 5V/3A, 9V/2.22A, 12V/1.67A\n\nUSB আউটপুট: 5V/3A, 9V/2A, 12V/1.5A\n\nLightning আউটপুট: 5V/2A\n\nসেফটি: Overheating Protection",
    "descriptionBn": "VEN-DENS High-Capacity Power Bank (Model: VD-PB062)\n\nএই পাওয়ার ব্যাংকে রয় চার্জিং, বিল্ট-ইন কেবল এবং মাল্টিপল আউটপুট পোর, যার মাধ্যমে আপনি সহজেই একাধিক ডিভাইস চার্জ করতে পারবেন।\n\n🔹 প্রধান ফিচারসমূহ\n\n🔋 ৩০০০০mAh শক্তিশালী ব্যাটারি ক্যাপাসিটি\n\n🔌 USB, Type-C, Lightning আউটপুট\n\n🔥 ওভারহিটিং প্রোটেকশন\n\n🔋 হাই-কোয়ালিটি ব্যাটারি\n\n📱 সকল মোবাইল ও ডিভাইসের সাথে ব্যবহারযোগ্য\n\n🔄 একাধিক ডিভাইস একসাথে চার্জ করা যায়🔹 স্পেসিফিকেশন\n\nমডেল: VD-PB062\n\nক্যাপাসিটি: 30000mAh (111Wh)\n\nইনপুট (Type-C): 5V/3A, 9V/2A, 12V/1.5A\n\nআউটপুট (Type-C): 5V/3A, 9V/2.22A, 12V/1.67A\n\nUSB আউটপুট: 5V/3A, 9V/2A, 12V/1.5A\n\nLightning আউটপুট: 5V/2A\n\nসেফটি: Overheating Protection",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 189,
    "images": [
      "/uploads/products/mobile-accessories/10/product_1782805166_2305.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-29",
    "slug": "awei-pa-106-multi-port-50000mah-225w-portable-power-bank",
    "title": "Awei PA-106 Multi-Port 50000mAh 22.5W Portable Power Bank",
    "titleBn": "Awei PA-106 Multi-Port 50000mAh 22.5W Portable Power Bank",
    "brand": "Awei",
    "brandSlug": "awei",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 320000,
    "compareAt": 450000,
    "rating": 4.8999999999999995,
    "reviewCount": 28,
    "inStock": true,
    "stockQty": 69,
    "sku": "2183",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "awei",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-29-1",
        "sku": "2183",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 320000,
        "compareAt": 450000,
        "inStock": true,
        "stockQty": 69
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Awei PA-106 Multi-Port 50000mAh 22.5W Portable Power Bank",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Awei PA-106 Multi-Port 50000mAh 22.5W Portable Power Bank",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "50000mAh lithium polymer battery cell banks for large energy storage for extended use.\n\n22.5W fast charging channels to quickly refresh power levels on compatible devices.\n\n4-port multi-interface output layout to enable simultaneous charging for multiple digital gadgets.\n\nDual independent Type-C system inputs for fast replenishment up to 18W.\n\nSmart LED digital interface display to map remaining fuel values and help prevent unexpected low-battery situations.\n\nCertified multi-tier protective internal circuit mechanisms designed to insulate connected devices against overheating or voltage spikes.",
    "descriptionBn": "50000mAh lithium polymer battery cell banks for large energy storage for extended use.\n\n22.5W fast charging channels to quickly refresh power levels on compatible devices.\n\n4-port multi-interface output layout to enable simultaneous charging for multiple digital gadgets.\n\nDual independent Type-C system inputs for fast replenishment up to 18W.\n\nSmart LED digital interface display to map remaining fuel values and help prevent unexpected low-battery situations.\n\nCertified multi-tier protective internal circuit mechanisms designed to insulate connected devices against overheating or voltage spikes.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 236,
    "images": [
      "/uploads/products/mobile-accessories/11/Awei-PA-106-Multi‑Port-50000mAh-22.5W-Portable-Power-Bank.webp",
      "/uploads/products/mobile-accessories/11/product_1782805361_9247.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-30",
    "slug": "memo-cx12-magnetic-cooler-fan",
    "title": "MEMO CX12 Magnetic Cooler Fan",
    "titleBn": "MEMO CX12 Magnetic Cooler Fan",
    "brand": "MEMO",
    "brandSlug": "memo",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 125000,
    "compareAt": 215000,
    "rating": 5,
    "reviewCount": 35,
    "inStock": true,
    "stockQty": 82,
    "sku": "2170",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "memo",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-30-1",
        "sku": "2170",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 125000,
        "compareAt": 215000,
        "inStock": true,
        "stockQty": 82
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MEMO CX12 Magnetic Cooler Fan",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "MEMO CX12 Magnetic Cooler Fan",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "MEMO CX12 Mobile Phone Cooler Radiator with Digital Display and BatteryBuilt-in 2000mAh BatteryPlay mobile games freely without being restricted by charging cables.\n\nOffers up to 80 minutes of cooling time on a full charge.\n\nAdvanced Cooling Technology\n\nFeatures ice freeze refrigeration for rapid and efficient cooling.\n\nEquipped with powerful vortex fan blades and a seven-blade heat dissipation system for superior thermal performance.\n\nDigital temperature control ensures safe cooling without harming your device.\n\nMagnetic Design and Portability\n\nStrong magnetic attachment keeps the cooler firmly in place during gameplay.\n\nLightweight and portable, ideal for mobile gaming on the move.\n\nModern Design with Enhanced Features\n\nSleek and trendy design, appealing to younger users.",
    "descriptionBn": "MEMO CX12 Mobile Phone Cooler Radiator with Digital Display and BatteryBuilt-in 2000mAh BatteryPlay mobile games freely without being restricted by charging cables.\n\nOffers up to 80 minutes of cooling time on a full charge.\n\nAdvanced Cooling Technology\n\nFeatures ice freeze refrigeration for rapid and efficient cooling.\n\nEquipped with powerful vortex fan blades and a seven-blade heat dissipation system for superior thermal performance.\n\nDigital temperature control ensures safe cooling without harming your device.\n\nMagnetic Design and Portability\n\nStrong magnetic attachment keeps the cooler firmly in place during gameplay.\n\nLightweight and portable, ideal for mobile gaming on the move.\n\nModern Design with Enhanced Features\n\nSleek and trendy design, appealing to younger users.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 283,
    "images": [
      "/uploads/products/mobile-accessories/12/MEMO-CX12-10W-Magnetic-Cooler-Fan-1.jpg",
      "/uploads/products/mobile-accessories/12/memo-cx12-10w-magnetic-phone-cooler-detachable-battery-600x600-1.webp",
      "/uploads/products/mobile-accessories/12/memo-cx12-10w-magnetic-phone-cooler-digital-display-cooling-600x600-1.webp",
      "/uploads/products/mobile-accessories/12/product_1782800972_5913.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-31",
    "slug": "memo-cx20-magnetic-phone-cooler",
    "title": "MEMO CX20 Magnetic Phone Cooler",
    "titleBn": "MEMO CX20 Magnetic Phone Cooler",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 82000,
    "compareAt": 155000,
    "rating": 4.8,
    "reviewCount": 42,
    "inStock": true,
    "stockQty": 95,
    "sku": "2171",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-31-1",
        "sku": "2171",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 82000,
        "compareAt": 155000,
        "inStock": true,
        "stockQty": 95
      }
    ],
    "highlights": [
      "Brand: MEMO",
      "Cooling Technology: Semiconductor TEC Cooling System",
      "Mounting Type: Magnetic + Universal Clip (2-in-1 Design)",
      "Power Input: 5V/2A ~ 9V/2A",
      "Interface: USB Type-C"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "MEMO",
      "Model": "CX20",
      "Cooling Technology": "Semiconductor TEC Cooling System",
      "Mounting Type": "Magnetic + Universal Clip (2-in-1 Design)",
      "Power Input": "5V/2A ~ 9V/2A",
      "Interface": "USB Type-C",
      "Cooling Modes": "3 Speed Levels (Silent / Strong / Turbo)",
      "Fan Speed": "Up to 6000–7000 RPM",
      "Display": "Digital Temperature Display",
      "Noise Level": "Low Noise (28–32dB)",
      "Material": "ABS Plastic + Aluminum Alloy",
      "Compatibility": "Android & iPhone Devices"
    },
    "specificationsBn": {
      "মডেল": "MEMO CX20 Magnetic Phone Cooler",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Features:\n\nFast Ice Cooling Technology\n\nPrevents Phone Overheating\n\nReduces Frame Drops During Gaming\n\nRGB Gaming Lights\n\nLightweight & Portable Design\n\nSuitable for PUBG, Free Fire, COD Mobile, Genshin Impact & Live Streaming\n\nMEMO CX20 uses advanced semiconductor cooling technology with magnetic and clip-on mounting support, helping maintain stable phone temperatures during heavy gaming and streaming sessions.",
    "descriptionBn": "Features:\n\nFast Ice Cooling Technology\n\nPrevents Phone Overheating\n\nReduces Frame Drops During Gaming\n\nRGB Gaming Lights\n\nLightweight & Portable Design\n\nSuitable for PUBG, Free Fire, COD Mobile, Genshin Impact & Live Streaming\n\nMEMO CX20 uses advanced semiconductor cooling technology with magnetic and clip-on mounting support, helping maintain stable phone temperatures during heavy gaming and streaming sessions.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": true,
    "colorHue": 330,
    "images": [
      "/uploads/products/mobile-accessories/13/Memo-CX20-Magnetic-Phone-Cooler-768x768-1.webp",
      "/uploads/products/mobile-accessories/13/product_1782801098_1207-768x1024.jpg",
      "/uploads/products/mobile-accessories/13/product_1782801098_3187-825x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-32",
    "slug": "memo-cx08-magnetic-cooler-fan",
    "title": "MEMO CX08 Magnetic Cooler Fan",
    "titleBn": "MEMO CX08 Magnetic Cooler Fan",
    "brand": "MEMO",
    "brandSlug": "memo",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 110000,
    "compareAt": 185000,
    "rating": 4.8999999999999995,
    "reviewCount": 49,
    "inStock": true,
    "stockQty": 28,
    "sku": "2172",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "memo",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-32-1",
        "sku": "2172",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 110000,
        "compareAt": 185000,
        "inStock": true,
        "stockQty": 28
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MEMO CX08 Magnetic Cooler Fan",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "MEMO CX08 Magnetic Cooler Fan",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Memo CX08 Magnetic Phone Cooler-15W Features\n\nMagnetic snap system keeps it stuck tight while you drop nukes in every match\n\nMagnetic clip and suction modes efficiently dissipate heat from your phone with precision\n\nLight enough to carry around, mean enough to ice your phone in a matter of seconds.\n\niOS and Android compatibility nice plays along to keep every user happy with gaming\n\nConvenient Type C plug powers instant freeze mode to chill phones, at home or outside\n\nEasy clamp-less attachment mechanism lets you lock aim and start gaming instantly\n\nLightweight and slim design enables you to carry the gadget anywhere you want to go",
    "descriptionBn": "Memo CX08 Magnetic Phone Cooler-15W Features\n\nMagnetic snap system keeps it stuck tight while you drop nukes in every match\n\nMagnetic clip and suction modes efficiently dissipate heat from your phone with precision\n\nLight enough to carry around, mean enough to ice your phone in a matter of seconds.\n\niOS and Android compatibility nice plays along to keep every user happy with gaming\n\nConvenient Type C plug powers instant freeze mode to chill phones, at home or outside\n\nEasy clamp-less attachment mechanism lets you lock aim and start gaming instantly\n\nLightweight and slim design enables you to carry the gadget anywhere you want to go",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 17,
    "images": [
      "/uploads/products/mobile-accessories/14/product_1782801484_9960.jpg",
      "/uploads/products/mobile-accessories/14/Untitled-design-14-600x600.jpg.webp",
      "/uploads/products/mobile-accessories/14/Untitled-design-15-600x600.jpg.webp"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-33",
    "slug": "memo-cx15-magnetic-cooler-fan",
    "title": "MEMO CX15 Magnetic Cooler Fan",
    "titleBn": "MEMO CX15 Magnetic Cooler Fan",
    "brand": "MEMO",
    "brandSlug": "memo",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 105000,
    "compareAt": 155000,
    "rating": 5,
    "reviewCount": 56,
    "inStock": true,
    "stockQty": 41,
    "sku": "2176",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "memo",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-33-1",
        "sku": "2176",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 105000,
        "compareAt": 155000,
        "inStock": true,
        "stockQty": 41
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MEMO CX15 Magnetic Cooler Fan",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "MEMO CX15 Magnetic Cooler Fan",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Memo CX15 Mobile phone cooler:\n\nFeatures:\n\nThe Memo CX15 Mobile PhoneCooler is an excellent solution for mobile gamers and heavy users who often face overheating issues. Nowadays, smartphones handle intense gaming, streaming, and multitasking. However, heat can reduce performance and damage internal components. Therefore, using a high-quality cooler like the Memo CX15 becomes essential.\n\nThis device features 15W semiconductor cooling technology, which delivers strong and fast temperature reduction. As a result, it can lower your phone’s temperature by up to 23°C, ensuring stable performance during long gaming sessions. Whether you play PUBG, Free Fire, or stream content, this cooler helps maintain smooth gameplay without lag.\n\nMoreover, the Memo CX15 offers dual mounting options, including a magnetic attachment and a back clip. Because of this, users can easily attach it to different devices such as Android phones, iPhones, tablets, and even iPads. In addition, the secure grip ensures the cooler stays in place while gaming.\n\nAnother impressive feature is its low noise operation. It runs at only 25dB, which means you can enjoy your games or videos without any annoying sound. Furthermore, the built-in RGB lighting adds a stylish and modern gaming vibe, making your setup more attractive.\n\nWhen it comes to the Memo CX15 Mobile PhoneCooler price in BD, it is considered affordable compared to its performance and features. So, if you are looking for a reliable cooling accessory, this model is definitely worth considering.",
    "descriptionBn": "Memo CX15 Mobile phone cooler:\n\nFeatures:\n\nThe Memo CX15 Mobile PhoneCooler is an excellent solution for mobile gamers and heavy users who often face overheating issues. Nowadays, smartphones handle intense gaming, streaming, and multitasking. However, heat can reduce performance and damage internal components. Therefore, using a high-quality cooler like the Memo CX15 becomes essential.\n\nThis device features 15W semiconductor cooling technology, which delivers strong and fast temperature reduction. As a result, it can lower your phone’s temperature by up to 23°C, ensuring stable performance during long gaming sessions. Whether you play PUBG, Free Fire, or stream content, this cooler helps maintain smooth gameplay without lag.\n\nMoreover, the Memo CX15 offers dual mounting options, including a magnetic attachment and a back clip. Because of this, users can easily attach it to different devices such as Android phones, iPhones, tablets, and even iPads. In addition, the secure grip ensures the cooler stays in place while gaming.\n\nAnother impressive feature is its low noise operation. It runs at only 25dB, which means you can enjoy your games or videos without any annoying sound. Furthermore, the built-in RGB lighting adds a stylish and modern gaming vibe, making your setup more attractive.\n\nWhen it comes to the Memo CX15 Mobile PhoneCooler price in BD, it is considered affordable compared to its performance and features. So, if you are looking for a reliable cooling accessory, this model is definitely worth considering.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 64,
    "images": [
      "/uploads/products/mobile-accessories/15/MEMO-CX15-Magnetic-Phone-Cooling-Fan-1467.webp",
      "/uploads/products/mobile-accessories/15/MEMO-CX15-Magnetic-Phone-Cooling-Fangd-8163.webp",
      "/uploads/products/mobile-accessories/15/product_1782802918_9105-768x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-34",
    "slug": "s38-icy-magnetic-digital-display-mobile-phone-cooler",
    "title": "S38 Icy Magnetic Digital Display Mobile Phone Cooler",
    "titleBn": "S38 Icy Magnetic Digital Display Mobile Phone Cooler",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 80000,
    "compareAt": 150000,
    "rating": 4.8,
    "reviewCount": 18,
    "inStock": true,
    "stockQty": 54,
    "sku": "2177",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-34-1",
        "sku": "2177",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 80000,
        "compareAt": 150000,
        "inStock": true,
        "stockQty": 54
      }
    ],
    "highlights": [
      "Type: Mobile Gaming Cooler (Semiconductor TEC Cooling)",
      "Cooling Technology: Peltier Ice Cooling Plate System",
      "Power Input: 5V / 2A (USB Type-C)",
      "Mounting Type: Magnetic + Clip Dual System",
      "Material: ABS Plastic + Aluminum Alloy Cooling Plate"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "S38",
      "Type": "Mobile Gaming Cooler (Semiconductor TEC Cooling)",
      "Cooling Technology": "Peltier Ice Cooling Plate System",
      "Power Input": "5V / 2A (USB Type-C)",
      "Mounting Type": "Magnetic + Clip Dual System",
      "Material": "ABS Plastic + Aluminum Alloy Cooling Plate",
      "Fan System": "High-speed turbo cooling fan",
      "Cooling Mode": "Instant temperature reduction technology",
      "Lighting": "RGB Dynamic Gaming Lights",
      "Display": "Some variants include digital temperature display",
      "Noise Level": "Low noise optimized for gaming",
      "Compatibility": "Android & iPhone (MagSafe supported with ring)",
      "Weight": "~100–120g"
    },
    "specificationsBn": {
      "মডেল": "S38 Icy Magnetic Digital Display Mobile Phone Cooler",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Full Details",
    "descriptionBn": "Full Details",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 111,
    "images": [
      "/uploads/products/mobile-accessories/16/product_1782803463_1842.jpg",
      "/uploads/products/mobile-accessories/16/product_1782803463_2026.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-35",
    "slug": "dy31-semiconductor-mobile-phone-radiator",
    "title": "DY31 Semiconductor Mobile Phone Radiator",
    "titleBn": "DY31 Semiconductor Mobile Phone Radiator",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 90000,
    "compareAt": 150000,
    "rating": 4.8999999999999995,
    "reviewCount": 25,
    "inStock": true,
    "stockQty": 67,
    "sku": "2178",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-35-1",
        "sku": "2178",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 90000,
        "compareAt": 150000,
        "inStock": true,
        "stockQty": 67
      }
    ],
    "highlights": [
      "Color: black",
      "Material: plastic + metal parts",
      "Fit with: smart phone"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Color": "black",
      "Material": "plastic + metal parts",
      "Fit with": "smart phone"
    },
    "specificationsBn": {
      "মডেল": "DY31 Semiconductor Mobile Phone Radiator",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "DY31 Portable Artificial Intelligence Magnetic Adjustable RGB Light AI Semiconductor Phone Cooler\n\nProduct Name\n\nDY31 cooling fan\n\nSize\n\n110*136*162cm\n\nWeight\n\n150g\n\nColor\n\nBLACK\n\nPacking\n\nColor box\n\nDelivery\n\nWithin 5 days after receiving the payment",
    "descriptionBn": "DY31 Portable Artificial Intelligence Magnetic Adjustable RGB Light AI Semiconductor Phone Cooler\n\nProduct Name\n\nDY31 cooling fan\n\nSize\n\n110*136*162cm\n\nWeight\n\n150g\n\nColor\n\nBLACK\n\nPacking\n\nColor box\n\nDelivery\n\nWithin 5 days after receiving the payment",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 158,
    "images": [
      "/uploads/products/mobile-accessories/17/A048c2b3724c8425bbbded73951d862cc3.jpg_960x960q80.jpg",
      "/uploads/products/mobile-accessories/17/A46f4cab054294fe0aff6d5681fb049405.jpg_960x960q80.jpg",
      "/uploads/products/mobile-accessories/17/A7e19e2a25b674e5eb6f73aad3260b45fY.jpg_960x960q80.jpg",
      "/uploads/products/mobile-accessories/17/A7fd05ec2c4894761a9837bef1a756aad3.jpg_960x960q80.jpg",
      "/uploads/products/mobile-accessories/17/A98a1833c45f1480a89b90bbcc5a315e1i.jpg_960x960q80.jpg",
      "/uploads/products/mobile-accessories/17/product_1782803732_4960.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-36",
    "slug": "dy28-semiconductor-phone-cooler",
    "title": "DY28 Semiconductor Phone Cooler",
    "titleBn": "DY28 Semiconductor Phone Cooler",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 90000,
    "compareAt": 150000,
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "stockQty": 80,
    "sku": "2179",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-36-1",
        "sku": "2179",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 90000,
        "compareAt": 150000,
        "inStock": true,
        "stockQty": 80
      }
    ],
    "highlights": [
      "Immersive Aesthetic: Equipped with vibrant RGB lighting to enhance your gaming setup and atmosphere."
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Efficient Cooling": "Features semiconductor radiator technology to quickly dissipate heat from your phone.",
      "Real-Time Monitoring": "Includes a digital display that indicates the temperature, allowing you to monitor cooling performance in real-time.",
      "Immersive Aesthetic": "Equipped with vibrant RGB lighting to enhance your gaming setup and atmosphere.",
      "Gaming Optimized": "Specifically designed for mobile gaming, ensuring your device remains cool and stable during intensive gameplay."
    },
    "specificationsBn": {
      "মডেল": "DY28 Semiconductor Phone Cooler",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "DY28 Semiconductor Phone Cooler",
    "descriptionBn": "DY28 Semiconductor Phone Cooler",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 205,
    "images": [
      "/uploads/products/mobile-accessories/18/OIP.webp",
      "/uploads/products/mobile-accessories/18/product_1782804682_6478.jpg",
      "/uploads/products/mobile-accessories/18/R.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-37",
    "slug": "tl07-mobile-phone-icing-cooler",
    "title": "TL07 Mobile Phone Icing Cooler",
    "titleBn": "TL07 Mobile Phone Icing Cooler",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 80000,
    "compareAt": 145000,
    "rating": 4.8,
    "reviewCount": 39,
    "inStock": true,
    "stockQty": 93,
    "sku": "2181",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-37-1",
        "sku": "2181",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 80000,
        "compareAt": 145000,
        "inStock": true,
        "stockQty": 93
      }
    ],
    "highlights": [
      "Adapter Voltage Requirement: Use an adapter with an output voltage higher than 5V3A for power supply.",
      "Charging Cable Selection: Ensure to use the default charging cable provided by us for connection.",
      "Room Temperature Condition: Make sure the room temperature during operation is below 25°C."
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Adapter Voltage Requirement": "Use an adapter with an output voltage higher than 5V3A for power supply.",
      "Charging Cable Selection": "Ensure to use the default charging cable provided by us for connection.",
      "Room Temperature Condition": "Make sure the room temperature during operation is below 25°C."
    },
    "specificationsBn": {
      "মডেল": "TL07 Mobile Phone Icing Cooler",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Instructions for Freezing Conditions:\n\nTo achieve a freezing effect with the phone cooler, please ensure the following conditions are met:\n\nImportant Warning:\n\nPlease note that this device is a phone cooler, not a professional ice maker. Avoid operating the device in an unloaded state for a long time in an attempt to achieve a freezing effect, as it may cause damage to the device or pose a safety hazard.\n\nIf the product is flickering, it means that the power supply is insufficient. You need to use a 5V3A plug to supply power and connect it with our charging cable. This is not a quality issue.",
    "descriptionBn": "Instructions for Freezing Conditions:\n\nTo achieve a freezing effect with the phone cooler, please ensure the following conditions are met:\n\nImportant Warning:\n\nPlease note that this device is a phone cooler, not a professional ice maker. Avoid operating the device in an unloaded state for a long time in an attempt to achieve a freezing effect, as it may cause damage to the device or pose a safety hazard.\n\nIf the product is flickering, it means that the power supply is insufficient. You need to use a 5V3A plug to supply power and connect it with our charging cable. This is not a quality issue.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 252,
    "images": [
      "/uploads/products/mobile-accessories/19/product_1782804913_3138.jpg",
      "/uploads/products/mobile-accessories/19/product_1782804913_4101-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-38",
    "slug": "smart-fast-charge-power-bank-10000mah-multi-cable-built-in",
    "title": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
    "titleBn": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 80000,
    "compareAt": 120000,
    "rating": 4.8999999999999995,
    "reviewCount": 46,
    "inStock": true,
    "stockQty": 26,
    "sku": "13165",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-38-1",
        "sku": "13165",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 80000,
        "compareAt": 120000,
        "inStock": true,
        "stockQty": 26
      }
    ],
    "highlights": [
      "10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা",
      "Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ",
      "Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট",
      "Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন",
      "Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য",
      "Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনার দৈনন্দিন জীবনের জন্য পারফেক্ট পাওয়ার সল্যুশন! এই Smart Power Bank (10000mAh) একসাথে স্টাইলিশ, শক্তিশালী এবং অত্যন্ত সুবিধাজনক। যেখানেই যান, আপনার ডিভাইস থাকবে সবসময় চার্জড 🔌\n\n✨ মূল বৈশিষ্ট্যসমূহঃ\n\n✅ 10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা\n\n✅ Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ\n\n✅ Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট\n\n✅ Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন\n\n✅ Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য\n\n✅ Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন\n\n🔌 Supported Devices:\n\nAndroid Smartphone\n\niPhone\n\nTablet\n\nঅন্যান্য USB ডিভাইস\n\n💡 কেন এই পাওয়ার ব্যাংকটি নেবেন?\n\nআলাদা ক্যাবল বহন করার ঝামেলা নেই\n\nট্রাভেল ও আউটডোর ব্যবহারের জন্য পারফেক্ট\n\nএকাধিক ডিভাইস একসাথে চার্জ করার সুবিধা\n\nবড় ব্যাটারি ক্যাপাসিটি, দীর্ঘস্থায়ী পারফরম্যান্স",
    "descriptionBn": "আপনার দৈনন্দিন জীবনের জন্য পারফেক্ট পাওয়ার সল্যুশন! এই Smart Power Bank (10000mAh) একসাথে স্টাইলিশ, শক্তিশালী এবং অত্যন্ত সুবিধাজনক। যেখানেই যান, আপনার ডিভাইস থাকবে সবসময় চার্জড 🔌\n\n✨ মূল বৈশিষ্ট্যসমূহঃ\n\n✅ 10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা\n\n✅ Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ\n\n✅ Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট\n\n✅ Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন\n\n✅ Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য\n\n✅ Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন\n\n🔌 Supported Devices:\n\nAndroid Smartphone\n\niPhone\n\nTablet\n\nঅন্যান্য USB ডিভাইস\n\n💡 কেন এই পাওয়ার ব্যাংকটি নেবেন?\n\nআলাদা ক্যাবল বহন করার ঝামেলা নেই\n\nট্রাভেল ও আউটডোর ব্যবহারের জন্য পারফেক্ট\n\nএকাধিক ডিভাইস একসাথে চার্জ করার সুবিধা\n\nবড় ব্যাটারি ক্যাপাসিটি, দীর্ঘস্থায়ী পারফরম্যান্স",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 299,
    "images": [
      "/uploads/products/mobile-accessories/2/MeMaR77Mb0RW8Mhg4t451J6seOyzm3LoZuCcfY8k-1024x1024.png",
      "/uploads/products/mobile-accessories/2/VEZMxZ9zTwi3KM8IORTYQ2ymoQweUCpEYr7bru3G-1024x1024.jpg",
      "/uploads/products/mobile-accessories/2/WqjXgdjKg9QDWc99CcEuAGpJZhH4K9ZpvUvaE9Et-1024x1024.jpg",
      "/uploads/products/mobile-accessories/2/x1K8McFIjAF3kBjzYyd8gQaoxQqIiufwq4zTd1k0-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-39",
    "slug": "type-c-iphone-port-sx21-wireless-microphone",
    "title": "Type c + iphone port SX21 Wireless Microphone",
    "titleBn": "Type c + iphone port SX21 Wireless Microphone",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 63000,
    "compareAt": 108000,
    "rating": 5,
    "reviewCount": 53,
    "inStock": true,
    "stockQty": 39,
    "sku": "2066-67",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-39-1",
        "sku": "2066-67",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 63000,
        "compareAt": 108000,
        "inStock": true,
        "stockQty": 39
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Type c + iphone port SX21 Wireless Microphone",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Type c + iphone port SX21 Wireless Microphone",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "SX21  Wireless Microphone\n\nWith Iphone Usb Port\n\nবর্তমান সময়ে কন্টেন্ট করার জন্য উপযুক্ত একটি প্রোডাক্ট হচ্ছে মাইক্রোফোন ভালো মানের একটি মাইক্রোফোন থাকলে কন্টেইনের ভয়েস ক্লিয়ার হয় এবং ভিডিওটিও সুন্দর ফুটিয়ে তোলা হয় তাই আমরাই দিচ্ছি আপনাকে একদম রিজনেবল প্রাইস এর মধ্যে কোয়ালিটি ফুল প্রোডাক্ট sx21 ওয়্যারলেস মাইক্রোফোন। এই মাইক্রোফোনটার বিশেষত্ব হচ্ছে দেখতে একদম স্মার্ট ইউনিক এবং ছোট এবং সাউন্ড বয়েজ কোয়ালিটি হাই।\n\nOrjinal\n\nNo Copy\n\nপণ্যের বিবরণ (SX21-New 1 Drag 2 ওয়্যারলেস লেভালিয়ার মাইক্রোফোন)\n\nSX21-New 1 Drag 2 একটি ডুয়াল মাইক্রোফোন সিস্টেম, যা এক রিসিভারের সাথে দুইটি মাইক্রোফোন সংযুক্ত করতে সক্ষম। এটি 2.4GHz ফ্রিকোয়েন্সিতে কাজ করে এবং রিয়েল-টাইম অডিও সিঙ্ক প্রদান করে।\n\nডুয়াল মাইক্রোফোন: একসাথে দুইজনের রেকর্ডিং উপযোগী\n\n2.4GHz ওয়্যারলেস ট্রান্সমিশন: স্থিতিশীল সংযোগ ও কম ল্যাটেন্সি\n\nনয়েজ রিডাকশন: আশেপাশের শব্দ কমিয়ে পরিষ্কার অডিও রেকর্ডিং\n\nপ্লাগ অ্যান্ড প্লে: কোনও অ্যাপ বা ব্লুটুথ ছাড়াই সরাসরি ব্যবহারযোগ্য\n\nকমপ্যাক্ট ডিজাইন: সহজে বহনযোগ্য\n\nType-C\n\nভ্লগিং, লাইভ স্ট্রিমিং, ইন্টারভিউ ও পডকাস্টের জন্য উপযুক্ত।\n\nট্রান্সমিশন রেঞ্জ: ২০-৩০ মিটার\n\nব্যাটারি ব্যাকআপ: ৪-৬ ঘন্টা\n\nফ্রিকোয়েন্সি রেসপন্স: ২০Hz–২০kHz\n\nসংবেদনশীলতা: –৪২dB\n\nএটি মোবাইল, ক্যামেরা, এবং ল্যাপটপে ব্যবহারযোগ্য।",
    "descriptionBn": "SX21  Wireless Microphone\n\nWith Iphone Usb Port\n\nবর্তমান সময়ে কন্টেন্ট করার জন্য উপযুক্ত একটি প্রোডাক্ট হচ্ছে মাইক্রোফোন ভালো মানের একটি মাইক্রোফোন থাকলে কন্টেইনের ভয়েস ক্লিয়ার হয় এবং ভিডিওটিও সুন্দর ফুটিয়ে তোলা হয় তাই আমরাই দিচ্ছি আপনাকে একদম রিজনেবল প্রাইস এর মধ্যে কোয়ালিটি ফুল প্রোডাক্ট sx21 ওয়্যারলেস মাইক্রোফোন। এই মাইক্রোফোনটার বিশেষত্ব হচ্ছে দেখতে একদম স্মার্ট ইউনিক এবং ছোট এবং সাউন্ড বয়েজ কোয়ালিটি হাই।\n\nOrjinal\n\nNo Copy\n\nপণ্যের বিবরণ (SX21-New 1 Drag 2 ওয়্যারলেস লেভালিয়ার মাইক্রোফোন)\n\nSX21-New 1 Drag 2 একটি ডুয়াল মাইক্রোফোন সিস্টেম, যা এক রিসিভারের সাথে দুইটি মাইক্রোফোন সংযুক্ত করতে সক্ষম। এটি 2.4GHz ফ্রিকোয়েন্সিতে কাজ করে এবং রিয়েল-টাইম অডিও সিঙ্ক প্রদান করে।\n\nডুয়াল মাইক্রোফোন: একসাথে দুইজনের রেকর্ডিং উপযোগী\n\n2.4GHz ওয়্যারলেস ট্রান্সমিশন: স্থিতিশীল সংযোগ ও কম ল্যাটেন্সি\n\nনয়েজ রিডাকশন: আশেপাশের শব্দ কমিয়ে পরিষ্কার অডিও রেকর্ডিং\n\nপ্লাগ অ্যান্ড প্লে: কোনও অ্যাপ বা ব্লুটুথ ছাড়াই সরাসরি ব্যবহারযোগ্য\n\nকমপ্যাক্ট ডিজাইন: সহজে বহনযোগ্য\n\nType-C\n\nভ্লগিং, লাইভ স্ট্রিমিং, ইন্টারভিউ ও পডকাস্টের জন্য উপযুক্ত।\n\nট্রান্সমিশন রেঞ্জ: ২০-৩০ মিটার\n\nব্যাটারি ব্যাকআপ: ৪-৬ ঘন্টা\n\nফ্রিকোয়েন্সি রেসপন্স: ২০Hz–২০kHz\n\nসংবেদনশীলতা: –৪২dB\n\nএটি মোবাইল, ক্যামেরা, এবং ল্যাপটপে ব্যবহারযোগ্য।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 346,
    "images": [
      "/uploads/products/mobile-accessories/20/product_1781006886_1604.jpg",
      "/uploads/products/mobile-accessories/20/product_1781006886_5427.jpg",
      "/uploads/products/mobile-accessories/20/product_1781006886_8634.jpg",
      "/uploads/products/mobile-accessories/20/product_1781674115_5230.jpg",
      "/uploads/products/mobile-accessories/20/thumbnail_1780767322_2807.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-40",
    "slug": "sx21-wireless-microphone-type-c",
    "title": "SX21 Wireless Microphone Type c",
    "titleBn": "SX21 Wireless Microphone Type c",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 59900,
    "compareAt": 99000,
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "stockQty": 52,
    "sku": "2066",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-40-1",
        "sku": "2066",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 59900,
        "compareAt": 99000,
        "inStock": true,
        "stockQty": 52
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "SX21 Wireless Microphone Type c",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "SX21 Wireless Microphone Type c",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "SX21  Wireless Microphone\n\nবর্তমান সময়ে কন্টেন্ট করার জন্য উপযুক্ত একটি প্রোডাক্ট হচ্ছে মাইক্রোফোন ভালো মানের একটি মাইক্রোফোন থাকলে কন্টেইনের ভয়েস ক্লিয়ার হয় এবং ভিডিওটিও সুন্দর ফুটিয়ে তোলা হয় তাই আমরাই দিচ্ছি আপনাকে একদম রিজনেবল প্রাইস এর মধ্যে কোয়ালিটি ফুল প্রোডাক্ট sx21 ওয়্যারলেস মাইক্রোফোন। এই মাইক্রোফোনটার বিশেষত্ব হচ্ছে দেখতে একদম স্মার্ট ইউনিক এবং ছোট এবং সাউন্ড বয়েজ কোয়ালিটি হাই।\n\nOrjinal\n\nNo Copy\n\nপণ্যের বিবরণ (SX21-New 1 Drag 2 ওয়্যারলেস লেভালিয়ার মাইক্রোফোন)\n\nSX21-New 1 Drag 2 একটি ডুয়াল মাইক্রোফোন সিস্টেম, যা এক রিসিভারের সাথে দুইটি মাইক্রোফোন সংযুক্ত করতে সক্ষম। এটি 2.4GHz ফ্রিকোয়েন্সিতে কাজ করে এবং রিয়েল-টাইম অডিও সিঙ্ক প্রদান করে।\n\nডুয়াল মাইক্রোফোন: একসাথে দুইজনের রেকর্ডিং উপযোগী\n\n2.4GHz ওয়্যারলেস ট্রান্সমিশন: স্থিতিশীল সংযোগ ও কম ল্যাটেন্সি\n\nনয়েজ রিডাকশন: আশেপাশের শব্দ কমিয়ে পরিষ্কার অডিও রেকর্ডিং\n\nপ্লাগ অ্যান্ড প্লে: কোনও অ্যাপ বা ব্লুটুথ ছাড়াই সরাসরি ব্যবহারযোগ্য\n\nকমপ্যাক্ট ডিজাইন: সহজে বহনযোগ্য\n\nType-C\n\nভ্লগিং, লাইভ স্ট্রিমিং, ইন্টারভিউ ও পডকাস্টের জন্য উপযুক্ত।\n\nট্রান্সমিশন রেঞ্জ: ২০-৩০ মিটার\n\nব্যাটারি ব্যাকআপ: ৪-৬ ঘন্টা\n\nফ্রিকোয়েন্সি রেসপন্স: ২০Hz–২০kHz\n\nসংবেদনশীলতা: –৪২dB\n\nএটি মোবাইল, ক্যামেরা, এবং ল্যাপটপে ব্যবহারযোগ্য।",
    "descriptionBn": "SX21  Wireless Microphone\n\nবর্তমান সময়ে কন্টেন্ট করার জন্য উপযুক্ত একটি প্রোডাক্ট হচ্ছে মাইক্রোফোন ভালো মানের একটি মাইক্রোফোন থাকলে কন্টেইনের ভয়েস ক্লিয়ার হয় এবং ভিডিওটিও সুন্দর ফুটিয়ে তোলা হয় তাই আমরাই দিচ্ছি আপনাকে একদম রিজনেবল প্রাইস এর মধ্যে কোয়ালিটি ফুল প্রোডাক্ট sx21 ওয়্যারলেস মাইক্রোফোন। এই মাইক্রোফোনটার বিশেষত্ব হচ্ছে দেখতে একদম স্মার্ট ইউনিক এবং ছোট এবং সাউন্ড বয়েজ কোয়ালিটি হাই।\n\nOrjinal\n\nNo Copy\n\nপণ্যের বিবরণ (SX21-New 1 Drag 2 ওয়্যারলেস লেভালিয়ার মাইক্রোফোন)\n\nSX21-New 1 Drag 2 একটি ডুয়াল মাইক্রোফোন সিস্টেম, যা এক রিসিভারের সাথে দুইটি মাইক্রোফোন সংযুক্ত করতে সক্ষম। এটি 2.4GHz ফ্রিকোয়েন্সিতে কাজ করে এবং রিয়েল-টাইম অডিও সিঙ্ক প্রদান করে।\n\nডুয়াল মাইক্রোফোন: একসাথে দুইজনের রেকর্ডিং উপযোগী\n\n2.4GHz ওয়্যারলেস ট্রান্সমিশন: স্থিতিশীল সংযোগ ও কম ল্যাটেন্সি\n\nনয়েজ রিডাকশন: আশেপাশের শব্দ কমিয়ে পরিষ্কার অডিও রেকর্ডিং\n\nপ্লাগ অ্যান্ড প্লে: কোনও অ্যাপ বা ব্লুটুথ ছাড়াই সরাসরি ব্যবহারযোগ্য\n\nকমপ্যাক্ট ডিজাইন: সহজে বহনযোগ্য\n\nType-C\n\nভ্লগিং, লাইভ স্ট্রিমিং, ইন্টারভিউ ও পডকাস্টের জন্য উপযুক্ত।\n\nট্রান্সমিশন রেঞ্জ: ২০-৩০ মিটার\n\nব্যাটারি ব্যাকআপ: ৪-৬ ঘন্টা\n\nফ্রিকোয়েন্সি রেসপন্স: ২০Hz–২০kHz\n\nসংবেদনশীলতা: –৪২dB\n\nএটি মোবাইল, ক্যামেরা, এবং ল্যাপটপে ব্যবহারযোগ্য।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 33,
    "images": [
      "/uploads/products/mobile-accessories/21/product_1781006886_1604.jpg",
      "/uploads/products/mobile-accessories/21/product_1781006886_5427.jpg",
      "/uploads/products/mobile-accessories/21/product_1781006886_8634.jpg",
      "/uploads/products/mobile-accessories/21/thumbnail_1780767322_2807.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-41",
    "slug": "hollyland-lark-m2-wireless-microphone",
    "title": "Hollyland LARK M2 Wireless Microphone",
    "titleBn": "Hollyland LARK M2 Wireless Microphone",
    "brand": "Hollyland",
    "brandSlug": "hollyland",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 104000,
    "compareAt": 185000,
    "rating": 4.8999999999999995,
    "reviewCount": 22,
    "inStock": true,
    "stockQty": 65,
    "sku": "2164",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "hollyland",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-41-1",
        "sku": "2164",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 104000,
        "compareAt": 185000,
        "inStock": true,
        "stockQty": 65
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "LARK M2"
    },
    "specificationsBn": {
      "মডেল": "Hollyland LARK M2 Wireless Microphone",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "2 x Transmitters With Omni Directional Microphone\n\n48 kHz, 24-bit Hi-Fi Sound\n\nUp to 40 Hour Battery Life\n\nOne-click Noise Cancellation",
    "descriptionBn": "2 x Transmitters With Omni Directional Microphone\n\n48 kHz, 24-bit Hi-Fi Sound\n\nUp to 40 Hour Battery Life\n\nOne-click Noise Cancellation",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 80,
    "images": [
      "/uploads/products/mobile-accessories/22/product_1782463496_3081.jpg",
      "/uploads/products/mobile-accessories/22/product_1782463496_3308.jpg",
      "/uploads/products/mobile-accessories/22/product_1782463496_4953.jpg",
      "/uploads/products/mobile-accessories/22/product_1782463496_5224.jpg",
      "/uploads/products/mobile-accessories/22/product_1782463496_5687.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-42",
    "slug": "usb-c-auto-eject-charging-adapter-silver",
    "title": "USB-C Auto Eject Charging Adapter, Silver",
    "titleBn": "USB-C Auto Eject Charging Adapter, Silver",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 56000,
    "compareAt": 99900,
    "rating": 5,
    "reviewCount": 29,
    "inStock": true,
    "stockQty": 78,
    "sku": "2105",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-42-1",
        "sku": "2105",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 56000,
        "compareAt": 99900,
        "inStock": true,
        "stockQty": 78
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "USB-C Auto Eject Charging Adapter, Silver",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "USB-C Auto Eject Charging Adapter, Silver",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "USB-C Auto Eject Charging Adapter, Silver\n\nআপনার মোবাইল ফোন রাখুন নিরাপদে এবং খুব দ্রুত চার্জ হওয়ায় আপনার মোবাইল ফোন থেকে চার্জার ডিসকানেক্ট করার জন্য আমরা নিয়ে এসেছি অটো চার্জিং এডাপটার যা আপনার ফোন ১০০% চার্জ হওয়ার পর অটো চার্জ থেকে রিমুভ হয়ে যাবে এবং আপনার ফোনটা নিরাপদ।",
    "descriptionBn": "USB-C Auto Eject Charging Adapter, Silver\n\nআপনার মোবাইল ফোন রাখুন নিরাপদে এবং খুব দ্রুত চার্জ হওয়ায় আপনার মোবাইল ফোন থেকে চার্জার ডিসকানেক্ট করার জন্য আমরা নিয়ে এসেছি অটো চার্জিং এডাপটার যা আপনার ফোন ১০০% চার্জ হওয়ার পর অটো চার্জ থেকে রিমুভ হয়ে যাবে এবং আপনার ফোনটা নিরাপদ।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 127,
    "images": [
      "/uploads/products/mobile-accessories/23/58e83ebec11722eb606280c5bf45b61e.jpg",
      "/uploads/products/mobile-accessories/23/602c0a0466a907003082c49106286f73.jpg",
      "/uploads/products/mobile-accessories/23/88c44846611efeec23b4821bd7eace4d-1.jpg",
      "/uploads/products/mobile-accessories/23/88c44846611efeec23b4821bd7eace4d.jpg",
      "/uploads/products/mobile-accessories/23/b665198e235949fed55681b9c1e28637.jpg",
      "/uploads/products/mobile-accessories/23/WhatsApp-Image-2026-06-14-at-9.36.41-AM-1.jpeg",
      "/uploads/products/mobile-accessories/23/WhatsApp-Image-2026-06-14-at-9.36.41-AM.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-43",
    "slug": "mobile-accessories-24",
    "title": "চার্জিং নিয়ে চিন্তা শেষ! এই একটি ডিভাইসেই চার্জ করুন আপনার সব গ্যাজেট।",
    "titleBn": "চার্জিং নিয়ে চিন্তা শেষ! এই একটি ডিভাইসেই চার্জ করুন আপনার সব গ্যাজেট।",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 40000,
    "compareAt": 79900,
    "rating": 4.8,
    "reviewCount": 36,
    "inStock": true,
    "stockQty": 91,
    "sku": "8905",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-43-1",
        "sku": "8905",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 40000,
        "compareAt": 79900,
        "inStock": true,
        "stockQty": 91
      }
    ],
    "highlights": [
      "6-in-1 Charging Solution: 6U Multi-Port Charger with 3-in-1 Fast Cable"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "6-in-1 Charging Solution": "6U Multi-Port Charger with 3-in-1 Fast Cable"
    },
    "specificationsBn": {
      "মডেল": "চার্জিং নিয়ে চিন্তা শেষ! এই একটি ডিভাইসেই চার্জ করুন আপনার সব গ্যাজেট।",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনার বাসায় বা অফিসে কি অনেকগুলো স্মার্ট ডিভাইস আছে? চার্জিং পোর্ট আর তারের ভিড়ে কি টেবিল অগোছালো হয়ে থাকে? তবে এই 6-in-1 চার্জিং হাবটি আপনার জন্য সেরা সমাধান।\n\nএই প্যাকেজে যা যা পাচ্ছেন:\n\nএকটি শক্তিশালী ৬-ইউএসবি পোর্ট বিশিষ্ট অ্যাডাপ্টার।\n\nএকটি বিশেষ ৩-ইন-১ ফাস্ট চার্জিং কেবিল (লাইটনিং, টাইপ-সি এবং মাইক্রো ইউএসবি)।\n\nমূল বৈশিষ্ট্যসমূহ:\n\n💻 ৬টি ইউএসবি পোর্ট: একসাথে ৬টি পর্যন্ত ডিভাইস চার্জ করার সুবিধা। আপনার স্মার্টফোন, ট্যাবলেট, পাওয়ার ব্যাংক, স্পিকার - সবই এক সাথে চার্জ করুন।\n\n⚡ ৩.১এ হাই-স্পিড আউটপুট: আপনার ডিভাইসগুলোকে দ্রুত এবং কার্যকরভাবে চার্জ করে। (দ্রষ্টব্য: এই অ্যাডাপ্টারটির মোট আউটপুট ৩.১এ)।\n\n🔌 ৩-ইন-১ কেবল: এই একটি কেবলেই আছে লাইটনিং (আইফোনের জন্য), টাইপ-সি (নতুন অ্যান্ড্রয়েডের জন্য) এবং মাইক্রো ইউএসবি (পুরানো ডিভাইসের জন্য) কানেক্টর। তিনটি আলাদা কেবলের ঝামেলা শেষ!\n\n🛡️ স্মার্ট সুরক্ষা: আপনার মূল্যবান ডিভাইসগুলোর নিরাপত্তা নিশ্চিত করতে এতে রয়েছে ওভার-কারেন্ট, ওভার-ভোল্টেজ এবং শর্ট-সার্কিট প্রতিরোধ ব্যবস্থা।\n\n🌐 ইউনিভার্সাল সামঞ্জস্য: প্রায় সব ধরণের স্মার্টফোন, ট্যাবলেট, ডিজিটাল ক্যামেরা এবং অন্যান্য ইউএসবি-চালিত ডিভাইসের সাথে এটি কাজ করে।\n\nকেন এই চার্জারটি কিনবেন?\n\nঅগোছালো তারের ঝামেলা মুক্তি: মাত্র একটি প্লাগ পয়েন্ট ব্যবহার করেই ৬টি ডিভাইস চার্জ দিন।\n\nসময় বাঁচান: সব ডিভাইস একসাথে চার্জ হতে থাকলে আপনার সময় বাঁচে।\n\nভ্রমণের জন্য সেরা: এটি কমপ্যাক্ট এবং হালকা, তাই সহজেই ব্যাগে নিয়ে ঘুরতে পারবেন। সব ধরণের ডিভাইসের তার আলাদাভাবে নিয়ে ঘোরার প্রয়োজন নেই।\n\nএখনই এই দারুণ 6-in-1 চার্জিং হাবটি অর্ডার করুন এবং আপনার চার্জিং লাইফকে সহজ করে তুলুন!",
    "descriptionBn": "আপনার বাসায় বা অফিসে কি অনেকগুলো স্মার্ট ডিভাইস আছে? চার্জিং পোর্ট আর তারের ভিড়ে কি টেবিল অগোছালো হয়ে থাকে? তবে এই 6-in-1 চার্জিং হাবটি আপনার জন্য সেরা সমাধান।\n\nএই প্যাকেজে যা যা পাচ্ছেন:\n\nএকটি শক্তিশালী ৬-ইউএসবি পোর্ট বিশিষ্ট অ্যাডাপ্টার।\n\nএকটি বিশেষ ৩-ইন-১ ফাস্ট চার্জিং কেবিল (লাইটনিং, টাইপ-সি এবং মাইক্রো ইউএসবি)।\n\nমূল বৈশিষ্ট্যসমূহ:\n\n💻 ৬টি ইউএসবি পোর্ট: একসাথে ৬টি পর্যন্ত ডিভাইস চার্জ করার সুবিধা। আপনার স্মার্টফোন, ট্যাবলেট, পাওয়ার ব্যাংক, স্পিকার - সবই এক সাথে চার্জ করুন।\n\n⚡ ৩.১এ হাই-স্পিড আউটপুট: আপনার ডিভাইসগুলোকে দ্রুত এবং কার্যকরভাবে চার্জ করে। (দ্রষ্টব্য: এই অ্যাডাপ্টারটির মোট আউটপুট ৩.১এ)।\n\n🔌 ৩-ইন-১ কেবল: এই একটি কেবলেই আছে লাইটনিং (আইফোনের জন্য), টাইপ-সি (নতুন অ্যান্ড্রয়েডের জন্য) এবং মাইক্রো ইউএসবি (পুরানো ডিভাইসের জন্য) কানেক্টর। তিনটি আলাদা কেবলের ঝামেলা শেষ!\n\n🛡️ স্মার্ট সুরক্ষা: আপনার মূল্যবান ডিভাইসগুলোর নিরাপত্তা নিশ্চিত করতে এতে রয়েছে ওভার-কারেন্ট, ওভার-ভোল্টেজ এবং শর্ট-সার্কিট প্রতিরোধ ব্যবস্থা।\n\n🌐 ইউনিভার্সাল সামঞ্জস্য: প্রায় সব ধরণের স্মার্টফোন, ট্যাবলেট, ডিজিটাল ক্যামেরা এবং অন্যান্য ইউএসবি-চালিত ডিভাইসের সাথে এটি কাজ করে।\n\nকেন এই চার্জারটি কিনবেন?\n\nঅগোছালো তারের ঝামেলা মুক্তি: মাত্র একটি প্লাগ পয়েন্ট ব্যবহার করেই ৬টি ডিভাইস চার্জ দিন।\n\nসময় বাঁচান: সব ডিভাইস একসাথে চার্জ হতে থাকলে আপনার সময় বাঁচে।\n\nভ্রমণের জন্য সেরা: এটি কমপ্যাক্ট এবং হালকা, তাই সহজেই ব্যাগে নিয়ে ঘুরতে পারবেন। সব ধরণের ডিভাইসের তার আলাদাভাবে নিয়ে ঘোরার প্রয়োজন নেই।\n\nএখনই এই দারুণ 6-in-1 চার্জিং হাবটি অর্ডার করুন এবং আপনার চার্জিং লাইফকে সহজ করে তুলুন!",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 174,
    "images": [
      "/uploads/products/mobile-accessories/24/A377UMtH75sVqcO1G1iR597rCMp75p6zZQBAoyYl-1024x1024.jpg",
      "/uploads/products/mobile-accessories/24/EJMFvpgBatxIcBShycXouKGfprDBDOkAFbGwt9wZ-1024x1024.jpg",
      "/uploads/products/mobile-accessories/24/HQ1SloolpD9Ao1RJ9Z0IeJxJRcfilyYntd2Spzi8-1-1024x1024.png",
      "/uploads/products/mobile-accessories/24/HQ1SloolpD9Ao1RJ9Z0IeJxJRcfilyYntd2Spzi8-1024x1024.png",
      "/uploads/products/mobile-accessories/24/I0VyX8uYopIm6BoXgOjt7lpazEROhqXYNmOTs2Y1-1024x1024.jpg",
      "/uploads/products/mobile-accessories/24/IC3T3jBYzgRqiMS8qNDdT0IPFMAlfApaLYlWkwxI-1024x1024.jpg",
      "/uploads/products/mobile-accessories/24/PEBicmoWoHbcLaYh7BL6mF8d3kRWscfd4CLIZ1hV-1024x1024.jpg",
      "/uploads/products/mobile-accessories/24/qqe5yBhDLgTQq7pZYZa6soLcGOv48k8jH4S0zZe2-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-44",
    "slug": "160w-super-fast-multi-port-gan-charger-with-6-in-1-power-delivery-type-c-cable",
    "title": "160W Super Fast Multi-Port GaN Charger with 6-in-1 Power Delivery & Type-C Cable",
    "titleBn": "160W Super Fast Multi-Port GaN Charger with 6-in-1 Power Delivery & Type-C Cable",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 55000,
    "compareAt": 99000,
    "rating": 4.8999999999999995,
    "reviewCount": 43,
    "inStock": true,
    "stockQty": 104,
    "sku": "13090",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-44-1",
        "sku": "13090",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 55000,
        "compareAt": 99000,
        "inStock": true,
        "stockQty": 104
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "160W Super Fast Multi-Port GaN Charger with 6-in-1 Power Delivery & Type-C Cable",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "160W Super Fast Multi-Port GaN Charger with 6-in-1 Power Delivery & Type-C Cable",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনার সব স্মার্ট ডিভাইস এখন চার্জ হবে সুপার ফাস্ট স্পিডে! আমাদের এই 160W Multi Adapter টি আপনার ল্যাপটপ, স্মার্টফোন, ট্যাবলেট এবং অন্যান্য গ্যাজেট চার্জ করার জন্য একটি অল-ইন-ওয়ান সমাধান।\n\nমূল বৈশিষ্ট্যসমূহ:\n\nবিশাল ১৬০ ওয়াট পাওয়ার: এই একটি অ্যাডাপ্টার দিয়েই আপনি একসাথে একাধিক হাই-পাওয়ার ডিভাইস চার্জ করতে পারবেন।\n\n৬টি মাল্টি-পোর্ট সুবিধা: * PD 25W: আইফোন বা স্যামসাংয়ের দ্রুত চার্জিংয়ের জন্য।\n\nQC 3.0: অ্যান্ড্রয়েড ফোনের কুইক চার্জিং সাপোর্ট।\n\nPD 15W (x2): এয়ারপড, স্মার্টওয়াচ বা অন্যান্য ছোট ডিভাইসের জন্য ২টি টাইপ-সি পোর্ট।\n\n3.1A USB (x2): সাধারণ ইউএসবি ক্যাবল দিয়ে চার্জ করার জন্য আরও ২টি পোর্ট।\n\nটাইপ-সি ক্যাবল ফ্রি: বক্সের সাথেই পাচ্ছেন একটি প্রিমিয়াম কোয়ালিটির টাইপ-সি চার্জিং ক্যাবল।\n\nকমপ্যাক্ট ও পোর্টেবল: ছোট সাইজ হওয়ায় এটি ট্রাভেল করার জন্য আদর্শ। একটি অ্যাডাপ্টার থাকলেই আপনার আর আলাদা চার্জার বহন করার প্রয়োজন নেই।\n\nনিরাপত্তা নিশ্চিত: এতে আছে স্মার্ট চিপ প্রোটেকশন, যা আপনার ডিভাইসকে ওভার-হিটিং এবং শর্ট সার্কিট থেকে সুরক্ষিত রাখে।\n\nপ্যাকেজে যা যা থাকছে:\n\n১ x ১৬০ ওয়াট মাল্টি অ্যাডাপ্টার\n\n১ x প্রিমিয়াম টাইপ-সি ক্যাবল\n\nআপনার ব্যস্ত জীবনকে আরও সহজ করতে এবং চার্জিং সমস্যার স্থায়ী সমাধানে আজই সংগ্রহ করুন এই পাওয়ারফুল অ্যাডাপ্টারটি!",
    "descriptionBn": "আপনার সব স্মার্ট ডিভাইস এখন চার্জ হবে সুপার ফাস্ট স্পিডে! আমাদের এই 160W Multi Adapter টি আপনার ল্যাপটপ, স্মার্টফোন, ট্যাবলেট এবং অন্যান্য গ্যাজেট চার্জ করার জন্য একটি অল-ইন-ওয়ান সমাধান।\n\nমূল বৈশিষ্ট্যসমূহ:\n\nবিশাল ১৬০ ওয়াট পাওয়ার: এই একটি অ্যাডাপ্টার দিয়েই আপনি একসাথে একাধিক হাই-পাওয়ার ডিভাইস চার্জ করতে পারবেন।\n\n৬টি মাল্টি-পোর্ট সুবিধা: * PD 25W: আইফোন বা স্যামসাংয়ের দ্রুত চার্জিংয়ের জন্য।\n\nQC 3.0: অ্যান্ড্রয়েড ফোনের কুইক চার্জিং সাপোর্ট।\n\nPD 15W (x2): এয়ারপড, স্মার্টওয়াচ বা অন্যান্য ছোট ডিভাইসের জন্য ২টি টাইপ-সি পোর্ট।\n\n3.1A USB (x2): সাধারণ ইউএসবি ক্যাবল দিয়ে চার্জ করার জন্য আরও ২টি পোর্ট।\n\nটাইপ-সি ক্যাবল ফ্রি: বক্সের সাথেই পাচ্ছেন একটি প্রিমিয়াম কোয়ালিটির টাইপ-সি চার্জিং ক্যাবল।\n\nকমপ্যাক্ট ও পোর্টেবল: ছোট সাইজ হওয়ায় এটি ট্রাভেল করার জন্য আদর্শ। একটি অ্যাডাপ্টার থাকলেই আপনার আর আলাদা চার্জার বহন করার প্রয়োজন নেই।\n\nনিরাপত্তা নিশ্চিত: এতে আছে স্মার্ট চিপ প্রোটেকশন, যা আপনার ডিভাইসকে ওভার-হিটিং এবং শর্ট সার্কিট থেকে সুরক্ষিত রাখে।\n\nপ্যাকেজে যা যা থাকছে:\n\n১ x ১৬০ ওয়াট মাল্টি অ্যাডাপ্টার\n\n১ x প্রিমিয়াম টাইপ-সি ক্যাবল\n\nআপনার ব্যস্ত জীবনকে আরও সহজ করতে এবং চার্জিং সমস্যার স্থায়ী সমাধানে আজই সংগ্রহ করুন এই পাওয়ারফুল অ্যাডাপ্টারটি!",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 221,
    "images": [
      "/uploads/products/mobile-accessories/25/2AfTyr8wNIVPqDj3YP3TvealS86veARQNswcCIUd-1024x1024.jpg",
      "/uploads/products/mobile-accessories/25/bdfUqRTcagCP3R3tZJkjAmSRzuHmSdVGiPsHyiJ4.jpg",
      "/uploads/products/mobile-accessories/25/mXeMbRPXAY85ero1Y8tXB57jJ86R2vGZKF0LkgjX-1024x1024.jpg",
      "/uploads/products/mobile-accessories/25/PAeunhDKIKJ4z5XyH9vNIBS40b3VBRPCmwAKatYd.png"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-45",
    "slug": "plokama-live-k9-pro-1700mm-ultra-long-selfie-stick-with-tripod-stand-ring-light-adjustable-portable-for-mobile-vlogging-live-streaming",
    "title": "Plokama LIVE-K9 Pro 1700mm Ultra Long Selfie Stick with Tripod Stand & Ring Light – Adjustable, Portable for Mobile Vlogging & Live Streaming",
    "titleBn": "Plokama LIVE-K9 Pro 1700mm Ultra Long Selfie Stick with Tripod Stand & Ring Light – Adjustable, Portable for Mobile Vlogging & Live Streaming",
    "brand": "Plokama",
    "brandSlug": "plokama",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 82000,
    "compareAt": 119000,
    "rating": 5,
    "reviewCount": 50,
    "inStock": true,
    "stockQty": 37,
    "sku": "13259",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "plokama",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-45-1",
        "sku": "13259",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 82000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 37
      }
    ],
    "highlights": [
      "Combination Material: iron & Plastic"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Combination Material": "iron & Plastic"
    },
    "specificationsBn": {
      "মডেল": "Plokama LIVE-K9 Pro 1700mm Ultra Long Selfie Stick with Tripod Stand & Ring Light – Adjustable, Portable for Mobile Vlogging & Live Streaming",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Maximum Length 170cm (1.7Meter) 5.6 feet\n\nLength When folded 30cm\n\nMax Remote Distance 10Meters\n\nCan Be Portrait and Landscape",
    "descriptionBn": "Maximum Length 170cm (1.7Meter) 5.6 feet\n\nLength When folded 30cm\n\nMax Remote Distance 10Meters\n\nCan Be Portrait and Landscape",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 268,
    "images": [
      "/uploads/products/mobile-accessories/3/Cs9kpUntARHJ3HM0mJQTVvgpqa4TdwgXV0uxjPPe-1.webp",
      "/uploads/products/mobile-accessories/3/Cs9kpUntARHJ3HM0mJQTVvgpqa4TdwgXV0uxjPPe.webp",
      "/uploads/products/mobile-accessories/3/ef9enJzFm4Le7qV2qQ1MGxUUzBzZvy10dnPKQhRc-1002x1024.jpg",
      "/uploads/products/mobile-accessories/3/LU5cRte34hhgO8ZplGYVIxyZtKrncdKzDuQROOag-768x1024.jpg",
      "/uploads/products/mobile-accessories/3/VeV9f9RZivk1lbuEJgQz13RFi7mWAsO8lSBDkZvI.webp",
      "/uploads/products/mobile-accessories/3/yQVTwBhmBcx44tZPE5G9imjsKB7JV6dv3TVsTo6G.webp"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-46",
    "slug": "newrixing-nr-9908-portable-bluetooth-speaker-with-rgb-light",
    "title": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
    "titleBn": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
    "brand": "NewRixing",
    "brandSlug": "newrixing",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 79000,
    "compareAt": 119000,
    "rating": 4.8,
    "reviewCount": 12,
    "inStock": true,
    "stockQty": 50,
    "sku": "13254",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "newrixing",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-46-1",
        "sku": "13254",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 79000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 50
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light\n\nস্পিকারগুলোর ওপরের অংশে একটি আকর্ষণীয় RGB লাইট প্যানেল রয়েছে, যা গান বাজার সময় চমৎকার লাইটিং ইফেক্ট দেয়।\n\nএতে রয়েছে Bluetooth v5.3 প্রযুক্তি, যা দেবে ১০ মিটার পর্যন্ত একদম নিরবচ্ছিন্ন ও দ্রুত কানেক্টিভিটি।\n\nব্লুটুথ ছাড়াও এটি সরাসরি মেমোরি কার্ড (TF Card) সাপোর্ট করে, যাতে MP3 ফরম্যাটের গান অনায়াসেই বাজানো যায়।\n\nকমপ্যাক্ট সাইজ এবং সাথে থাকা টেকসই হ্যান্ডেল স্ট্র্যাপের কারণে এটি ট্রাভেল, আউটডোর বা যেকোনো পার্টিতে সহজে বহন করা যায়।\n\n📦 বক্সে যা যা থাকছে:\n\n১টি NewRixing NR-9908 স্পিকার\n\n১টি চার্জিং ক্যাবল\n\nইউজার ম্যানুয়াল",
    "descriptionBn": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light\n\nস্পিকারগুলোর ওপরের অংশে একটি আকর্ষণীয় RGB লাইট প্যানেল রয়েছে, যা গান বাজার সময় চমৎকার লাইটিং ইফেক্ট দেয়।\n\nএতে রয়েছে Bluetooth v5.3 প্রযুক্তি, যা দেবে ১০ মিটার পর্যন্ত একদম নিরবচ্ছিন্ন ও দ্রুত কানেক্টিভিটি।\n\nব্লুটুথ ছাড়াও এটি সরাসরি মেমোরি কার্ড (TF Card) সাপোর্ট করে, যাতে MP3 ফরম্যাটের গান অনায়াসেই বাজানো যায়।\n\nকমপ্যাক্ট সাইজ এবং সাথে থাকা টেকসই হ্যান্ডেল স্ট্র্যাপের কারণে এটি ট্রাভেল, আউটডোর বা যেকোনো পার্টিতে সহজে বহন করা যায়।\n\n📦 বক্সে যা যা থাকছে:\n\n১টি NewRixing NR-9908 স্পিকার\n\n১টি চার্জিং ক্যাবল\n\nইউজার ম্যানুয়াল",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": true,
    "colorHue": 315,
    "images": [
      "/uploads/products/mobile-accessories/4/4s5EFSfxMwn4iv6iKUfaeeYsfbQ5WokeNu5F4RuB-1024x1024.jpg",
      "/uploads/products/mobile-accessories/4/FQr39rmfrWVAkURlTXRahszs5pkpGT0cg6xlYAk6-1-1024x1024.jpg",
      "/uploads/products/mobile-accessories/4/FQr39rmfrWVAkURlTXRahszs5pkpGT0cg6xlYAk6-1024x1024.jpg",
      "/uploads/products/mobile-accessories/4/hyxm8SaLu42kflnXHdqJxomhFqiO6TIo5ehsBHxp-1024x1024.jpg",
      "/uploads/products/mobile-accessories/4/S4RsnyeRkxJc0yc1ZeXkrNh2SqBnln23weQfH9Kp-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-47",
    "slug": "mk500-5-in-1-mobile-game-combo-pack-1",
    "title": "MK500 5-in-1 Mobile Game Combo Pack",
    "titleBn": "MK500 5-in-1 Mobile Game Combo Pack",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 125000,
    "compareAt": 180000,
    "rating": 4.8999999999999995,
    "reviewCount": 19,
    "inStock": true,
    "stockQty": 63,
    "sku": "2168-MOB",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-47-1",
        "sku": "2168-MOB",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 125000,
        "compareAt": 180000,
        "inStock": true,
        "stockQty": 63
      }
    ],
    "highlights": [
      "Layout: 35 keys, one-handed",
      "Backlight: 8-color RGB",
      "Keycaps: Two-color injection",
      "Features: Anti-ghosting, fringe decoration, ergonomic soft wrist support",
      "Material: Durable ABS plastic"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "MK500",
      "Layout": "35 keys, one-handed",
      "Backlight": "8-color RGB",
      "Keycaps": "Two-color injection",
      "Features": "No lag, full pressure support, scroll zoom compatibility",
      "Material": "Durable ABS plastic",
      "Compatibility": "Android, iOS, Windows, macOS",
      "Type": "Optical",
      "Design": "Ergonomic, non-slip grip",
      "Lights": "Colorful breathing effect",
      "DPI": "Adjustable sensitivity",
      "Click Lifespan": "Up to 5 million clicks",
      "Connection": "Bluetooth 4.2",
      "Size": "11.5 × 11.5 × 4 cm",
      "Function": "Secure wireless pairing with Android/iOS",
      "Mechanical Keyboard Experience": "Enjoy rapid response and tactile feedback from a 35-key layout built for high-action gameplay.",
      "RGB Backlighting": "8 stunning backlight colors enhance immersion and match your gaming environment.",
      "Ergonomic Comfort": "Built-in wrist support with a curved surface design minimizes fatigue during long sessions.",
      "Anti-Ghosting Keys": "Press multiple keys simultaneously without any input conflict—perfect for high-speed actions.",
      "High-Performance Mouse": "Optical sensor with smooth tracking and fast click response ensures better aim and control.",
      "Lag-Free Wireless Connectivity": "Bluetooth 4.2 converter guarantees stable, secure, and low-latency performance.",
      "Universal Compatibility": "Works seamlessly with Android, iOS, Windows, and other major platforms.",
      "Portable & Plug-and-Play": "Compact design, no drivers needed—ideal for gamers on the move.",
      "All-in-One Convenience": "No need to buy separate accessories. Get a keyboard, mouse, converter, and holder in one value-packed set.",
      "Built for Mobile Gaming": "Specially optimized for popular games like PUBG, Free Fire, Call of Duty Mobile, and more.",
      "Gaming-Level Performance": "From key response to sensor precision, everything is designed to enhance your reaction speed.",
      "Safe & Secure Use": "The converter connects without risking your game ID or permissions—a reliable choice for competitive players.",
      "Affordable Yet Premium": "Offers a balance of price and performance, making it an ideal combo for both beginners and pro gamers."
    },
    "specificationsBn": {
      "মডেল": "MK500 5-in-1 Mobile Game Combo Pack",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Key Specifications of the 5-in-1 Mobile Gaming Combo\n\nKeyboard:\n\nMouse:\n\nConverter:\n\nPackage Includes:\n\n1 x Gaming Keyboard\n\n1 x Gaming Mouse\n\n1 x Bluetooth Converter\n\n1 x USB Cable\n\n1 x Phone Holder\n\nKey Features:\n\nWhy Purchase the MK500 Combo?\n\nfor PUBG for Call of duty for Knives Out for The Terminator for CrossFire for Free Fire for Genshin Impact for Mine Craft for Sausage Man for Arena Breakout for Last Day Rules: Survival for Apex Legends for Earth: Revival",
    "descriptionBn": "Key Specifications of the 5-in-1 Mobile Gaming Combo\n\nKeyboard:\n\nMouse:\n\nConverter:\n\nPackage Includes:\n\n1 x Gaming Keyboard\n\n1 x Gaming Mouse\n\n1 x Bluetooth Converter\n\n1 x USB Cable\n\n1 x Phone Holder\n\nKey Features:\n\nWhy Purchase the MK500 Combo?\n\nfor PUBG for Call of duty for Knives Out for The Terminator for CrossFire for Free Fire for Genshin Impact for Mine Craft for Sausage Man for Arena Breakout for Last Day Rules: Survival for Apex Legends for Earth: Revival",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 2,
    "images": [
      "/uploads/products/mobile-accessories/5/5-in-1-Gaming-Keyboard-and-Mouse-Combo-MK500-Price-in-Bangladesh-1.png",
      "/uploads/products/mobile-accessories/5/7ab0d7fc71e7e36d413ec6e1b03e1bb9.jpg_2200x2200q80.jpg_.webp",
      "/uploads/products/mobile-accessories/5/product_1782742948_5521.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-48",
    "slug": "ven-dens-vd-pb058-power-bank-original-10000-mah",
    "title": "Ven-Dens VD-PB058 Power Bank ( Original ) 10000 Mah",
    "titleBn": "Ven-Dens VD-PB058 Power Bank ( Original ) 10000 Mah",
    "brand": "VEN-DENS",
    "brandSlug": "ven-dens",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 60000,
    "compareAt": 120000,
    "rating": 5,
    "reviewCount": 26,
    "inStock": true,
    "stockQty": 76,
    "sku": "2131",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "ven-dens",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-48-1",
        "sku": "2131",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 60000,
        "compareAt": 120000,
        "inStock": true,
        "stockQty": 76
      }
    ],
    "highlights": [
      "Micro Input: 5V / 2A",
      "Type-C Input: 5V / 2A",
      "USB Output: 5V / 2A"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Micro Input": "5V / 2A",
      "Type-C Input": "5V / 2A",
      "USB Output": "5V / 2A"
    },
    "specificationsBn": {
      "মডেল": "Ven-Dens VD-PB058 Power Bank ( Original ) 10000 Mah",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "❓ পাওয়ার ব্যাংক চার্জ করার ইনপুট অপশন কী কী?\n\nএই পাওয়ার ব্যাংকটি চার্জ করার জন্য নিচের ইনপুট ব্যবহার করা যায়ঃ\n\nUSB (Cable) Input: 5V / 2A\n\n❓ আউটপুট চার্জিং স্পেসিফিকেশন কী?\n\nডিভাইস চার্জ করার জন্য এর আউটপুট হলোঃ\n\nMicro / Type-C / Lightning Cable Output: 5V / 2A\n\nএটি নিরাপদ ও স্থির চার্জিং নিশ্চিত করে।\n\n❓ এতে কি বিল্ট-ইন ক্যাবল আছে?\n\nহ্যাঁ, এই পাওয়ার ব্যাংকে বিল্ট-ইন চার্জিং ক্যাবল রয়েছে, তাই আলাদা করে ক্যাবল নেওয়ার প্রয়োজন নেই।\n\n❓ এটি কি সহজে বহন করা যায়?\n\nহ্যাঁ, এটি ছোট, হালকা এবং পোর্টেবল ডিজাইনের হওয়ায় সহজে ব্যাগ বা পকেটে রাখা যায়। ভ্রমণ বা দৈনন্দিন ব্যবহারের জন্য খুবই সুবিধাজনক।",
    "descriptionBn": "❓ পাওয়ার ব্যাংক চার্জ করার ইনপুট অপশন কী কী?\n\nএই পাওয়ার ব্যাংকটি চার্জ করার জন্য নিচের ইনপুট ব্যবহার করা যায়ঃ\n\nUSB (Cable) Input: 5V / 2A\n\n❓ আউটপুট চার্জিং স্পেসিফিকেশন কী?\n\nডিভাইস চার্জ করার জন্য এর আউটপুট হলোঃ\n\nMicro / Type-C / Lightning Cable Output: 5V / 2A\n\nএটি নিরাপদ ও স্থির চার্জিং নিশ্চিত করে।\n\n❓ এতে কি বিল্ট-ইন ক্যাবল আছে?\n\nহ্যাঁ, এই পাওয়ার ব্যাংকে বিল্ট-ইন চার্জিং ক্যাবল রয়েছে, তাই আলাদা করে ক্যাবল নেওয়ার প্রয়োজন নেই।\n\n❓ এটি কি সহজে বহন করা যায়?\n\nহ্যাঁ, এটি ছোট, হালকা এবং পোর্টেবল ডিজাইনের হওয়ায় সহজে ব্যাগ বা পকেটে রাখা যায়। ভ্রমণ বা দৈনন্দিন ব্যবহারের জন্য খুবই সুবিধাজনক।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 49,
    "images": [
      "/uploads/products/mobile-accessories/6/product_1782111489_7380-768x1024.jpg",
      "/uploads/products/mobile-accessories/6/product_1782111604_4110.jpg",
      "/uploads/products/mobile-accessories/6/product_1782111604_8875.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-49",
    "slug": "smart-fast-charge-power-bank-10000mah-multi-cable-built-in-1",
    "title": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
    "titleBn": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 80000,
    "compareAt": 120000,
    "rating": 4.8,
    "reviewCount": 33,
    "inStock": true,
    "stockQty": 89,
    "sku": "13165-MOB",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-49-1",
        "sku": "13165-MOB",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 80000,
        "compareAt": 120000,
        "inStock": true,
        "stockQty": 89
      }
    ],
    "highlights": [
      "10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা",
      "Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ",
      "Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট",
      "Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন",
      "Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য",
      "Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Smart Fast Charge Power Bank (10000mAh, Multi Cable Built-in)",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনার দৈনন্দিন জীবনের জন্য পারফেক্ট পাওয়ার সল্যুশন! এই Smart Power Bank (10000mAh) একসাথে স্টাইলিশ, শক্তিশালী এবং অত্যন্ত সুবিধাজনক। যেখানেই যান, আপনার ডিভাইস থাকবে সবসময় চার্জড 🔌\n\n✨ মূল বৈশিষ্ট্যসমূহঃ\n\n✅ 10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা\n\n✅ Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ\n\n✅ Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট\n\n✅ Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন\n\n✅ Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য\n\n✅ Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন\n\n🔌 Supported Devices:\n\nAndroid Smartphone\n\niPhone\n\nTablet\n\nঅন্যান্য USB ডিভাইস\n\n💡 কেন এই পাওয়ার ব্যাংকটি নেবেন?\n\nআলাদা ক্যাবল বহন করার ঝামেলা নেই\n\nট্রাভেল ও আউটডোর ব্যবহারের জন্য পারফেক্ট\n\nএকাধিক ডিভাইস একসাথে চার্জ করার সুবিধা\n\nবড় ব্যাটারি ক্যাপাসিটি, দীর্ঘস্থায়ী পারফরম্যান্স",
    "descriptionBn": "আপনার দৈনন্দিন জীবনের জন্য পারফেক্ট পাওয়ার সল্যুশন! এই Smart Power Bank (10000mAh) একসাথে স্টাইলিশ, শক্তিশালী এবং অত্যন্ত সুবিধাজনক। যেখানেই যান, আপনার ডিভাইস থাকবে সবসময় চার্জড 🔌\n\n✨ মূল বৈশিষ্ট্যসমূহঃ\n\n✅ 10000mAh Large Capacity – দীর্ঘ সময় ব্যাকআপ, একাধিকবার ফোন চার্জ করার সুবিধা\n\n✅ Fast Charging Technology – দ্রুত সময়ে ডিভাইস চার্জ\n\n✅ Built-in Multiple Cables – Micro, Type-C, Lightning ও USB সাপোর্ট\n\n✅ Advanced Protection System – ওভারচার্জ, শর্ট সার্কিট ও হিট প্রোটেকশন\n\n✅ Premium Design – স্টাইলিশ ও কমপ্যাক্ট, সহজে বহনযোগ্য\n\n✅ Comfortable Grip – হাতে ধরতে আরামদায়ক ডিজাইন\n\n🔌 Supported Devices:\n\nAndroid Smartphone\n\niPhone\n\nTablet\n\nঅন্যান্য USB ডিভাইস\n\n💡 কেন এই পাওয়ার ব্যাংকটি নেবেন?\n\nআলাদা ক্যাবল বহন করার ঝামেলা নেই\n\nট্রাভেল ও আউটডোর ব্যবহারের জন্য পারফেক্ট\n\nএকাধিক ডিভাইস একসাথে চার্জ করার সুবিধা\n\nবড় ব্যাটারি ক্যাপাসিটি, দীর্ঘস্থায়ী পারফরম্যান্স",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 96,
    "images": [
      "/uploads/products/mobile-accessories/7/MeMaR77Mb0RW8Mhg4t451J6seOyzm3LoZuCcfY8k-1024x1024.png",
      "/uploads/products/mobile-accessories/7/VEZMxZ9zTwi3KM8IORTYQ2ymoQweUCpEYr7bru3G-1024x1024.jpg",
      "/uploads/products/mobile-accessories/7/WqjXgdjKg9QDWc99CcEuAGpJZhH4K9ZpvUvaE9Et-1024x1024.jpg",
      "/uploads/products/mobile-accessories/7/x1K8McFIjAF3kBjzYyd8gQaoxQqIiufwq4zTd1k0-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-50",
    "slug": "baseus-adaman-metal-digital-display-quick-charge-power-bank-original-20000-mah",
    "title": "Baseus Adaman Metal Digital Display Quick Charge Power Bank ( Original 20000 Mah )",
    "titleBn": "Baseus Adaman Metal Digital Display Quick Charge Power Bank ( Original 20000 Mah )",
    "brand": "Baseus",
    "brandSlug": "baseus",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 165000,
    "compareAt": 245000,
    "rating": 4.8999999999999995,
    "reviewCount": 40,
    "inStock": true,
    "stockQty": 102,
    "sku": "2132",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "baseus",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-50-1",
        "sku": "2132",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 165000,
        "compareAt": 245000,
        "inStock": true,
        "stockQty": 102
      }
    ],
    "highlights": [
      "Brand: Baseus",
      "Name: Power Bank",
      "Battery capacity: 20000mAh/3.7V 74Wh",
      "Rated capacity: 12000mAh",
      "Energy conversion rate: ≥ 75%"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "Baseus",
      "Name": "Power Bank",
      "Model": "PPADMA",
      "Battery capacity": "20000mAh/3.7V 74Wh",
      "Rated capacity": "12000mAh",
      "Energy conversion rate": "≥ 75%",
      "InputiP": "5V 2A,9V 2A Max.",
      "Micro": "5V 2A,9V 2A Max.",
      "Type-C": "5V 3A,9V 2A,12V 1.5A Max.",
      "USB1": "4.5V 5A,5V 4.5A,5V 3A,9V 2A,12V 1.5A Max.",
      "USB2": "4.5V 5A,5V 4.5A,5V 3A,9V 2A,12V 1.5A Max.",
      "package content": "Power Bank, manuals"
    },
    "specificationsBn": {
      "মডেল": "Baseus Adaman Metal Digital Display Quick Charge Power Bank ( Original 20000 Mah )",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Baseus Power Bank 22.5w 20000Mah Specification:\n\nBaseus Adaman Metal Digital Display Quick Charge Power Bank 20000mAh 22.5W 2021 Editon Black PPAD000101\n\nOutput\n\nUSB1+USB2: 5V 3A Max.\n\nUSB1+Type-C: 5V 3A Max.\n\nUSB2+Type-C: 5V 3A Max.\n\nType-C+USB1+USB2 Total output power：5V 3A Max.",
    "descriptionBn": "Baseus Power Bank 22.5w 20000Mah Specification:\n\nBaseus Adaman Metal Digital Display Quick Charge Power Bank 20000mAh 22.5W 2021 Editon Black PPAD000101\n\nOutput\n\nUSB1+USB2: 5V 3A Max.\n\nUSB1+Type-C: 5V 3A Max.\n\nUSB2+Type-C: 5V 3A Max.\n\nType-C+USB1+USB2 Total output power：5V 3A Max.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 143,
    "images": [
      "/uploads/products/mobile-accessories/8/product_1782111914_2660-1024x1024.jpg",
      "/uploads/products/mobile-accessories/8/product_1782111914_8070.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-51",
    "slug": "ven-dens-vd-pb063-ultra-high-capacity-power-bank",
    "title": "VEN-DENS VD-PB063 Ultra-High Capacity Power Bank",
    "titleBn": "VEN-DENS VD-PB063 Ultra-High Capacity Power Bank",
    "brand": "VEN-DENS",
    "brandSlug": "ven-dens",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-accessories",
    "categorySlug": "mobile-accessories",
    "categoryName": "Mobile Accessories",
    "categoryNameBn": "মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক",
    "price": 225000,
    "compareAt": 300000,
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "stockQty": 35,
    "sku": "2173",
    "tags": [
      "gadgets",
      "mobile-accessories",
      "ven-dens",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-51-1",
        "sku": "2173",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 225000,
        "compareAt": 300000,
        "inStock": true,
        "stockQty": 35
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "VEN-DENS VD-PB063 Ultra-High Capacity Power Bank",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "VEN-DENS VD-PB063 Ultra-High Capacity Power Bank",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Large 50000mAh battery capacity for extended backup\n\nFast charging support for quick power delivery\n\nMultiple output ports including USB, Type-C, and Lightning\n\nCharge multiple devices simultaneously\n\nBuilt-in cables for added convenience\n\nOverheating protection for safe usage\n\nCompatible with all smartphones and devices\n\nPortable and stylish design for easy carrying\n\nAdvanced safety system to protect your devices",
    "descriptionBn": "Large 50000mAh battery capacity for extended backup\n\nFast charging support for quick power delivery\n\nMultiple output ports including USB, Type-C, and Lightning\n\nCharge multiple devices simultaneously\n\nBuilt-in cables for added convenience\n\nOverheating protection for safe usage\n\nCompatible with all smartphones and devices\n\nPortable and stylish design for easy carrying\n\nAdvanced safety system to protect your devices",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 190,
    "images": [
      "/uploads/products/mobile-accessories/9/product_1782805166_2305.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-52",
    "slug": "max-21-ultra-maxtel-mobile-phone-black",
    "title": "Max 21 ultra Maxtel Mobile Phone - Black",
    "titleBn": "Max 21 ultra Maxtel Mobile Phone - Black",
    "brand": "Max",
    "brandSlug": "maxtel",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 179000,
    "compareAt": 245000,
    "rating": 4.8,
    "reviewCount": 54,
    "inStock": true,
    "stockQty": 48,
    "sku": "1818",
    "tags": [
      "gadgets",
      "mobile-phone",
      "maxtel",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-52-1",
        "sku": "1818",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 179000,
        "compareAt": 245000,
        "inStock": true,
        "stockQty": 48
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Max 21 ultra Maxtel Mobile Phone - Black",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Max 21 ultra Maxtel Mobile Phone - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "This Maxtel Max-21 Ultra is a button mobile phone that comes with a 2.0-inch display that offers a wide visual experience. It offers dual SIM slots that give 2G connectivity, and it is made with high-quality material that gives a durable performance for a long time. Also, it has a big 3000mAh Rechargeable Battery that gives long-lasting battery life, making it a suitable choice for your everyday use.",
    "descriptionBn": "This Maxtel Max-21 Ultra is a button mobile phone that comes with a 2.0-inch display that offers a wide visual experience. It offers dual SIM slots that give 2G connectivity, and it is made with high-quality material that gives a durable performance for a long time. Also, it has a big 3000mAh Rechargeable Battery that gives long-lasting battery life, making it a suitable choice for your everyday use.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 237,
    "images": [
      "/uploads/products/mobile-phone/1/product_1775307472_3974-1024x1024.jpg",
      "/uploads/products/mobile-phone/1/product_1775307472_5584-1024x1024.jpg",
      "/uploads/products/mobile-phone/1/product_1775307472_9938-1024x1024.jpg",
      "/uploads/products/mobile-phone/1/product_1782306073_3228.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-53",
    "slug": "winstar-w57-mobile-dual-sim-blue",
    "title": "Winstar W57 Mobile – Dual SIM - Blue",
    "titleBn": "Winstar W57 Mobile – Dual SIM - Blue",
    "brand": "Winstar",
    "brandSlug": "winstar",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 135000,
    "compareAt": 185000,
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "stockQty": 61,
    "sku": "1910",
    "tags": [
      "gadgets",
      "mobile-phone",
      "winstar",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-53-1",
        "sku": "1910",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 135000,
        "compareAt": 185000,
        "inStock": true,
        "stockQty": 61
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Winstar W57 Mobile – Dual SIM - Blue",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Winstar W57 Mobile – Dual SIM - Blue",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Winstar W57 Mobile – Dual SIM\n\nবড় ব্যাটারি | ডাবল টর্চ | নির্ভরযোগ্য সেকেন্ডারি ফোন\n\nসহজ ব্যবহার, শক্ত ব্যাটারি আর ক্লাসিক ডিজাইন—সবকিছু এক ফোনেই চাইলে Winstar W57 হতে পারে আপনার সেরা পছন্দ!\n\nমূল বৈশিষ্ট্যসমূহ:\n\n২.০ ইঞ্চি কালার ডিসপ্লে\n\n২৫০০ mAh বড় ব্যাটারি – দীর্ঘক্ষণ চার্জ ব্যাকআপ ফোনের উপরে ২টি শক্তিশালী বড় টর্চলাইট\n\nDual SIM সাপোর্ট\n\nমেমোরি কার্ড সাপোর্ট (৩২GB পর্যন্ত)\n\nপ্রিমিয়াম লুকের ক্যামেরা মডিউল ডিজাইন লাউড স্পিকার – পরিষ্কার ও জোরালো সাউন্ড\n\nFM রেডিও সাপোর্ট\n\nকেন কিনবেন?\n\nলম্বা সময় চার্জ থাকে – বারবার চার্জের ঝামেলা নেই গ্রাম, শহর, ভ্রমণ বা জরুরি ব্যবহারের জন্য আদর্শ\n\nটর্চলাইট ও লাউড স্পিকারের কারণে বেশি কার্যকর\n\nসেকেন্ডারি ফোন হিসেবে চমৎকার অপশন",
    "descriptionBn": "Winstar W57 Mobile – Dual SIM\n\nবড় ব্যাটারি | ডাবল টর্চ | নির্ভরযোগ্য সেকেন্ডারি ফোন\n\nসহজ ব্যবহার, শক্ত ব্যাটারি আর ক্লাসিক ডিজাইন—সবকিছু এক ফোনেই চাইলে Winstar W57 হতে পারে আপনার সেরা পছন্দ!\n\nমূল বৈশিষ্ট্যসমূহ:\n\n২.০ ইঞ্চি কালার ডিসপ্লে\n\n২৫০০ mAh বড় ব্যাটারি – দীর্ঘক্ষণ চার্জ ব্যাকআপ ফোনের উপরে ২টি শক্তিশালী বড় টর্চলাইট\n\nDual SIM সাপোর্ট\n\nমেমোরি কার্ড সাপোর্ট (৩২GB পর্যন্ত)\n\nপ্রিমিয়াম লুকের ক্যামেরা মডিউল ডিজাইন লাউড স্পিকার – পরিষ্কার ও জোরালো সাউন্ড\n\nFM রেডিও সাপোর্ট\n\nকেন কিনবেন?\n\nলম্বা সময় চার্জ থাকে – বারবার চার্জের ঝামেলা নেই গ্রাম, শহর, ভ্রমণ বা জরুরি ব্যবহারের জন্য আদর্শ\n\nটর্চলাইট ও লাউড স্পিকারের কারণে বেশি কার্যকর\n\nসেকেন্ডারি ফোন হিসেবে চমৎকার অপশন",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 284,
    "images": [
      "/uploads/products/mobile-phone/2/product_1777264839_1776.jpg",
      "/uploads/products/mobile-phone/2/product_1777264839_6368.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-54",
    "slug": "sanee-s113-dual-sim-stylish-button-phone-black",
    "title": "Sanee S113 Dual Sim Stylish Button Phone - Black",
    "titleBn": "Sanee S113 Dual Sim Stylish Button Phone - Black",
    "brand": "Sanee",
    "brandSlug": "sanee",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 115000,
    "compareAt": 165000,
    "rating": 5,
    "reviewCount": 23,
    "inStock": true,
    "stockQty": 74,
    "sku": "1911",
    "tags": [
      "gadgets",
      "mobile-phone",
      "sanee",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-54-1",
        "sku": "1911",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 115000,
        "compareAt": 165000,
        "inStock": true,
        "stockQty": 74
      }
    ],
    "highlights": [
      "SIM: Dual Sim (Regular)",
      "Internal Storage: 32 MB RAM + 32 MB ROM",
      "Camera: 0.08 Megapixel",
      "Brand: SANEE Mobile",
      "SIM: Dual Sim (Regular)"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "SIM": "Dual Sim (Regular)",
      "Internal Storage": "32 MB RAM + 32 MB ROM",
      "Camera": "0.08 Megapixel",
      "Brand": "SANEE Mobile",
      "Model": "S113",
      "Color": "Black,Past"
    },
    "specificationsBn": {
      "মডেল": "Sanee S113 Dual Sim Stylish Button Phone - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Product details of\n\n1.44\" QVGA LCD Display.\n\nLong Standby 1000mah Li-on Big Battery.\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\n3D (super loud) speaker.\n\nDigital Camera .\n\nDual Torch LED Light.\n\nSANEE S113 Dual Sim Phone With Warranty\n\n1.44\" QVGA LCD Display.\n\nLong Standby 1000mah Li-on Big Battery.\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\n3D (super loud) speaker.\n\nDigital Camera .\n\nDual Torch LED Light.\n\nMusic Player + Video Player+\n\nWireless FM Radio.\n\nBluetooth.Games.\n\n1000 Phone Book number save\n\nMade in Bangladesh.\n\nBrand Warranty 1 Years.\n\nWhat's The Box :\n\n1 SANEE S113 Dual Sim Phone\n\n1 Charger Cable\n\n1 Warranty Card",
    "descriptionBn": "Product details of\n\n1.44\" QVGA LCD Display.\n\nLong Standby 1000mah Li-on Big Battery.\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\n3D (super loud) speaker.\n\nDigital Camera .\n\nDual Torch LED Light.\n\nSANEE S113 Dual Sim Phone With Warranty\n\n1.44\" QVGA LCD Display.\n\nLong Standby 1000mah Li-on Big Battery.\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\n3D (super loud) speaker.\n\nDigital Camera .\n\nDual Torch LED Light.\n\nMusic Player + Video Player+\n\nWireless FM Radio.\n\nBluetooth.Games.\n\n1000 Phone Book number save\n\nMade in Bangladesh.\n\nBrand Warranty 1 Years.\n\nWhat's The Box :\n\n1 SANEE S113 Dual Sim Phone\n\n1 Charger Cable\n\n1 Warranty Card",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 331,
    "images": [
      "/uploads/products/mobile-phone/3/product_1777265579_2388.jpg",
      "/uploads/products/mobile-phone/3/product_1777265579_2707-1024x662.jpg",
      "/uploads/products/mobile-phone/3/product_1777265579_6891.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-55",
    "slug": "icon-mobile-i202-compact-feature-phone-black",
    "title": "iCon Mobile i202, Compact Feature Phone - Black",
    "titleBn": "iCon Mobile i202, Compact Feature Phone - Black",
    "brand": "iCon",
    "brandSlug": "icon",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 220000,
    "compareAt": 275000,
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "stockQty": 87,
    "sku": "1912",
    "tags": [
      "gadgets",
      "mobile-phone",
      "icon",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-55-1",
        "sku": "1912",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 220000,
        "compareAt": 275000,
        "inStock": true,
        "stockQty": 87
      }
    ],
    "highlights": [
      "Brand: icon",
      "Display: 1.39 inch LCD Display",
      "SIM: Dual Sim",
      "Internal Storage: 32 MB RAM + 32 MB ROM",
      "Bluetooth: YEs"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "icon",
      "Model": "i202 Magic",
      "Display": "1.39 inch LCD Display",
      "SIM": "Dual Sim",
      "Internal Storage": "32 MB RAM + 32 MB ROM",
      "Bluetooth": "YEs",
      "Camera": "0.08 Megapixel"
    },
    "specificationsBn": {
      "মডেল": "iCon Mobile i202, Compact Feature Phone - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "icon i202 Magic Phone Dual Sim With Cover\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\nDigital Camera\n\nDual Torch LED Light.\n\nMusic Player + Video Player+\n\nLong Standby 1050mah Battery.\n\nWireless FM Radio.\n\nBluetooth.Games.\n\nPower Saving mode\n\nOne Year Company Service Warranty\n\nWhat's The Box :\n\n1x icon i202 Magic Phone Dual Sim With Cover\n\n1x Type-C Charger Cable\n\n1X Silicon Cover\n\n1x Warranty Card",
    "descriptionBn": "icon i202 Magic Phone Dual Sim With Cover\n\nMemory Card Micro SD upto 32 GB Supported.\n\nAuto call Record\n\nDigital Camera\n\nDual Torch LED Light.\n\nMusic Player + Video Player+\n\nLong Standby 1050mah Battery.\n\nWireless FM Radio.\n\nBluetooth.Games.\n\nPower Saving mode\n\nOne Year Company Service Warranty\n\nWhat's The Box :\n\n1x icon i202 Magic Phone Dual Sim With Cover\n\n1x Type-C Charger Cable\n\n1X Silicon Cover\n\n1x Warranty Card",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 18,
    "images": [
      "/uploads/products/mobile-phone/4/product_1777265952_3414.jpg",
      "/uploads/products/mobile-phone/4/product_1777265952_7990.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-56",
    "slug": "vmax-v51-mini-phone-black",
    "title": "Vmax V51 Mini Phone - Black",
    "titleBn": "Vmax V51 Mini Phone - Black",
    "brand": "Vmax",
    "brandSlug": "vmax",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 90000,
    "compareAt": 125000,
    "rating": 4.8999999999999995,
    "reviewCount": 37,
    "inStock": true,
    "stockQty": 100,
    "sku": "1914",
    "tags": [
      "gadgets",
      "mobile-phone",
      "vmax",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-56-1",
        "sku": "1914",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 90000,
        "compareAt": 125000,
        "inStock": true,
        "stockQty": 100
      }
    ],
    "highlights": [
      "Brand: Vmax",
      "Display: 0.66-inch LCD Screen",
      "language: Bangla, English"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "Vmax",
      "Model": "V51",
      "Display": "0.66-inch LCD Screen",
      "language": "Bangla, English"
    },
    "specificationsBn": {
      "মডেল": "Vmax V51 Mini Phone - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Vmax V51 Mini Phone Dual Sim\n\nMagic Voice, Auto Call Recorder\n\nAudio, Sound Recorder\n\nDual Sim\n\nBluetooth Dialer\n\nAuto Call Record Option\n\nMemory card supported 32GB\n\nHigh Energy 1000mAh Polymer Battery\n\nStandby 1 to 2 days\n\nMicro SIM Slot Dual Sim Stand BY\n\nOne Year Service Warranty\n\nWhat's The Box :\n\n1 Vmax V51 Mini Phone Dual Sim Yellow\n\n1 Charger Cable\n\n1 Warranty Card",
    "descriptionBn": "Vmax V51 Mini Phone Dual Sim\n\nMagic Voice, Auto Call Recorder\n\nAudio, Sound Recorder\n\nDual Sim\n\nBluetooth Dialer\n\nAuto Call Record Option\n\nMemory card supported 32GB\n\nHigh Energy 1000mAh Polymer Battery\n\nStandby 1 to 2 days\n\nMicro SIM Slot Dual Sim Stand BY\n\nOne Year Service Warranty\n\nWhat's The Box :\n\n1 Vmax V51 Mini Phone Dual Sim Yellow\n\n1 Charger Cable\n\n1 Warranty Card",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 65,
    "images": [
      "/uploads/products/mobile-phone/5/product_1777266977_1590.jpg",
      "/uploads/products/mobile-phone/5/product_1777266977_4850.jpg",
      "/uploads/products/mobile-phone/5/product_1777266977_5370-1-1024x1024.jpg",
      "/uploads/products/mobile-phone/5/product_1777266977_5370-1024x1024.jpg",
      "/uploads/products/mobile-phone/5/product_1777266977_8131.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-57",
    "slug": "icon-i909-jelly-dual-display-phone",
    "title": "icon i909 Jelly Dual Display Phone",
    "titleBn": "icon i909 Jelly Dual Display Phone",
    "brand": "iCon",
    "brandSlug": "icon",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 210000,
    "compareAt": 265000,
    "rating": 5,
    "reviewCount": 44,
    "inStock": true,
    "stockQty": 33,
    "sku": "1915",
    "tags": [
      "gadgets",
      "mobile-phone",
      "icon",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-57-1",
        "sku": "1915",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 210000,
        "compareAt": 265000,
        "inStock": true,
        "stockQty": 33
      }
    ],
    "highlights": [
      "Brand: icon",
      "Main Display: 2.8 inch HD Screen",
      "Secord Display: 2.4 inch",
      "SIM Card Quantity: 2 Nano SIM card and 1TF card",
      "Memory Card: 32Mb RAM , 32Mb ROM ,"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "icon",
      "Model": "i909",
      "Main Display": "2.8 inch HD Screen",
      "Secord Display": "2.4 inch",
      "SIM Card Quantity": "2 Nano SIM card and 1TF card",
      "Memory Card": "32Mb RAM , 32Mb ROM ,",
      "Battery": "2500mAh Battery",
      "Charging Interface Type": "Type-C"
    },
    "specificationsBn": {
      "মডেল": "icon i909 Jelly Dual Display Phone",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "icon i909 Dual Display Fold Phone Black\n\nMaximum support 32GB expansion\n\nAuto Call Record\n\n3.5 Headphone jack\n\nTorch Light\n\nDual SIM Card\n\nFoldable Phone\n\nRear HD Camera\n\nLED Flashlight\n\nMusic / Video Player\n\nFM Radio\n\nCalculator, calendar, games, alarm clock, Bluetooth, recorder, etc.\n\nOne year Service Warranty\n\nPackage\n\n1* icon i909 Dual Display Fold Phone Black\n\n1* Type-C Charger\n\n1* Back Cover\n\n1* Warranty Card",
    "descriptionBn": "icon i909 Dual Display Fold Phone Black\n\nMaximum support 32GB expansion\n\nAuto Call Record\n\n3.5 Headphone jack\n\nTorch Light\n\nDual SIM Card\n\nFoldable Phone\n\nRear HD Camera\n\nLED Flashlight\n\nMusic / Video Player\n\nFM Radio\n\nCalculator, calendar, games, alarm clock, Bluetooth, recorder, etc.\n\nOne year Service Warranty\n\nPackage\n\n1* icon i909 Dual Display Fold Phone Black\n\n1* Type-C Charger\n\n1* Back Cover\n\n1* Warranty Card",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 112,
    "images": [
      "/uploads/products/mobile-phone/6/product_1777267216_3659.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-58",
    "slug": "vmax-v72-flip-folding-phone-two-display",
    "title": "Vmax v72 flip Folding Phone Two Display",
    "titleBn": "Vmax v72 flip Folding Phone Two Display",
    "brand": "Vmax",
    "brandSlug": "vmax",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 170000,
    "compareAt": 225000,
    "rating": 4.8,
    "reviewCount": 51,
    "inStock": true,
    "stockQty": 46,
    "sku": "1916",
    "tags": [
      "gadgets",
      "mobile-phone",
      "vmax",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-58-1",
        "sku": "1916",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 170000,
        "compareAt": 225000,
        "inStock": true,
        "stockQty": 46
      }
    ],
    "highlights": [
      "Brand: Vmax",
      "Main Display: 2 inch HD Screen",
      "Secord Display: 1.77 inch",
      "SIM Card Quantity: 2 Nano SIM card and 1TF card",
      "Memory Card: 32Mb RAM , 32Mb ROM ,"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Brand": "Vmax",
      "Model": "i72 flip",
      "Main Display": "2 inch HD Screen",
      "Secord Display": "1.77 inch",
      "SIM Card Quantity": "2 Nano SIM card and 1TF card",
      "Memory Card": "32Mb RAM , 32Mb ROM ,",
      "Battery": "2500mAh Battery",
      "Charging Interface Type": "Type-C",
      "Bluetooth": "Yes"
    },
    "specificationsBn": {
      "মডেল": "Vmax v72 flip Folding Phone Two Display",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Product details of\n\nVmax i72 flip Mini Folding Phone Dual Display Dual Sim Black\n\nMTk Chipset\n\nMaximum support 32GB expansion",
    "descriptionBn": "Product details of\n\nVmax i72 flip Mini Folding Phone Dual Display Dual Sim Black\n\nMTk Chipset\n\nMaximum support 32GB expansion",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 159,
    "images": [
      "/uploads/products/mobile-phone/7/product_1777267617_1447.jpg",
      "/uploads/products/mobile-phone/7/product_1777267617_4771.jpg",
      "/uploads/products/mobile-phone/7/product_1781161384_8839.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-59",
    "slug": "icon-i909-dual-sim-mobile",
    "title": "Icon i909 Dual Sim Mobile",
    "titleBn": "Icon i909 Dual Sim Mobile",
    "brand": "iCon",
    "brandSlug": "icon",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 200000,
    "compareAt": 260000,
    "rating": 4.8999999999999995,
    "reviewCount": 13,
    "inStock": true,
    "stockQty": 59,
    "sku": "2104",
    "tags": [
      "gadgets",
      "mobile-phone",
      "icon",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-59-1",
        "sku": "2104",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 200000,
        "compareAt": 260000,
        "inStock": true,
        "stockQty": 59
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Icon i909 Dual Sim Mobile",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Icon i909 Dual Sim Mobile",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Icon i909 Dual Sim Mobile 3.5 Inch Display 3500 Mah Battery\n\nDual Sim\n\n3500 mah battery\n\n3.5 inch Display\n\nvibration\n\nMp3/Mp4\n\nCamera\n\nWireless\n\nType-c\n\nBluetooth\n\n1 year Company Service Warrantee",
    "descriptionBn": "Icon i909 Dual Sim Mobile 3.5 Inch Display 3500 Mah Battery\n\nDual Sim\n\n3500 mah battery\n\n3.5 inch Display\n\nvibration\n\nMp3/Mp4\n\nCamera\n\nWireless\n\nType-c\n\nBluetooth\n\n1 year Company Service Warrantee",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 206,
    "images": [
      "/uploads/products/mobile-phone/8/product_1781161384_8839.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-60",
    "slug": "titanic-t-35-mini-feature-phone",
    "title": "Titanic T-35 Mini Feature Phone",
    "titleBn": "Titanic T-35 Mini Feature Phone",
    "brand": "Titanic",
    "brandSlug": "titanic",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mobile-phone",
    "categorySlug": "mobile-phone",
    "categoryName": "Feature & Mini Phones",
    "categoryNameBn": "ফিচার ও মিনি ফোন",
    "price": 112000,
    "compareAt": 155000,
    "rating": 5,
    "reviewCount": 20,
    "inStock": true,
    "stockQty": 72,
    "sku": "2191",
    "tags": [
      "gadgets",
      "mobile-phone",
      "titanic",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-60-1",
        "sku": "2191",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 112000,
        "compareAt": 155000,
        "inStock": true,
        "stockQty": 72
      }
    ],
    "highlights": [
      "Display: 1.44-inch color screen",
      "Chipset: Powered by a MediaTek (MTK Chipset)",
      "Battery Capacity: 1000 mAh",
      "Connectivity: Dual SIM support",
      "Charging Interface: Modern Type-C port"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Display": "1.44-inch color screen",
      "Chipset": "Powered by a MediaTek (MTK Chipset)",
      "Battery Capacity": "1000 mAh",
      "Connectivity": "Dual SIM support",
      "Charging Interface": "Modern Type-C port",
      "Build Features": "Crystal keypad paired with a premium back cover styling that visually mimics a multi-lens smartphone camera array.",
      "Warranty": "Comes with a 1-year official brand warranty."
    },
    "specificationsBn": {
      "মডেল": "Titanic T-35 Mini Feature Phone",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Key Technical Specifications",
    "descriptionBn": "Key Technical Specifications",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 253,
    "images": [
      "/uploads/products/mobile-phone/9/product_1783234704_6318-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-61",
    "slug": "t1-t2-professional-wireless-gaming-mouse-rechargeable-battery-cool-backlight-for-fps-shooter",
    "title": "T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter",
    "titleBn": "T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mouse-keyboard",
    "categorySlug": "mouse-keyboard",
    "categoryName": "Keyboards & Mice",
    "categoryNameBn": "কীবোর্ড ও মাউস",
    "price": 59000,
    "compareAt": 119000,
    "rating": 4.8,
    "reviewCount": 27,
    "inStock": true,
    "stockQty": 85,
    "sku": "3456",
    "tags": [
      "gadgets",
      "mouse-keyboard",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-61-1",
        "sku": "3456",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 59000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 85
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "🖱️ T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter  আপনার গেমিং অভিজ্ঞতাকে আরও উন্নত করতে প্রফেশনাল গেমারদের জন্য চমৎকার একটি ডিভাইস T1 & T2 Wireless Game Mouse। প্রফেশনাল FPS শুটারদের কথা মাথায় রেখে এটি নিখুঁতভাবে ডিজাইন করা হয়েছে। 🎮 মূল বৈশিষ্ট্য ও সুবিধা: গেমিং পারফরম্যান্স: প্রফেশনাল FPS শুটারদের জন্য বিশেষ গেম চিপ ও বিল্ট-ইন ওয়েট ব্লক (Weight Block), যা দেবে নির্ভুল ও নিখুঁত নিয়ন্ত্রণ। স্থায়িত্ব ও ডিজাইন: ফ্যাশনেবল ক্ল্যাসিক লুকের 6D বাটন, যা প্রায় ২০ মিলিয়ন কিস্ট্রোক পর্যন্ত স্থায়ী। সাথে রয়েছে আকর্ষণীয় কুল ব্যাকলাইটিং ইফেক্ট। DPI অ্যাডজাস্টমেন্ট: ৩-লেভেল স্পিড অ্যাডজাস্টমেন্ট (800 / 1200 / 1600 DPI)। কানেক্টিভিটি: ১০ মিটার রেঞ্জ পর্যন্ত শক্তিশালী ও নিরবচ্ছিন্ন ওয়্যারলেস সংযোগ।",
    "descriptionBn": "🖱️ T1 & T2 Professional Wireless Gaming Mouse | Rechargeable Battery | Cool Backlight for FPS Shooter  আপনার গেমিং অভিজ্ঞতাকে আরও উন্নত করতে প্রফেশনাল গেমারদের জন্য চমৎকার একটি ডিভাইস T1 & T2 Wireless Game Mouse। প্রফেশনাল FPS শুটারদের কথা মাথায় রেখে এটি নিখুঁতভাবে ডিজাইন করা হয়েছে। 🎮 মূল বৈশিষ্ট্য ও সুবিধা: গেমিং পারফরম্যান্স: প্রফেশনাল FPS শুটারদের জন্য বিশেষ গেম চিপ ও বিল্ট-ইন ওয়েট ব্লক (Weight Block), যা দেবে নির্ভুল ও নিখুঁত নিয়ন্ত্রণ। স্থায়িত্ব ও ডিজাইন: ফ্যাশনেবল ক্ল্যাসিক লুকের 6D বাটন, যা প্রায় ২০ মিলিয়ন কিস্ট্রোক পর্যন্ত স্থায়ী। সাথে রয়েছে আকর্ষণীয় কুল ব্যাকলাইটিং ইফেক্ট। DPI অ্যাডজাস্টমেন্ট: ৩-লেভেল স্পিড অ্যাডজাস্টমেন্ট (800 / 1200 / 1600 DPI)। কানেক্টিভিটি: ১০ মিটার রেঞ্জ পর্যন্ত শক্তিশালী ও নিরবচ্ছিন্ন ওয়্যারলেস সংযোগ।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": true,
    "colorHue": 300,
    "images": [
      "/uploads/products/mouse-keyboard/1/photo_6053356723105371013_w-768x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690716_y-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690717_y-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690718_y-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690719_y-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690720_y-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/1/photo_6289661043432690721_y-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-62",
    "slug": "rechargeable-bluetooth-rgb-wireless-keyboard-mouse-combo-black",
    "title": "Rechargeable Bluetooth RGB Wireless Keyboard & Mouse Combo - Black",
    "titleBn": "Rechargeable Bluetooth RGB Wireless Keyboard & Mouse Combo - Black",
    "brand": "Apple",
    "brandSlug": "apple",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-mouse-keyboard",
    "categorySlug": "mouse-keyboard",
    "categoryName": "Keyboards & Mice",
    "categoryNameBn": "কীবোর্ড ও মাউস",
    "price": 102000,
    "compareAt": 149900,
    "rating": 4.8999999999999995,
    "reviewCount": 34,
    "inStock": true,
    "stockQty": 98,
    "sku": "0003",
    "tags": [
      "gadgets",
      "mouse-keyboard",
      "apple",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-62-1",
        "sku": "0003",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 102000,
        "compareAt": 149900,
        "inStock": true,
        "stockQty": 98
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Rechargeable Bluetooth RGB Wireless Keyboard & Mouse Combo - Black",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Rechargeable Bluetooth RGB Wireless Keyboard & Mouse Combo - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "স্মার্ট সেটআপের জন্য সেরা RGB আল্ট্রা-থিন রিচার্জেবল কিবোর্ড ও মাউস কম্বো!\n\nডেসক্রিপশন:\n\nআপনার স্মার্টফোন, ট্যাবলেট কিংবা ল্যাপটপে টাইপিং হবে এখন আরও দ্রুত এবং স্টাইলিশ! আমাদের এই Ultra-Thin RGB Keyboard & Mouse Combo আপনার কাজের অভিজ্ঞতাকে নিয়ে যাবে এক নতুন উচ্চতায়।\n\nকেন এটি আপনার জন্য সেরা পছন্দ?\n\nRGB ব্যাকলিট: অন্ধকারে কাজ করার জন্য রয়েছে আকর্ষণীয় RGB লাইটিং সুবিধা।\n\nমাল্টি-ডিভাইস সাপোর্ট: iPad, iPhone, Android এবং Windows ল্যাপটপের সাথে অনায়াসেই কানেক্ট হয়।\n\nআল্ট্রা স্লিম ও হালকা: ওজনে মাত্র ৬.৫৬ আউন্স, তাই সহজেই বহনযোগ্য।\n\nসাইলেন্ট টাইপিং: সিজার মেকানিজম কি এবং whisper-quiet মাউস, যা কাজের সময় কোনো বিরক্তি সৃষ্টি করবে না।\n\nদীর্ঘস্থায়ী ব্যাটারি: একবার ফুল চার্জে ১৫০ ঘণ্টা পর্যন্ত ব্যবহার করা যাবে।\n\nঅ্যালুমিনিয়াম বডি: টেকসই এবং প্রিমিয়াম লুকের জন্য এতে ব্যবহার করা হয়েছে উচ্চমানের অ্যালুমিনিয়াম অ্যালয় বেস।\n\nকালার অপশন: সাদা এবং কালো।\n\nপ্যাকেজে যা যা থাকছে:\n\n১টি ব্লুটুথ কিবোর্ড, ১টি রিচার্জেবল মাউস এবং ১টি চার্জিং ক্যাবল।",
    "descriptionBn": "স্মার্ট সেটআপের জন্য সেরা RGB আল্ট্রা-থিন রিচার্জেবল কিবোর্ড ও মাউস কম্বো!\n\nডেসক্রিপশন:\n\nআপনার স্মার্টফোন, ট্যাবলেট কিংবা ল্যাপটপে টাইপিং হবে এখন আরও দ্রুত এবং স্টাইলিশ! আমাদের এই Ultra-Thin RGB Keyboard & Mouse Combo আপনার কাজের অভিজ্ঞতাকে নিয়ে যাবে এক নতুন উচ্চতায়।\n\nকেন এটি আপনার জন্য সেরা পছন্দ?\n\nRGB ব্যাকলিট: অন্ধকারে কাজ করার জন্য রয়েছে আকর্ষণীয় RGB লাইটিং সুবিধা।\n\nমাল্টি-ডিভাইস সাপোর্ট: iPad, iPhone, Android এবং Windows ল্যাপটপের সাথে অনায়াসেই কানেক্ট হয়।\n\nআল্ট্রা স্লিম ও হালকা: ওজনে মাত্র ৬.৫৬ আউন্স, তাই সহজেই বহনযোগ্য।\n\nসাইলেন্ট টাইপিং: সিজার মেকানিজম কি এবং whisper-quiet মাউস, যা কাজের সময় কোনো বিরক্তি সৃষ্টি করবে না।\n\nদীর্ঘস্থায়ী ব্যাটারি: একবার ফুল চার্জে ১৫০ ঘণ্টা পর্যন্ত ব্যবহার করা যাবে।\n\nঅ্যালুমিনিয়াম বডি: টেকসই এবং প্রিমিয়াম লুকের জন্য এতে ব্যবহার করা হয়েছে উচ্চমানের অ্যালুমিনিয়াম অ্যালয় বেস।\n\nকালার অপশন: সাদা এবং কালো।\n\nপ্যাকেজে যা যা থাকছে:\n\n১টি ব্লুটুথ কিবোর্ড, ১টি রিচার্জেবল মাউস এবং ১টি চার্জিং ক্যাবল।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 347,
    "images": [
      "/uploads/products/mouse-keyboard/2/6244519343718862590-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/2/6244519343718862591-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/2/6244519343718862594-1024x1024.jpg",
      "/uploads/products/mouse-keyboard/2/WhatsApp-Image-2026-04-08-at-1.34.10-AM.jpeg",
      "/uploads/products/mouse-keyboard/2/WhatsApp-Image-2026-04-08-at-1.34.41-AM-1024x1024.jpeg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-63",
    "slug": "ergonomic-inflatable-lumbar-pillow-travel-friendly-back-support-for-office-home-ash",
    "title": "Ergonomic Inflatable Lumbar Pillow – Travel-Friendly Back Support for Office & Home - Ash",
    "titleBn": "Ergonomic Inflatable Lumbar Pillow – Travel-Friendly Back Support for Office & Home - Ash",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-pillow",
    "categorySlug": "pillow",
    "categoryName": "Comfort & Health Pillows",
    "categoryNameBn": "পিলো ও ব্যাক সাপোর্ট",
    "price": 65000,
    "compareAt": 135000,
    "rating": 5,
    "reviewCount": 41,
    "inStock": true,
    "stockQty": 31,
    "sku": "0001",
    "tags": [
      "gadgets",
      "pillow",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-63-1",
        "sku": "0001",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 65000,
        "compareAt": 135000,
        "inStock": true,
        "stockQty": 31
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Ergonomic Inflatable Lumbar Pillow – Travel-Friendly Back Support for Office & Home - Ash",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Ergonomic Inflatable Lumbar Pillow – Travel-Friendly Back Support for Office & Home - Ash",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "ইনফ্ল্যাটেবল ব্যাক সাপোর্ট পিলো: দীর্ঘক্ষণ বসে থাকা বা ভ্রমণে পিঠের ব্যথার সেরা সমাধান!\n\nএকটানা ডেস্কে বসে কাজ করা কিংবা লম্বা জার্নিতে পিঠের ব্যথায় অতিষ্ঠ হয়ে যাচ্ছেন? সাধারণ কুশন ব্যবহার করেও কি কাঙ্ক্ষিত আরাম পাচ্ছেন না?\n\nআপনার এই সমস্যার সবথেকে কার্যকরী সমাধান নিয়ে এলাম আমরা— ইনফ্ল্যাটেবল ব্যাক সাপোর্ট পিলো! এটি আপনার মেরুদণ্ডের সঠিক ভঙ্গি বজায় রেখে পিঠের ওপর বাড়তি চাপ কমায় এবং আপনাকে দেয় দীর্ঘস্থায়ী আরাম।\n\nকেন এই পিলোটি আপনার জন্য সেরা?\n\nসহজ পাম্পিং সিস্টেম: মুখে ফুঁ দেওয়ার বা আলাদা পাম্পের ঝামেলা নেই! এতে আছে বিল্ট-ইন পুশ-পাম্প, যা হাত দিয়ে কয়েকবার প্রেস করলেই দ্রুত ফুলে ওঠে।\n\nঅর্গোনোমিক ডিজাইন: এর বিশেষ ডিজাইন মেরুদণ্ডের ন্যাচারাল কার্ভ বজায় রাখে, ফলে দীর্ঘক্ষণ বসে থাকলেও ক্লান্তি আসে না।\n\nপ্রিমিয়াম ম্যাটেরিয়াল: উন্নতমানের ভেলভেট ফিনিশ ফ্যাব্রিক ব্যবহার করা হয়েছে, যা ত্বকের জন্য খুবই আরামদায়ক এবং দীর্ঘক্ষণ ব্যবহারে ঘাম হবে না।\n\nপোর্টেবল ও সাশ্রয়ী: কাজ শেষে বাতাস বের করে একদম ছোট করে ভাঁজ করে ব্যাগে রেখে দিতে পারবেন। এটি ওজনে হালকা এবং যেকোনো জায়গায় বহনযোগ্য।\n\nভার্সাটাইল ব্যবহার: অফিস চেয়ার, বাসার সোফা, গাড়ির সিট কিংবা প্লেন ও বাসে ভ্রমণের জন্য এটি আপনার সেরা সফরসঙ্গী।\n\nউপলব্ধ কালার: আমাদের কাছে পাবেন চমৎকার দুইটি কালার ভ্যারিয়েন্ট।\n\nদাম: কোয়ালিটি অনুযায়ী দাম থাকছে একদম আপনার হাতের নাগালে!\n\nঅফিস হোক বা ভ্রমণ, পিঠের আরাম নিশ্চিত করতে আর দেরি না করে এখনই অর্ডার করুন আপনার পছন্দের কালারটি।",
    "descriptionBn": "ইনফ্ল্যাটেবল ব্যাক সাপোর্ট পিলো: দীর্ঘক্ষণ বসে থাকা বা ভ্রমণে পিঠের ব্যথার সেরা সমাধান!\n\nএকটানা ডেস্কে বসে কাজ করা কিংবা লম্বা জার্নিতে পিঠের ব্যথায় অতিষ্ঠ হয়ে যাচ্ছেন? সাধারণ কুশন ব্যবহার করেও কি কাঙ্ক্ষিত আরাম পাচ্ছেন না?\n\nআপনার এই সমস্যার সবথেকে কার্যকরী সমাধান নিয়ে এলাম আমরা— ইনফ্ল্যাটেবল ব্যাক সাপোর্ট পিলো! এটি আপনার মেরুদণ্ডের সঠিক ভঙ্গি বজায় রেখে পিঠের ওপর বাড়তি চাপ কমায় এবং আপনাকে দেয় দীর্ঘস্থায়ী আরাম।\n\nকেন এই পিলোটি আপনার জন্য সেরা?\n\nসহজ পাম্পিং সিস্টেম: মুখে ফুঁ দেওয়ার বা আলাদা পাম্পের ঝামেলা নেই! এতে আছে বিল্ট-ইন পুশ-পাম্প, যা হাত দিয়ে কয়েকবার প্রেস করলেই দ্রুত ফুলে ওঠে।\n\nঅর্গোনোমিক ডিজাইন: এর বিশেষ ডিজাইন মেরুদণ্ডের ন্যাচারাল কার্ভ বজায় রাখে, ফলে দীর্ঘক্ষণ বসে থাকলেও ক্লান্তি আসে না।\n\nপ্রিমিয়াম ম্যাটেরিয়াল: উন্নতমানের ভেলভেট ফিনিশ ফ্যাব্রিক ব্যবহার করা হয়েছে, যা ত্বকের জন্য খুবই আরামদায়ক এবং দীর্ঘক্ষণ ব্যবহারে ঘাম হবে না।\n\nপোর্টেবল ও সাশ্রয়ী: কাজ শেষে বাতাস বের করে একদম ছোট করে ভাঁজ করে ব্যাগে রেখে দিতে পারবেন। এটি ওজনে হালকা এবং যেকোনো জায়গায় বহনযোগ্য।\n\nভার্সাটাইল ব্যবহার: অফিস চেয়ার, বাসার সোফা, গাড়ির সিট কিংবা প্লেন ও বাসে ভ্রমণের জন্য এটি আপনার সেরা সফরসঙ্গী।\n\nউপলব্ধ কালার: আমাদের কাছে পাবেন চমৎকার দুইটি কালার ভ্যারিয়েন্ট।\n\nদাম: কোয়ালিটি অনুযায়ী দাম থাকছে একদম আপনার হাতের নাগালে!\n\nঅফিস হোক বা ভ্রমণ, পিঠের আরাম নিশ্চিত করতে আর দেরি না করে এখনই অর্ডার করুন আপনার পছন্দের কালারটি।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 34,
    "images": [
      "/uploads/products/pillow/1/6244519343718862609-1024x1024.jpg",
      "/uploads/products/pillow/1/6244519343718862610-1024x1024.jpg",
      "/uploads/products/pillow/1/6244519343718862611.jpg",
      "/uploads/products/pillow/1/6244519343718862612.jpg",
      "/uploads/products/pillow/1/6244519343718862613-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-64",
    "slug": "wireless-thermal-printer",
    "title": "Wireless Thermal Printer",
    "titleBn": "Wireless Thermal Printer",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-printer",
    "categorySlug": "printer",
    "categoryName": "Thermal & Label Printers",
    "categoryNameBn": "থার্মাল প্রিন্টার",
    "price": 197000,
    "compareAt": 275000,
    "rating": 4.8,
    "reviewCount": 48,
    "inStock": true,
    "stockQty": 44,
    "sku": "00192",
    "tags": [
      "gadgets",
      "printer",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-64-1",
        "sku": "00192",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 197000,
        "compareAt": 275000,
        "inStock": true,
        "stockQty": 44
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Wireless Thermal Printer",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Wireless Thermal Printer",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনি যদি online seller হন, shop owner হন, restaurant চালান বা delivery service করেন — তাহলে এই 58mm Thermal Printer আপনার জন্য perfect choice।\n\nNo ink. No cartridge. No extra cost.",
    "descriptionBn": "আপনি যদি online seller হন, shop owner হন, restaurant চালান বা delivery service করেন — তাহলে এই 58mm Thermal Printer আপনার জন্য perfect choice।\n\nNo ink. No cartridge. No extra cost.",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 81,
    "images": [
      "/uploads/products/printer/1/WhatsApp-Image-2026-02-23-at-15.30.04-copy-1024x1024.jpg",
      "/uploads/products/printer/1/WhatsApp-Image-2026-02-23-at-15.30.06-copy-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-65",
    "slug": "jbl-bs-269-wireless-bluetooth-speaker-black",
    "title": "JBL BS-269 wireless Bluetooth speaker - Black",
    "titleBn": "JBL BS-269 wireless Bluetooth speaker - Black",
    "brand": "JBL",
    "brandSlug": "jbl",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 180000,
    "compareAt": 259900,
    "rating": 4.8999999999999995,
    "reviewCount": 55,
    "inStock": true,
    "stockQty": 57,
    "sku": "000171",
    "tags": [
      "gadgets",
      "speaker",
      "jbl",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-65-1",
        "sku": "000171",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 180000,
        "compareAt": 259900,
        "inStock": true,
        "stockQty": 57
      }
    ],
    "highlights": [
      "Output Power: 30W (provides room-filling sound with clear audio and bass emphasis).",
      "Bluetooth Version: 5.3 (stable wireless connection).",
      "Bluetooth Range: Up to 10 meters.",
      "Charging Time: 3–5 hours.",
      "Drivers: Dual full-range drivers / 2 loudspeaker enclosures."
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Output Power": "30W (provides room-filling sound with clear audio and bass emphasis).",
      "Bluetooth Version": "5.3 (stable wireless connection).",
      "Bluetooth Range": "Up to 10 meters.",
      "Battery": "3600–4000mAh rechargeable Li-ion (varies slightly by listing; many sellers advertise ~4000mAh).",
      "Playtime": "Offers several hours of continuous playback (exact duration depends on volume, content, and lighting usage; marketed for extended outdoor sessions).",
      "Charging Time": "3–5 hours.",
      "Drivers": "Dual full-range drivers / 2 loudspeaker enclosures.",
      "Lighting": "RGB LED lights for party/ambient effects.",
      "Built-in Microphone": "No (in most specs).",
      "Power Source": "Rechargeable battery (USB charging).",
      "Cabinet Material": "Plastic.",
      "Dimensions": "Approximately 230 × 116 × 137 mm.",
      "Weight": "Around 1.8 kg (gross packaging weight).",
      "Other Features": "Ergonomic handle for portability, suitable for outdoor parties/travel.",
      "Form Factor": "Compact yet sturdy portable speaker with dimensions of approximately 230 × 116 × 137 mm. It features a built-in ergonomic carrying handle, making it easy to transport for picnics, beach trips, or home-to-home parties.",
      "Materials": "Plastic cabinet construction for lightweight durability (gross weight around 1.8 kg).",
      "Colors": "Typically available in multiple vibrant options like Black, Blue, Orange, and White.",
      "Aesthetics": "Sleek, modern look enhanced by dynamic RGB LED lighting that pulses and changes colors to match the music or create a party atmosphere. The lights add visual flair, especially in low-light settings.",
      "Power Output": "30W total, delivered through dual full-range drivers (2 loudspeaker enclosures). This provides loud, room-filling sound with emphasis on clear highs, balanced mids, and punchy bass suitable for music, vocals, and general entertainment.",
      "Sound Signature": "Users and sellers often highlight \"crystal clear sound,\" \"deep bass boost,\" and good volume levels for small-to-medium spaces or outdoor settings. It is not audiophile-grade but performs well for its price point.",
      "Playback Modes": "Versatile options beyond Bluetooth, including AUX (3.5mm wired input), USB, TF/SD card slot, and FM Radio for tuning into local stations.",
      "Bluetooth": "Version 5.3 for stable, low-latency wireless streaming from smartphones, tablets, or laptops. Range up to 10 meters (line-of-sight).",
      "TWS Support": "True Wireless Stereo pairing — connect two BS-269 units for immersive stereo sound.",
      "Controls": "On-board buttons for power, volume, track navigation, mode switching, and lighting effects.",
      "Microphone": "Generally not built-in for calls (per manufacturer specs), focusing primarily on music playback.",
      "Battery Capacity": "3600–4000mAh rechargeable lithium-ion battery.",
      "Charging": "Via USB; full charge takes 3–5 hours. Rechargeable and convenient for on-the-go use.",
      "Outdoor Parties & Travel": "The combination of 30W power, portability, RGB lights, and long battery makes it great for picnics, camping, beach outings, or small events.",
      "Home Entertainment": "Use as a standalone speaker for music, podcasts, or background audio in a room.",
      "Budget Option": "Positioned as an affordable alternative to premium speakers, delivering solid performance for casual listeners."
    },
    "specificationsBn": {
      "মডেল": "JBL BS-269 wireless Bluetooth speaker - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "JBL BS-269 wireless Bluetooth speaker Specifications\n\nConnectivity & Playback:\n\nBluetooth\n\nAUX / 3.5mm input\n\nUSB\n\nTF/SD card slot\n\nFM Radio\n\nTWS (True Wireless Stereo) pairing support.\n\nJBL BS-269 wireless Bluetooth speaker Descriptions\n\nThe JBL BS-269 is a budget-friendly, portable Bluetooth sound box designed for everyday use, outdoor parties, travel, and casual gatherings. It is frequently marketed with JBL-style branding in regions like Bangladesh and other emerging markets, though it is a generic/third-party model produced by manufacturers such as SHIOU (not an official Harman/JBL product). It combines decent audio performance, eye-catching visuals, and multiple playback options in a rugged, handle-equipped design.\n\nDesign and Build\n\nAudio Performance\n\nConnectivity and Features\n\nBattery and Power\n\nIdeal Use Cases",
    "descriptionBn": "JBL BS-269 wireless Bluetooth speaker Specifications\n\nConnectivity & Playback:\n\nBluetooth\n\nAUX / 3.5mm input\n\nUSB\n\nTF/SD card slot\n\nFM Radio\n\nTWS (True Wireless Stereo) pairing support.\n\nJBL BS-269 wireless Bluetooth speaker Descriptions\n\nThe JBL BS-269 is a budget-friendly, portable Bluetooth sound box designed for everyday use, outdoor parties, travel, and casual gatherings. It is frequently marketed with JBL-style branding in regions like Bangladesh and other emerging markets, though it is a generic/third-party model produced by manufacturers such as SHIOU (not an official Harman/JBL product). It combines decent audio performance, eye-catching visuals, and multiple playback options in a rugged, handle-equipped design.\n\nDesign and Build\n\nAudio Performance\n\nConnectivity and Features\n\nBattery and Power\n\nIdeal Use Cases",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 128,
    "images": [
      "/uploads/products/speaker/1/IMG_6908-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6909-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6931-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6933-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6934-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6937-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6940-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6945-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6947-1024x768.jpg",
      "/uploads/products/speaker/1/IMG_6948-1024x768.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-66",
    "slug": "ewa-a127-portable-mini-bluetooth-speaker-1",
    "title": "EWA A127 Portable Mini Bluetooth Speaker",
    "titleBn": "EWA A127 Portable Mini Bluetooth Speaker",
    "brand": "EWA",
    "brandSlug": "ewa",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 85000,
    "compareAt": 119000,
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "stockQty": 70,
    "sku": "13134-SPE",
    "tags": [
      "gadgets",
      "speaker",
      "ewa",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-66-1",
        "sku": "13134-SPE",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 85000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 70
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "EWA A127 Portable Mini Bluetooth Speaker",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "EWA A127 Portable Mini Bluetooth Speaker",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "EWA A127 Portable Mini Bluetooth Speaker\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএর 3W হাই-পাওয়ার আউটপুট এবং 360-ডিগ্রি সারাউন্ড সাউন্ড প্রযুক্তি আপনাকে দেবে একটি অসাধারণ অডিও-ভিজ্যুয়াল অভিজ্ঞতা।\n\nএতে রয়েছে Bluetooth 5.0 + EDR চিপ, যা যেকোনো ব্লুটুথ ডিভাইসের সাথে দ্রুত এবং স্থিতিশীল কানেক্টিভিটি নিশ্চিত করে।\n\nবিল্ট-ইন মাইক্রোফোন থাকায় গান শোনার পাশাপাশি খুব সহজেই যেকোনো কল রিসিভ ও কথা বলা যায়।\n\nIPX5 রেটিং সমৃদ্ধ ওয়াটারপ্রুফ ডিজাইন, যা হালকা পানির ঝাপটা বা ঘাম থেকে স্পিকারটিকে সুরক্ষিত রাখে। আউটডোর বা ভ্রমণের জন্য এটি দারুণ।",
    "descriptionBn": "EWA A127 Portable Mini Bluetooth Speaker\n\nমূল বৈশিষ্ট্যসমূহ:\n\nএর 3W হাই-পাওয়ার আউটপুট এবং 360-ডিগ্রি সারাউন্ড সাউন্ড প্রযুক্তি আপনাকে দেবে একটি অসাধারণ অডিও-ভিজ্যুয়াল অভিজ্ঞতা।\n\nএতে রয়েছে Bluetooth 5.0 + EDR চিপ, যা যেকোনো ব্লুটুথ ডিভাইসের সাথে দ্রুত এবং স্থিতিশীল কানেক্টিভিটি নিশ্চিত করে।\n\nবিল্ট-ইন মাইক্রোফোন থাকায় গান শোনার পাশাপাশি খুব সহজেই যেকোনো কল রিসিভ ও কথা বলা যায়।\n\nIPX5 রেটিং সমৃদ্ধ ওয়াটারপ্রুফ ডিজাইন, যা হালকা পানির ঝাপটা বা ঘাম থেকে স্পিকারটিকে সুরক্ষিত রাখে। আউটডোর বা ভ্রমণের জন্য এটি দারুণ।",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 175,
    "images": [
      "/uploads/products/speaker/2/4Ld81JBryOO90OLYt8BFUjYiEG79ZjKH6JQiLrfj-1024x1024.png",
      "/uploads/products/speaker/2/EadUItvzQ74AKwGU7pUdrGmiHqfrgooyfZ4HJpUd.png",
      "/uploads/products/speaker/2/g5ZY36OUSexznqz8BCMqebIv5flLXF4ysr98DEn6-1024x1024.png",
      "/uploads/products/speaker/2/GIvbyzOFleP7nCY9mnpy5ZmxtQNcNV5kAg3GnEVP.jpg",
      "/uploads/products/speaker/2/Nslcro2hKkGpoBEDFT0bcyRxqEcTdff8cY4YgvWs-1024x1024.png",
      "/uploads/products/speaker/2/qq2zASfIjC4kxGmI0wKHo05EDvPzaKxleJJ0Y9Xe.png",
      "/uploads/products/speaker/2/QrTUDFto325uARuh6GjrFG6z4i6LJmvURmWJwKuO.png"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-67",
    "slug": "newrixing-nr-9908-portable-bluetooth-speaker-with-rgb-light-1",
    "title": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
    "titleBn": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
    "brand": "NewRixing",
    "brandSlug": "newrixing",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 79000,
    "compareAt": 119000,
    "rating": 4.8,
    "reviewCount": 24,
    "inStock": true,
    "stockQty": 83,
    "sku": "13254-SPE",
    "tags": [
      "gadgets",
      "speaker",
      "newrixing",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-67-1",
        "sku": "13254-SPE",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 79000,
        "compareAt": 119000,
        "inStock": true,
        "stockQty": 83
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light\n\nস্পিকারগুলোর ওপরের অংশে একটি আকর্ষণীয় RGB লাইট প্যানেল রয়েছে, যা গান বাজার সময় চমৎকার লাইটিং ইফেক্ট দেয়।\n\nএতে রয়েছে Bluetooth v5.3 প্রযুক্তি, যা দেবে ১০ মিটার পর্যন্ত একদম নিরবচ্ছিন্ন ও দ্রুত কানেক্টিভিটি।\n\nব্লুটুথ ছাড়াও এটি সরাসরি মেমোরি কার্ড (TF Card) সাপোর্ট করে, যাতে MP3 ফরম্যাটের গান অনায়াসেই বাজানো যায়।\n\nকমপ্যাক্ট সাইজ এবং সাথে থাকা টেকসই হ্যান্ডেল স্ট্র্যাপের কারণে এটি ট্রাভেল, আউটডোর বা যেকোনো পার্টিতে সহজে বহন করা যায়।\n\n📦 বক্সে যা যা থাকছে:\n\n১টি NewRixing NR-9908 স্পিকার\n\n১টি চার্জিং ক্যাবল\n\nইউজার ম্যানুয়াল",
    "descriptionBn": "NewRixing NR - 9908 Portable Bluetooth Speaker with RGB Light\n\nস্পিকারগুলোর ওপরের অংশে একটি আকর্ষণীয় RGB লাইট প্যানেল রয়েছে, যা গান বাজার সময় চমৎকার লাইটিং ইফেক্ট দেয়।\n\nএতে রয়েছে Bluetooth v5.3 প্রযুক্তি, যা দেবে ১০ মিটার পর্যন্ত একদম নিরবচ্ছিন্ন ও দ্রুত কানেক্টিভিটি।\n\nব্লুটুথ ছাড়াও এটি সরাসরি মেমোরি কার্ড (TF Card) সাপোর্ট করে, যাতে MP3 ফরম্যাটের গান অনায়াসেই বাজানো যায়।\n\nকমপ্যাক্ট সাইজ এবং সাথে থাকা টেকসই হ্যান্ডেল স্ট্র্যাপের কারণে এটি ট্রাভেল, আউটডোর বা যেকোনো পার্টিতে সহজে বহন করা যায়।\n\n📦 বক্সে যা যা থাকছে:\n\n১টি NewRixing NR-9908 স্পিকার\n\n১টি চার্জিং ক্যাবল\n\nইউজার ম্যানুয়াল",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 222,
    "images": [
      "/uploads/products/speaker/3/4s5EFSfxMwn4iv6iKUfaeeYsfbQ5WokeNu5F4RuB-1024x1024.jpg",
      "/uploads/products/speaker/3/FQr39rmfrWVAkURlTXRahszs5pkpGT0cg6xlYAk6-1-1024x1024.jpg",
      "/uploads/products/speaker/3/FQr39rmfrWVAkURlTXRahszs5pkpGT0cg6xlYAk6-1024x1024.jpg",
      "/uploads/products/speaker/3/hyxm8SaLu42kflnXHdqJxomhFqiO6TIo5ehsBHxp-1024x1024.jpg",
      "/uploads/products/speaker/3/S4RsnyeRkxJc0yc1ZeXkrNh2SqBnln23weQfH9Kp-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-68",
    "slug": "xtreme-p192-bluetooth-speaker-12w-rgb-lighting-ipx6-waterproof-portable-wireless-speaker-with-aux-usb-tf-card-fm-radio",
    "title": "XTREME P192 Bluetooth Speaker 12W | RGB Lighting | IPX6 Waterproof | Portable Wireless Speaker with AUX, USB, TF Card & FM Radio",
    "titleBn": "XTREME P192 Bluetooth Speaker 12W | RGB Lighting | IPX6 Waterproof | Portable Wireless Speaker with AUX, USB, TF Card & FM Radio",
    "brand": "XTREME",
    "brandSlug": "xtreme",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 120000,
    "compareAt": 189900,
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "stockQty": 96,
    "sku": "2133",
    "tags": [
      "gadgets",
      "speaker",
      "xtreme",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-68-1",
        "sku": "2133",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 120000,
        "compareAt": 189900,
        "inStock": true,
        "stockQty": 96
      }
    ],
    "highlights": [
      "Output Power: 12W (Powerful Sound with Deep Bass).",
      "Bluetooth Version: V5.3 (Fast and stable connectivity).",
      "Battery Capacity: Lithium battery.",
      "Playtime: ৪ থেকে ৮ ঘণ্টা টানা মিউজিক শোনা যাবে এক চার্জে.",
      "Speaker Driver: 57mm x 2 (Dual Drivers)."
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Output Power": "12W (Powerful Sound with Deep Bass).",
      "Bluetooth Version": "V5.3 (Fast and stable connectivity).",
      "Battery Capacity": "Lithium battery.",
      "Playtime": "৪ থেকে ৮ ঘণ্টা টানা মিউজিক শোনা যাবে এক চার্জে.",
      "Speaker Driver": "57mm x 2 (Dual Drivers).",
      "Supported Modes": "Bluetooth, FM Radio, AUX, USB, এবং TF card.",
      "Extra Features": "RGB Lighting, TWS mode (একসাথে দুটি স্পিকার কানেক্ট করার সুবিধা).",
      "Waterproof": "IPX6 Rated (আউটডোর ব্যবহারের উপযোগী)."
    },
    "specificationsBn": {
      "মডেল": "XTREME P192 Bluetooth Speaker 12W | RGB Lighting | IPX6 Waterproof | Portable Wireless Speaker with AUX, USB, TF Card & FM Radio",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "আপনি কি দুর্দান্ত সাউন্ড কোয়ালিটির একটি পোর্টেবল স্পিকার খুঁজছেন?\n\nXTREME P192 Portable Wireless Speaker হতে পারে আপনার পারফেক্ট মিউজিক পার্টনার। এই স্পিকারটি শক্তিশালী 12W output এবং ডুয়াল 57mm drivers এর মাধ্যমে প্রিমিয়াম হাই-ফিডেলিটি সাউন্ড এবং Deep Bass নিশ্চিত করে. এটি outdoor, ভ্রমণ কিংবা ছোটখাটো পার্টির জন্য সেরা অপশন। এতে থাকা RGB Lighting আপনার গানের মুডকে আরও আকর্ষণীয় করে তুলবে. এছাড়া IPX6 Waterproof ডিজাইন হওয়ায়  ভয় ছাড়াই বাইরে ব্যবহার করা যাবে.\n\nSpecifications:",
    "descriptionBn": "আপনি কি দুর্দান্ত সাউন্ড কোয়ালিটির একটি পোর্টেবল স্পিকার খুঁজছেন?\n\nXTREME P192 Portable Wireless Speaker হতে পারে আপনার পারফেক্ট মিউজিক পার্টনার। এই স্পিকারটি শক্তিশালী 12W output এবং ডুয়াল 57mm drivers এর মাধ্যমে প্রিমিয়াম হাই-ফিডেলিটি সাউন্ড এবং Deep Bass নিশ্চিত করে. এটি outdoor, ভ্রমণ কিংবা ছোটখাটো পার্টির জন্য সেরা অপশন। এতে থাকা RGB Lighting আপনার গানের মুডকে আরও আকর্ষণীয় করে তুলবে. এছাড়া IPX6 Waterproof ডিজাইন হওয়ায়  ভয় ছাড়াই বাইরে ব্যবহার করা যাবে.\n\nSpecifications:",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 269,
    "images": [
      "/uploads/products/speaker/4/image-resize.avif",
      "/uploads/products/speaker/4/R-1.jpg",
      "/uploads/products/speaker/4/S15d9a5dc2faa4015a4113536660296193.jpg",
      "/uploads/products/speaker/4/Sd1f9bd0de62c484f9f0dc0a47a2ba16eb.jpg_720x720q80.jpg",
      "/uploads/products/speaker/4/Xtreame-p192--1024x1024.jpg",
      "/uploads/products/speaker/4/xTreame-p192-1-1024x767.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-69",
    "slug": "m25-detachable-dual-speaker-system-portable-high-quality-stereo-sound-black",
    "title": "M25 Detachable Dual Speaker System – Portable High-Quality Stereo Sound - Black",
    "titleBn": "M25 Detachable Dual Speaker System – Portable High-Quality Stereo Sound - Black",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 109000,
    "compareAt": 149900,
    "rating": 5,
    "reviewCount": 38,
    "inStock": true,
    "stockQty": 29,
    "sku": "0006",
    "tags": [
      "gadgets",
      "speaker",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-69-1",
        "sku": "0006",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 109000,
        "compareAt": 149900,
        "inStock": true,
        "stockQty": 29
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "M25 Detachable Dual Speaker System – Portable High-Quality Stereo Sound - Black",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "M25 Detachable Dual Speaker System – Portable High-Quality Stereo Sound - Black",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Detachable Dual Speaker System – High-Quality 10W Audio Outputদুইটি স্পিকার একসাথে বা আলাদা করে ব্যবহার করে আপনার চারপাশে জোরালো এবং ক্রিস্টাল ক্লিয়ার সাউন্ড ছড়িয়ে দিতে পারবেন। 10W পাওয়ারফুল অডিও আউটপুট সহ, এটি ডিপ বেস, ক্লিয়ার ভোকাল এবং ব্যালান্সড সাউন্ড প্রদান করে। পরফেক্ট আপনার পার্টি, ঘর বা আউটডোর মিউজিকের জন্য।\n\nমূল বৈশিষ্ট্য:\n\nDetachable Dual Speaker – একসাথে বা আলাদা ব্যবহার করুন\n\n10W Powerful Audio – শক্তিশালী এবং ভলিউম বাড়াতে পারফেক্ট\n\nDeep Bass & Clear Vocal – উচ্চমানের মিউজিক এক্সপেরিয়েন্স\n\nWell-Balanced Sound – প্রতিটি নোট এবং ভয়েস স্পষ্টভাবে শুনুন",
    "descriptionBn": "Detachable Dual Speaker System – High-Quality 10W Audio Outputদুইটি স্পিকার একসাথে বা আলাদা করে ব্যবহার করে আপনার চারপাশে জোরালো এবং ক্রিস্টাল ক্লিয়ার সাউন্ড ছড়িয়ে দিতে পারবেন। 10W পাওয়ারফুল অডিও আউটপুট সহ, এটি ডিপ বেস, ক্লিয়ার ভোকাল এবং ব্যালান্সড সাউন্ড প্রদান করে। পরফেক্ট আপনার পার্টি, ঘর বা আউটডোর মিউজিকের জন্য।\n\nমূল বৈশিষ্ট্য:\n\nDetachable Dual Speaker – একসাথে বা আলাদা ব্যবহার করুন\n\n10W Powerful Audio – শক্তিশালী এবং ভলিউম বাড়াতে পারফেক্ট\n\nDeep Bass & Clear Vocal – উচ্চমানের মিউজিক এক্সপেরিয়েন্স\n\nWell-Balanced Sound – প্রতিটি নোট এবং ভয়েস স্পষ্টভাবে শুনুন",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 316,
    "images": [
      "/uploads/products/speaker/5/IMG_4541-768x1024.jpg",
      "/uploads/products/speaker/5/IMG_4546-768x1024.jpg",
      "/uploads/products/speaker/5/IMG_4552-768x1024.jpg",
      "/uploads/products/speaker/5/IMG_4561-1024x768.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480416_y-1024x1024.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480417_y-1024x1024.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480418_y-1024x1024.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480419_y-1024x1024.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480420_y-1024x1024.jpg",
      "/uploads/products/speaker/5/photo_6258069999897480421_y-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-70",
    "slug": "boombox-4-mini-super-grade",
    "title": "BoomBOX 4 MINI Super Grade",
    "titleBn": "BoomBOX 4 MINI Super Grade",
    "brand": "JBL",
    "brandSlug": "jbl",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-speaker",
    "categorySlug": "speaker",
    "categoryName": "Bluetooth Speakers & Sound",
    "categoryNameBn": "ব্লুটুথ স্পিকার ও অডিও",
    "price": 145000,
    "compareAt": 255000,
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "stockQty": 42,
    "sku": "0005",
    "tags": [
      "gadgets",
      "speaker",
      "jbl",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-70-1",
        "sku": "0005",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 145000,
        "compareAt": 255000,
        "inStock": true,
        "stockQty": 42
      }
    ],
    "highlights": [
      "100% Genuine & Authentic product from verified merchant",
      "Doorstep Delivery across all 64 districts in Bangladesh",
      "7 Days Replacement & Return Guarantee"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "BoomBOX 4 MINI Super Grade",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "BoomBOX 4 MINI Super Grade",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "পাওয়ারফুল সাউন্ড, কমপ্যাক্ট ডিজাইন!\n\nJBL Boombox 4 Mini — মিউজিক হবে এখন যেকোনো জায়গায়!\n\nআপনি কি এমন একটি স্পিকার খুঁজছেন যা সাইজে ছোট কিন্তু সাউন্ডে হবে বিধ্বংসী? তাহলে JBL Boombox 4 Mini আপনার জন্য সেরা চয়েস! জেবিএল-এর সিগনেচার প্রো সাউন্ড আর ডিপ বেস আপনাকে দেবে মিউজিকের এক অনন্য অভিজ্ঞতা। ইনডোর পার্টি হোক বা আউটডোর অ্যাডভেঞ্চার—এটি একাই কাঁপিয়ে দেবে চারপাশ।\n\nকেন কিনবেন JBL Boombox 4 Mini?\n\nবুক কাঁপানো বেস: ছোট বডিতে শক্তিশালী ২০ ওয়াট আউটপুট এবং ডিপ বেস রেডিয়েটর, যা মিউজিকের প্রতিটি বিটকে প্রাণবন্ত করে তোলে।\n\nIP67 ওয়াটার ও ডাস্টপ্রুফ: পুল পার্টি কিংবা হঠাৎ বৃষ্টি—কোনো দুশ্চিন্তা নেই! এটি সম্পূর্ণ ওয়াটারপ্রুফ এবং ধুলোবালি নিরোধক।\n\nদীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ: একবার ফুল চার্জে প্রায় ১০-১২ ঘণ্টা পর্যন্ত নন-স্টপ মিউজিক এনজয় করার সুবিধা।\n\nলেটেস্ট ব্লুটুথ ৫.৩: দ্রুত কানেক্টিভিটি এবং ল্যাগ-ফ্রি অডিওর জন্য এতে ব্যবহার করা হয়েছে সর্বাধুনিক ব্লুটুথ প্রযুক্তি।\n\nপ্রিমিয়াম বিল্ড কোয়ালিটি: মজবুত হ্যান্ডেল এবং রাবারাইজড ফেব্রিক ফিনিশিং এটিকে করেছে দীর্ঘস্থায়ী এবং স্টাইলিশ।\n\nটেকনিক্যাল স্পেসিফিকেশন:\n\nআউটপুট পাওয়ার: 20W RMS\n\nফ্রিকোয়েন্সি: 60Hz – 20kHz\n\nচার্জিং পোর্ট: Type-C (ফাস্ট চার্জিং সাপোর্ট)\n\nস্পেশাল ফিচার: PartyBoost (একাধিক স্পিকার কানেক্ট করার সুবিধা)",
    "descriptionBn": "পাওয়ারফুল সাউন্ড, কমপ্যাক্ট ডিজাইন!\n\nJBL Boombox 4 Mini — মিউজিক হবে এখন যেকোনো জায়গায়!\n\nআপনি কি এমন একটি স্পিকার খুঁজছেন যা সাইজে ছোট কিন্তু সাউন্ডে হবে বিধ্বংসী? তাহলে JBL Boombox 4 Mini আপনার জন্য সেরা চয়েস! জেবিএল-এর সিগনেচার প্রো সাউন্ড আর ডিপ বেস আপনাকে দেবে মিউজিকের এক অনন্য অভিজ্ঞতা। ইনডোর পার্টি হোক বা আউটডোর অ্যাডভেঞ্চার—এটি একাই কাঁপিয়ে দেবে চারপাশ।\n\nকেন কিনবেন JBL Boombox 4 Mini?\n\nবুক কাঁপানো বেস: ছোট বডিতে শক্তিশালী ২০ ওয়াট আউটপুট এবং ডিপ বেস রেডিয়েটর, যা মিউজিকের প্রতিটি বিটকে প্রাণবন্ত করে তোলে।\n\nIP67 ওয়াটার ও ডাস্টপ্রুফ: পুল পার্টি কিংবা হঠাৎ বৃষ্টি—কোনো দুশ্চিন্তা নেই! এটি সম্পূর্ণ ওয়াটারপ্রুফ এবং ধুলোবালি নিরোধক।\n\nদীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ: একবার ফুল চার্জে প্রায় ১০-১২ ঘণ্টা পর্যন্ত নন-স্টপ মিউজিক এনজয় করার সুবিধা।\n\nলেটেস্ট ব্লুটুথ ৫.৩: দ্রুত কানেক্টিভিটি এবং ল্যাগ-ফ্রি অডিওর জন্য এতে ব্যবহার করা হয়েছে সর্বাধুনিক ব্লুটুথ প্রযুক্তি।\n\nপ্রিমিয়াম বিল্ড কোয়ালিটি: মজবুত হ্যান্ডেল এবং রাবারাইজড ফেব্রিক ফিনিশিং এটিকে করেছে দীর্ঘস্থায়ী এবং স্টাইলিশ।\n\nটেকনিক্যাল স্পেসিফিকেশন:\n\nআউটপুট পাওয়ার: 20W RMS\n\nফ্রিকোয়েন্সি: 60Hz – 20kHz\n\nচার্জিং পোর্ট: Type-C (ফাস্ট চার্জিং সাপোর্ট)\n\nস্পেশাল ফিচার: PartyBoost (একাধিক স্পিকার কানেক্ট করার সুবিধা)",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 3,
    "images": [
      "/uploads/products/speaker/6/6242267543905178648-1024x1024.jpg",
      "/uploads/products/speaker/6/6242267543905178649-1024x1024.jpg",
      "/uploads/products/speaker/6/6242267543905178650-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-71",
    "slug": "mini-ups-5v-9v-12v-8800-mah",
    "title": "Mini UPS 5V-9V-12V 8800 mAh",
    "titleBn": "Mini UPS 5V-9V-12V 8800 mAh",
    "brand": "TRS",
    "brandSlug": "trs",
    "mainCategorySlug": "gadgets",
    "mainCategoryName": "Gadgets & Electronics",
    "mainCategoryNameBn": "গ্যাজেটস ও ইলেকট্রনিক্স",
    "categoryId": "cat-ups",
    "categorySlug": "ups",
    "categoryName": "Mini Router UPS",
    "categoryNameBn": "মিনি রাউটার ইউপিএস",
    "price": 122000,
    "compareAt": 179000,
    "rating": 4.8999999999999995,
    "reviewCount": 52,
    "inStock": true,
    "stockQty": 55,
    "sku": "13228",
    "tags": [
      "gadgets",
      "ups",
      "trs",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-71-1",
        "sku": "13228",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 122000,
        "compareAt": 179000,
        "inStock": true,
        "stockQty": 55
      }
    ],
    "highlights": [
      "Brand Name: TRS",
      "Model: TRS QX-603",
      "Application: Wi-Fi router, ONU, Modem, Wireless phone, CCTV",
      "Battery Capacity: 8800 mAh",
      "Battery Backup: 6–7 hr",
      "Type: Multi-Output Mini UPS"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "Mini UPS 5V-9V-12V 8800 mAh",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "Mini UPS 5V-9V-12V 8800 mAh",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "Mini UPS 8800mAh 5V-9V-12V\n\nProduct Details:\n\n• Brand Name: TRS\n\n• Model: TRS QX-603\n\n• Application: Wi-Fi router, ONU, Modem, Wireless phone, CCTV\n\n• Battery Capacity: 8800 mAh\n\n• Battery Backup: 6–7 hr\n\n• Type: Multi-Output Mini UPS\n\n• Output Power (Max.): 25W\n\n• Input Voltage: DC 12V2A\n\n• Output: 5V 12V 12V DC\n\n• Weight: 275 gm",
    "descriptionBn": "Mini UPS 8800mAh 5V-9V-12V\n\nProduct Details:\n\n• Brand Name: TRS\n\n• Model: TRS QX-603\n\n• Application: Wi-Fi router, ONU, Modem, Wireless phone, CCTV\n\n• Battery Capacity: 8800 mAh\n\n• Battery Backup: 6–7 hr\n\n• Type: Multi-Output Mini UPS\n\n• Output Power (Max.): 25W\n\n• Input Voltage: DC 12V2A\n\n• Output: 5V 12V 12V DC\n\n• Weight: 275 gm",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": true,
    "colorHue": 50,
    "images": [
      "/uploads/products/ups/1/0Hghmc3VPTkz9eOy3QIWi255wwA9CYvyaau0g3h8-1024x1024.jpg",
      "/uploads/products/ups/1/GSi5jGJTQj6OgBvnJ5Fd5O7JCewbMbLb6E22hQ6V-1024x1024.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-72",
    "slug": "78-water-proof-premium-3d-design-bed-sheet",
    "title": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "titleBn": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "home-appliance",
    "mainCategoryName": "Home & Living",
    "mainCategoryNameBn": "হোম অ্যাপ্লায়েন্সেস",
    "categoryId": "cat-bed-sheets",
    "categorySlug": "bed-sheets",
    "categoryName": "3D Bed Sheets & Bedding",
    "categoryNameBn": "থ্রিডি বেডশিট ও বেডিং",
    "price": 147000,
    "compareAt": 199900,
    "rating": 5,
    "reviewCount": 14,
    "inStock": true,
    "stockQty": 68,
    "sku": "1141",
    "tags": [
      "home-appliance",
      "bed-sheets",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-72-1",
        "sku": "1141",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 147000,
        "compareAt": 199900,
        "inStock": true,
        "stockQty": 68
      }
    ],
    "highlights": [
      "\udc49এই চাদরের বিশেষত্ব:m",
      "\udc49তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।",
      "এই বেডশিটগুলো ওয়াটারপ্রুফ",
      "এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।",
      "দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "descriptionBn": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 97,
    "images": [
      "/uploads/products/bed-sheets/1/Gemini_Generated_Image_7m3six7m3six7m3s-a4890eb3-d7b8-441b-bae4-542b159cefa5-1024x768.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-73",
    "slug": "78-water-proof-premium-3d-design-bed-sheet-1",
    "title": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "titleBn": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "home-appliance",
    "mainCategoryName": "Home & Living",
    "mainCategoryNameBn": "হোম অ্যাপ্লায়েন্সেস",
    "categoryId": "cat-bed-sheets",
    "categorySlug": "bed-sheets",
    "categoryName": "3D Bed Sheets & Bedding",
    "categoryNameBn": "থ্রিডি বেডশিট ও বেডিং",
    "price": 147000,
    "compareAt": 199900,
    "rating": 4.8,
    "reviewCount": 21,
    "inStock": true,
    "stockQty": 81,
    "sku": "1408",
    "tags": [
      "home-appliance",
      "bed-sheets",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-73-1",
        "sku": "1408",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 147000,
        "compareAt": 199900,
        "inStock": true,
        "stockQty": 81
      }
    ],
    "highlights": [
      "\udc49এই চাদরের বিশেষত্ব:m",
      "\udc49তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।",
      "এই বেডশিটগুলো ওয়াটারপ্রুফ",
      "এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।",
      "দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "descriptionBn": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": true,
    "isNew": true,
    "isBestSeller": false,
    "colorHue": 144,
    "images": [
      "/uploads/products/bed-sheets/2/Gemini_Generated_Image_j83g5kj83g5kj83g-b8afe698-3627-4531-8ba3-d895e6750ae2-1024x768.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  },
  {
    "id": "rhb-prod-74",
    "slug": "78-water-proof-premium-3d-design-bed-sheet-2",
    "title": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "titleBn": "7/8 Water Proof Premium 3D Design Bed Sheet",
    "brand": "Kenakata Choice",
    "brandSlug": "kenakata-choice",
    "mainCategorySlug": "home-appliance",
    "mainCategoryName": "Home & Living",
    "mainCategoryNameBn": "হোম অ্যাপ্লায়েন্সেস",
    "categoryId": "cat-bed-sheets",
    "categorySlug": "bed-sheets",
    "categoryName": "3D Bed Sheets & Bedding",
    "categoryNameBn": "থ্রিডি বেডশিট ও বেডিং",
    "price": 147000,
    "compareAt": 199900,
    "rating": 4.8999999999999995,
    "reviewCount": 28,
    "inStock": true,
    "stockQty": 94,
    "sku": "1142",
    "tags": [
      "home-appliance",
      "bed-sheets",
      "kenakata-choice",
      "verified-merchant",
      "fast-delivery"
    ],
    "variants": [
      {
        "id": "rhb-var-74-1",
        "sku": "1142",
        "title": "Standard",
        "optionValues": {
          "Edition": "Official BD"
        },
        "price": 147000,
        "compareAt": 199900,
        "inStock": true,
        "stockQty": 94
      }
    ],
    "highlights": [
      "\udc49এই চাদরের বিশেষত্ব:m",
      "\udc49তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।",
      "এই বেডশিটগুলো ওয়াটারপ্রুফ",
      "এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।",
      "দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-"
    ],
    "highlightsBn": [
      "১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য",
      "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা",
      "৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি"
    ],
    "specifications": {
      "Model": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "Warranty": "1 Year Brand / Merchant Warranty",
      "Authenticity": "100% Original",
      "Delivery": "2-3 Business Days"
    },
    "specificationsBn": {
      "মডেল": "7/8 Water Proof Premium 3D Design Bed Sheet",
      "ওয়ারেন্টি": "১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি",
      "ডেলিভারি": "২-৩ কর্মদিবস"
    },
    "description": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "descriptionBn": "ওয়াটারপ্রুফ 3D ডিজাইন বেডশিট\"\" ঘরে আনুন আরামের সাথে রঙিন আধুনিকতার ছোঁয়া!\n\nআপনার শোবার ঘরে আনুন প্রিমিয়াম চীনা 3D ডিজাইনের বেডশিট যা শুধু আরামই নয়, ঘরের সুন্দর্য ও বাড়ায় ।\n\nচীনা নকশার সাথে উচ্চ মানের ফিনিশিং আপনার ঘরে এনে দেবে আধুনিকতার ছোঁয়া।\n\n👉এই চাদরের বিশেষত্ব:m\n\nআকর্ষণীয় ডিজাইন:\n\nচীনা 3D বেডশিট প্রিমিয়াম মানের ডিজাইনের যা আপনার ঘরকে দিবে এক নতুন দৃশ্য। আমাদের কাছে এই চাদরের রয়েছে বিভিন্ন রকমের ডিজাইন । প্রতিটি ডিজাইন অত্যন্ত আকর্ষণীয় এবং আধুনিক স্টাইলের সাথে সামঞ্জস্যপূর্ণ।\n\nপ্রিমিয়াম ফ্যাব্রিক:\n\nউন্নতমানের চায়না ভেলভেট কাপড়ে তৈরি, যা আপনার ঘুমের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং মসৃণ।বড় সাইজ:\n\nবেডশিটটির দৈর্ঘ্য 7 ফুট এবং প্রস্থ 6.5 ফুট, যা বড় আকারের বিছানার জন্য একেবারে পারফেক্ট। এতে বিছানা সম্পূর্ণ ঢাকা পড়বে এবং দেখাবে আকর্ষণীয়।\n\nসম্পূর্ণ সেট:\n\nপ্যাকেজে থাকছে ১টি বেডশিট, ২টি বালিশের কাভার এবং ১টি সাইড পিলো কাভার, যা আপনার বিছানার পুরো সেটিংকে করে তুলবে পরিপূর্ণ;\n\nচমৎকার ফিনিশিং যা বেডশিটেকে টেকসই করে এবং মাধুর্যতা বাড়ায়, বারবার ধোয়ার পরও রঙ এবং নকশা থাকে উজ্জ্বল।চীনা শৈল্পিকতা:\n\nচীনা নকশার সমৃদ্ধতা ও আধুনিকতার মিশেলে তৈরি এই বেডশিটটি ঘরের ইন্টেরিয়ারকে দেবে এক ইউনিক স্টাইল।\n\n👉তাই আর দেরি না করে আজই অর্ডার করুন এবং আপনার বেডরুমের সৌন্দর্য বাড়ান ।\n\n𝐍𝐀𝐌𝐄: 𝟑𝐃 𝐃𝐞𝐬𝐢𝐠𝐧 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭\n\n𝐎𝐑𝐈𝐆𝐈𝐍: 𝐂𝐡𝐢𝐧𝐚 𝐌𝐚𝐝𝐞\n\n𝐋𝐄𝐍𝐆𝐓𝐇: 8 𝐅𝐞𝐞𝐭\n\n𝐖𝐈𝐃𝐓𝐇: 7 𝐅𝐞𝐞𝐭\n\n𝐅𝐀𝐁𝐑𝐈𝐂𝐀𝐓𝐈𝐎𝐍: China Velvet\n\n𝐏𝐀𝐑𝐓𝐒: 𝟏 𝐁𝐞𝐝 𝐒𝐡𝐞𝐞𝐭, 𝟐 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭,\n\n𝟏 𝐒𝐢𝐝𝐞 𝐏𝐢𝐥𝐥𝐨𝐰 𝐒𝐡𝐞𝐞𝐭\n\n𝐃𝐄𝐒𝐈𝐆𝐍: 𝟏𝟎+\n\n🔔 বিশেষ দ্রষ্টব্য:-\n\n- এই বেডশিটগুলো ওয়াটারপ্রুফ\n\n- এইগুলো পানিতে ভিজিয়ে ধোয়া যাবে।\n\n- দুই পাশে ১ ফুট করে ২ ফুট জোড়া থাকবে।-\n\n৭/৮ ফিট বিছানার চাদর সম্পূর্ণ ওয়াটারপ্রুফ\n\nবালিশের কভার এবং কোল বালিশের কভার ওয়াটারপ্রুফ ছাড়া",
    "warranty": "1 Year Merchant Warranty",
    "returnPolicy": "7 Days Return",
    "weight": 450,
    "isFeatured": false,
    "isNew": false,
    "isBestSeller": false,
    "colorHue": 191,
    "images": [
      "/uploads/products/bed-sheets/3/Gemini_Generated_Image_5ktqsv5ktqsv5ktq-7813ee20-9ece-41b5-a7de-e264aa848874-1-1024x768.jpg",
      "/uploads/products/bed-sheets/3/Gemini_Generated_Image_5ktqsv5ktqsv5ktq-7813ee20-9ece-41b5-a7de-e264aa848874-1024x768.jpg"
    ],
    "merchant": {
      "name": "Verified Merchant",
      "slug": "verified-merchant",
      "isVerified": true
    }
  }
];

// ── Helper Functions ──

export function formatBDT(amountMinor: number): string {
  const taka = Math.round(amountMinor / 100);
  return `৳${taka.toLocaleString('en-BD')}`;
}

export function formatBDTEn(amountMinor: number): string {
  const taka = Math.round(amountMinor / 100);
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
export const heroBanners = [
  {
    "id": "b1",
    "titleEn": "Premium Gadgets & Home Living",
    "titleBn": "প্রিমিয়াম গ্যাজেট ও হোম লিভিং",
    "subtitleEn": "100% Genuine Electronics, Mobile Accessories & Bedding Sets",
    "subtitleBn": "১০০% অথেনটিক গ্যাজেট, মোবাইল এক্সেসরিজ ও বেডিং সেট",
    "ctaEn": "Explore Catalog",
    "ctaBn": "ক্যাটালগ দেখুন",
    "link": "/categories/gadgets",
    "gradient": "from-brand-charcoal to-slate-800"
  },
  {
    "id": "b2",
    "titleEn": "Smart Electronics & Accessories",
    "titleBn": "স্মার্ট ইলেকট্রনিক্স ও মোবাইল এক্সেসরিজ",
    "subtitleEn": "Top-rated Power Banks, Cooling Fans, Wireless Mics & Chargers",
    "subtitleBn": "সেরা মানের পাওয়ার ব্যাংক, কুলিং ফ্যান, ওয়্যারলেস মাইক ও চার্জার",
    "ctaEn": "Shop Gadgets",
    "ctaBn": "গ্যাজেট কিনুন",
    "link": "/categories/gadgets",
    "gradient": "from-brand-blue to-blue-800"
  },
  {
    "id": "b3",
    "titleEn": "Premium 3D Waterproof Bed Sheets",
    "titleBn": "প্রিমিয়াম ৩ডি ওয়াটারপ্রুফ বেডশিট কালেকশন",
    "subtitleEn": "China Velvet 7/8 Feet Bedding Sets with Pillow Covers",
    "subtitleBn": "চায়না ভেলভেট ৭/৮ ফিট চাদর ও বালিশের কাভার সেট",
    "ctaEn": "Shop Home Living",
    "ctaBn": "হোম লিভিং কিনুন",
    "link": "/categories/home-appliance",
    "gradient": "from-amber-800 to-orange-900"
  }
];

// ── Trending searches ──
export const trendingSearches = [
  "Bluetooth Speaker",
  "Neckband",
  "Power Bank",
  "Rechargeable Fan",
  "Thermal Printer",
  "3D Bed Sheet",
  "Wireless Camera",
  "Mini Phone",
  "RGB Keyboard",
  "Mini UPS"
];
