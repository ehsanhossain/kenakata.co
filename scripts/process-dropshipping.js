const fs = require('fs');
const path = require('path');

const merchantProductsRoot = path.join(__dirname, '..', 'Marchents', 'dropshipping.com.bd', 'products');
const catalogJsonPath = path.join(__dirname, '..', 'Marchents', 'dropshipping.com.bd', 'products_catalog.json');
const storefrontUploadsRoot = path.join(__dirname, '..', 'apps', 'storefront', 'public', 'uploads', 'products', 'dropshipping-bd');

// Ensure destination exists
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

// Category Mapping from Dropshipping BD to Kenakata
const categoryMap = {
  "gadgets-electronics": { slug: 'gadgets', en: 'Gadgets & Electronics', bn: 'গ্যাজেটস ও ইলেকট্রনিক্স' },
  "home-lifestyle": { slug: 'home-appliance', en: 'Home & Living', bn: 'হোম অ্যাপ্লায়েন্সেস' },
  "womens-fashion": { slug: 'womens-fashion', en: "Women's Fashion", bn: 'উইমেন্স ফ্যাশন' },
  "mens-fashion": { slug: 'mens-fashion', en: "Men's Fashion", bn: 'মেনস ফ্যাশন' },
  "health-beauty": { slug: 'health-beauty', en: 'Health & Beauty', bn: 'হেলথ ও বিউটি' },
  "kids-baby": { slug: 'kids-baby', en: 'Kids & Baby Toys', bn: 'কিডস ও খেলনা' }
};

// Known Brands lookup
const brandLookup = [
  { name: 'boAt', match: /\bboat\b/i, slug: 'boat' },
  { name: 'Apple', match: /\b(apple|iphone|airpods)\b/i, slug: 'apple' },
  { name: 'Baseus', match: /\bbaseus\b/i, slug: 'baseus' },
  { name: 'Awei', match: /\bawei\b/i, slug: 'awei' },
  { name: 'JBL', match: /\bjbl\b/i, slug: 'jbl' },
  { name: 'Havit', match: /\bhavit\b/i, slug: 'havit' },
  { name: 'Remax', match: /\bremax\b/i, slug: 'remax' },
  { name: 'MEIJUJI', match: /\bmeijuji\b/i, slug: 'meijuji' },
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

function processDropshippingProducts() {
  if (!fs.existsSync(catalogJsonPath)) {
    console.error('No products_catalog.json found. Run the downloader first!');
    return;
  }

  const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));
  console.log(`Found ${catalog.length} downloaded products to process into Kenakata.`);

  const processed = [];
  let copiedImages = 0;

  for (const prod of catalog) {
    const rawCategories = prod.categories || ['General'];
    const mainCategoryRaw = rawCategories[0] || 'General';
    const subCategoryRaw = rawCategories[1] || mainCategoryRaw;

    const mainCategorySlug = slugify(mainCategoryRaw);
    const subCategorySlug = slugify(subCategoryRaw);

    const categoryInfo = categoryMap[mainCategorySlug] || {
      slug: mainCategorySlug || 'general',
      en: mainCategoryRaw,
      bn: mainCategoryRaw
    };

    // Copy images to Storefront public uploads
    const targetDir = path.join(storefrontUploadsRoot, String(prod.id));
    fs.mkdirSync(targetDir, { recursive: true });

    const prodSrcDir = path.join(merchantProductsRoot, String(prod.id));
    const webImageUrls = [];

    if (fs.existsSync(prodSrcDir)) {
      const files = fs.readdirSync(prodSrcDir);
      const imgFiles = files.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
      
      for (const img of imgFiles) {
        const src = path.join(prodSrcDir, img);
        const dest = path.join(targetDir, img);
        fs.copyFileSync(src, dest);
        copiedImages++;
        webImageUrls.push(`/uploads/products/dropshipping-bd/${prod.id}/${img}`);
      }
    }

    const brand = detectBrand(prod.name, prod.detailsHtml);

    processed.push({
      id: `DSP-${prod.id}`,
      externalId: prod.id,
      sku: prod.sku,
      title: prod.name,
      slug: prod.slug || slugify(prod.name) + `-${prod.id}`,
      category: categoryInfo,
      subCategory: { slug: subCategorySlug, name: subCategoryRaw },
      brand,
      wholesalePrice: prod.wholesalePrice,
      regularPrice: prod.retailPrice,
      compareAtPrice: Math.round(prod.retailPrice * 1.25),
      images: webImageUrls,
      thumbnail: webImageUrls[0] || '',
      descriptionHtml: prod.detailsHtml,
      status: prod.status || 'ACTIVE'
    });
  }

  const outputPath = path.join(__dirname, '..', 'data', 'dropshipping-bd-processed.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2), 'utf8');

  console.log(`\n✅ Processed ${processed.length} products with ${copiedImages} images!`);
  console.log(`📄 Saved to: ${outputPath}`);
}

if (require.main === module) {
  processDropshippingProducts();
}

module.exports = processDropshippingProducts;
