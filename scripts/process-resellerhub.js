const fs = require('fs');
const path = require('path');

const merchantProductsRoot = path.join(__dirname, '..', 'Marchents', 'resellerhubbd.com', 'products');
const storefrontUploadsRoot = path.join(__dirname, '..', 'apps', 'storefront', 'public', 'uploads', 'products');

// Ensure destination root exists
fs.mkdirSync(storefrontUploadsRoot, { recursive: true });

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Category Mapping
const categoryMeta = {
  'Gadgets': {
    slug: 'gadgets',
    en: 'Gadgets & Electronics',
    bn: 'গ্যাজেটস ও ইলেকট্রনিক্স',
    icon: '⚡',
    subcategories: {
      'Camera': { slug: 'camera', en: 'Security & Action Cameras', bn: 'ক্যামেরা ও সিসিটিভি', icon: '📹' },
      'Earbuds': { slug: 'earbuds', en: 'Earbuds & Audio', bn: 'ইয়ারবাডস ও হেডফোন', icon: '🎧' },
      'Electronics': { slug: 'electronics', en: 'Smart Electronics & Gadgets', bn: 'স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস', icon: '💻' },
      'Fan': { slug: 'fan', en: 'Rechargeable Fans', bn: 'রিচার্জেবল ও পোর্টেবল ফ্যান', icon: '🌀' },
      'Light': { slug: 'light', en: 'Smart Lights & Lamps', bn: 'স্মার্ট লাইট ও ল্যাম্প', icon: '💡' },
      'Mobile Accessories': { slug: 'mobile-accessories', en: 'Mobile Accessories', bn: 'মোবাইল এক্সেসরিজ ও পাওয়ার ব্যাংক', icon: '🔌' },
      'Mobile Phone': { slug: 'mobile-phone', en: 'Feature & Mini Phones', bn: 'ফিচার ও মিনি ফোন', icon: '📱' },
      'Mouse & Keyboard': { slug: 'mouse-keyboard', en: 'Keyboards & Mice', bn: 'কীবোর্ড ও মাউস', icon: '⌨️' },
      'Pillow': { slug: 'pillow', en: 'Comfort & Health Pillows', bn: 'পিলো ও ব্যাক সাপোর্ট', icon: '🛏️' },
      'Printer': { slug: 'printer', en: 'Thermal & Label Printers', bn: 'থার্মাল প্রিন্টার', icon: '🖨️' },
      'Speaker': { slug: 'speaker', en: 'Bluetooth Speakers & Sound', bn: 'ব্লুটুথ স্পিকার ও অডিও', icon: '🔊' },
      'UPS': { slug: 'ups', en: 'Mini Router UPS', bn: 'মিনি রাউটার ইউপিএস', icon: '🔋' },
    }
  },
  'Home Appliance': {
    slug: 'home-appliance',
    en: 'Home & Living',
    bn: 'হোম অ্যাপ্লায়েন্সেস',
    icon: '🏠',
    subcategories: {
      'Bed Sheets': { slug: 'bed-sheets', en: '3D Bed Sheets & Bedding', bn: 'থ্রিডি বেডশিট ও বেডিং', icon: '🛏️' },
    }
  }
};

// Known Brands
const brandLookup = [
  { name: 'boAt', match: /\bboat\b/i, slug: 'boat' },
  { name: 'Recrsi', match: /\brecrsi\b/i, slug: 'recrsi' },
  { name: 'Apple', match: /\b(airpods|apple|iphone)\b/i, slug: 'apple' },
  { name: 'EWA', match: /\bewa\b/i, slug: 'ewa' },
  { name: 'VEN-DENS', match: /\b(ven-dens|ven dens|vd-pb)\b/i, slug: 'ven-dens' },
  { name: 'Awei', match: /\bawei\b/i, slug: 'awei' },
  { name: 'MEMO', match: /\bmemo\b/i, slug: 'memo' },
  { name: 'Hollyland', match: /\bhollyland\b/i, slug: 'hollyland' },
  { name: 'Plokama', match: /\bplokama\b/i, slug: 'plokama' },
  { name: 'NewRixing', match: /\bnewrixing\b/i, slug: 'newrixing' },
  { name: 'Baseus', match: /\bbaseus\b/i, slug: 'baseus' },
  { name: 'Max', match: /\b(max 21|maxtel)\b/i, slug: 'maxtel' },
  { name: 'Winstar', match: /\bwinstar\b/i, slug: 'winstar' },
  { name: 'Sanee', match: /\bsanee\b/i, slug: 'sanee' },
  { name: 'iCon', match: /\bicon\b/i, slug: 'icon' },
  { name: 'Vmax', match: /\bvmax\b/i, slug: 'vmax' },
  { name: 'Titanic', match: /\btitanic\b/i, slug: 'titanic' },
  { name: 'JBL', match: /\bjbl\b/i, slug: 'jbl' },
  { name: 'XTREME', match: /\bxtreme\b/i, slug: 'xtreme' },
  { name: 'TRS', match: /\btrs\b/i, slug: 'trs' },
  { name: 'JYSUPER', match: /\bjysuper\b/i, slug: 'jysuper' },
  { name: 'MiLi', match: /\bmili\b/i, slug: 'mili' },
  { name: 'V380', match: /\bv380\b/i, slug: 'v380' },
  { name: 'Kenakata Choice', match: /.*/, slug: 'kenakata-choice' }
];

function detectBrand(title, text) {
  const combined = `${title} ${text}`;
  for (const b of brandLookup) {
    if (b.match.test(combined)) {
      return { name: b.name, slug: b.slug };
    }
  }
  return { name: 'Kenakata Choice', slug: 'kenakata-choice' };
}

function scanFolder(dir, categoryPath = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory());
  
  const isProduct = subdirs.length > 0 && subdirs.every(s => !isNaN(parseInt(s.name)));
  let list = [];
  
  if (isProduct) {
    subdirs.forEach(s => {
      const prodDir = path.join(dir, s.name);
      const files = fs.readdirSync(prodDir);
      const txtFile = files.find(f => f.endsWith('.txt') || f.endsWith('.md'));
      const images = files.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
      let rawContent = '';
      if (txtFile) {
        rawContent = fs.readFileSync(path.join(prodDir, txtFile), 'utf8');
      }
      list.push({
        mainCategory: categoryPath[0],
        subCategory: categoryPath[1] || categoryPath[0],
        folderId: s.name,
        prodDir,
        images,
        rawContent
      });
    });
  } else {
    subdirs.forEach(s => {
      list = list.concat(scanFolder(path.join(dir, s.name), [...categoryPath, s.name]));
    });
  }
  return list;
}

const rawProducts = scanFolder(merchantProductsRoot);
console.log(`Found ${rawProducts.length} products to process.`);

let processedProducts = [];
let usedSlugs = new Set();
let usedSkus = new Set();
let copiedImagesCount = 0;

function cleanString(str) {
  if (typeof str !== 'string') return str;
  return str.toWellFormed().replace(/[\uD800-\uDFFF]/g, '').trim();
}

rawProducts.forEach((item, index) => {
  const mainMeta = categoryMeta[item.mainCategory] || { slug: slugify(item.mainCategory), en: item.mainCategory, bn: item.mainCategory };
  const subMeta = (categoryMeta[item.mainCategory]?.subcategories?.[item.subCategory]) || {
    slug: slugify(item.subCategory),
    en: item.subCategory,
    bn: item.subCategory
  };

  // Copy images
  const targetSubDir = path.join(storefrontUploadsRoot, subMeta.slug, item.folderId);
  fs.mkdirSync(targetSubDir, { recursive: true });

  const webImages = [];
  item.images.forEach(imgName => {
    const srcPath = path.join(item.prodDir, imgName);
    const destPath = path.join(targetSubDir, imgName);
    fs.copyFileSync(srcPath, destPath);
    copiedImagesCount++;
    webImages.push(`/uploads/products/${subMeta.slug}/${item.folderId}/${imgName}`);
  });

  // Parse details
  const lines = item.rawContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
  let rawTitle = '';
  let sku = '';
  let price = 0;
  let compareAt = null;
  let model = '';
  let specs = {};
  let highlights = [];
  let descriptionLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!rawTitle && !line.includes(':') && !line.startsWith('http') && line.length > 3) {
      rawTitle = line;
      continue;
    }

    const skuMatch = line.match(/^SKU\s*:\s*(.+)$/i);
    if (skuMatch) {
      sku = skuMatch[1].trim();
      continue;
    }

    const retailMatch = line.match(/^(?:Customer\s*\/\s*Retail\s*Price|Retail\s*Price|Customer\s*Price|Regular\s*Price|MRP)\s*:\s*([0-9,]+)(?:\s*TK)?/i);
    if (retailMatch) {
      compareAt = parseInt(retailMatch[1].replace(/,/g, ''), 10);
      continue;
    }

    const priceMatch = line.match(/^(?:Price|Wholesale\s*Price|Offer\s*Price|Selling\s*Price)\s*:\s*([0-9,]+)(?:\s*TK)?/i);
    if (priceMatch) {
      price = parseInt(priceMatch[1].replace(/,/g, ''), 10);
      continue;
    }

    const modelMatch = line.match(/^Model\s*:\s*(.+)$/i);
    if (modelMatch) {
      model = modelMatch[1].trim();
      specs['Model'] = model;
      continue;
    }

    const specMatch = line.match(/^([A-Za-z0-9\s/&_-]+)\s*:\s*(.+)$/);
    if (specMatch && specMatch[1].length < 35) {
      const k = specMatch[1].trim();
      const v = specMatch[2].trim();
      specs[k] = v;
      if (highlights.length < 5 && v.length < 80) {
        highlights.push(`${k}: ${v}`);
      }
      continue;
    }

    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('👉') || line.startsWith('✅')) {
      highlights.push(line.replace(/^[•\-👉✅]\s*/, '').trim());
    }

    descriptionLines.push(line);
  }

  if (!rawTitle) {
    if (model) rawTitle = model;
    else if (lines.length > 0) rawTitle = lines[0].replace(/^#+\s*/, '');
    else rawTitle = `${subMeta.en} Model ${item.folderId}`;
  }

  if (!price && compareAt) {
    price = compareAt;
    compareAt = null;
  }
  if (!price) price = 1200;
  if (!compareAt || compareAt <= price) {
    compareAt = Math.round(price * 1.35);
  }

  if (!sku) {
    sku = `RHB-${subMeta.slug.toUpperCase()}-${item.folderId.padStart(3, '0')}`;
  }

  const brandInfo = detectBrand(rawTitle, item.rawContent);

  // Generate unique slug
  let baseSlug = slugify(rawTitle);
  if (!baseSlug) baseSlug = `${subMeta.slug}-${item.folderId}`;
  let finalSlug = baseSlug;
  let counter = 1;
  while (usedSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  usedSlugs.add(finalSlug);

  const fullDescription = descriptionLines.join('\n\n') || rawTitle;
  const shortDesc = highlights.slice(0, 3).join(' • ') || `${rawTitle} - Official authentic distributor warranty and rapid doorstep delivery across Bangladesh.`;

  // Ensure SKU is unique
  let finalSku = sku || `RHB-${subMeta.slug.toUpperCase().slice(0, 3)}-${item.folderId}`;
  if (usedSkus.has(finalSku)) {
    finalSku = `${finalSku}-${subMeta.slug.slice(0, 3).toUpperCase()}`;
  }
  if (usedSkus.has(finalSku)) {
    finalSku = `${finalSku}-${index + 1}`;
  }
  usedSkus.add(finalSku);

  processedProducts.push({
    id: `rhb-prod-${index + 1}`,
    slug: finalSlug,
    title: rawTitle,
    titleBn: rawTitle,
    brand: brandInfo.name,
    brandSlug: brandInfo.slug,
    mainCategorySlug: mainMeta.slug,
    mainCategoryName: mainMeta.en,
    mainCategoryNameBn: mainMeta.bn,
    categoryId: `cat-${subMeta.slug}`,
    categorySlug: subMeta.slug,
    categoryName: subMeta.en,
    categoryNameBn: subMeta.bn,
    price: price * 100, // in minor poisha
    compareAt: compareAt ? compareAt * 100 : null,
    rating: 4.8 + Math.floor((index % 3)) * 0.1,
    reviewCount: 12 + ((index * 7) % 45),
    inStock: true,
    stockQty: 25 + ((index * 13) % 80),
    sku: finalSku,
    tags: [mainMeta.slug, subMeta.slug, brandInfo.slug, 'verified-merchant', 'fast-delivery'],
    variants: [
      {
        id: `rhb-var-${index + 1}-1`,
        sku: finalSku,
        title: 'Standard',
        optionValues: { Edition: 'Official BD' },
        price: price * 100,
        compareAt: compareAt ? compareAt * 100 : null,
        inStock: true,
        stockQty: 25 + ((index * 13) % 80),
      }
    ],
    highlights: highlights.length > 0 ? highlights.slice(0, 6) : [
      '100% Genuine & Authentic product from verified merchant',
      'Doorstep Delivery across all 64 districts in Bangladesh',
      '7 Days Replacement & Return Guarantee'
    ],
    highlightsBn: [
      '১০০% অথেনটিক এবং ভেরিফায়েড মার্চেন্ট পণ্য',
      'সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি সুবিধা',
      '৭ দিনের সহজ রিটার্ন ও পরিবর্তন পলিসি'
    ],
    specifications: Object.keys(specs).length > 0 ? specs : {
      'Model': rawTitle,
      'Warranty': '1 Year Brand / Merchant Warranty',
      'Authenticity': '100% Original',
      'Delivery': '2-3 Business Days'
    },
    specificationsBn: {
      'মডেল': rawTitle,
      'ওয়ারেন্টি': '১ বছরের অফিসিয়াল মার্চেন্ট ওয়ারেন্টি',
      'ডেলিভারি': '২-৩ কর্মদিবস'
    },
    description: fullDescription,
    descriptionBn: fullDescription,
    warranty: '1 Year Merchant Warranty',
    returnPolicy: '7 Days Return',
    weight: 450,
    isFeatured: index % 4 === 0,
    isNew: index % 3 === 0,
    isBestSeller: index % 5 === 0,
    colorHue: (index * 47) % 360,
    images: webImages.length > 0 ? webImages : ['/banner.png'],
    merchant: {
      name: 'Verified Merchant',
      slug: 'verified-merchant',
      isVerified: true
    }
  });
});

console.log(`Processed ${processedProducts.length} products.`);
console.log(`Copied ${copiedImagesCount} images to ${storefrontUploadsRoot}`);

// Save JSON artifact for consumption by scripts
const catalogJsonPath = path.join(__dirname, '..', 'data', 'resellerhub-catalog.json');
fs.mkdirSync(path.dirname(catalogJsonPath), { recursive: true });
fs.writeFileSync(catalogJsonPath, JSON.stringify(processedProducts, null, 2), 'utf8');
console.log(`Wrote complete catalog JSON to ${catalogJsonPath}`);
