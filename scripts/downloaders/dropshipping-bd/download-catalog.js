const fs = require('fs');
const path = require('path');
const DropshippingClient = require('./client');

// Paths
const BASE_DATA_DIR = path.resolve(__dirname, '..', '..', '..', 'Marchents', 'dropshipping.com.bd');
const PRODUCTS_JSON_PATH = path.join(BASE_DATA_DIR, 'products_catalog.json');
const MANIFEST_PATH = path.join(BASE_DATA_DIR, 'download_manifest.json');
const IMAGES_DIR = path.join(BASE_DATA_DIR, 'products');

// Ensure directories exist
fs.mkdirSync(BASE_DATA_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
      return { downloadedIds: [], lastPage: 1 };
    }
  }
  return { downloadedIds: [], lastPage: 1 };
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

function loadCatalog() {
  if (fs.existsSync(PRODUCTS_JSON_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveCatalog(catalog) {
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(catalog, null, 2), 'utf8');
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size > 500) return true; // Already downloaded
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`[Image Download Error] ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  let limit = 0;
  let downloadImages = true;
  let startPage = 1;
  let maxPages = 0;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit') limit = parseInt(args[i + 1], 10);
    if (args[i] === '--no-images') downloadImages = false;
    if (args[i] === '--page') startPage = parseInt(args[i + 1], 10);
    if (args[i] === '--max-pages') maxPages = parseInt(args[i + 1], 10);
  }

  console.log('====================================================');
  console.log('🚀 Dropshipping.com.bd Automated Catalog Downloader');
  console.log('====================================================');
  console.log(`Directory: ${BASE_DATA_DIR}`);
  console.log(`Settings: Limit = ${limit || 'ALL'}, Download Images = ${downloadImages}, Start Page = ${startPage}`);

  const client = new DropshippingClient();
  await client.login();

  const manifest = loadManifest();
  const downloadedIdSet = new Set(manifest.downloadedIds || []);
  let catalog = loadCatalog();
  const catalogMap = new Map(catalog.map(p => [p.id, p]));

  // Get initial page to determine total
  const initialPage = await client.getProductsPage(startPage, 30);
  const totalPages = initialPage.last_page;
  const totalProducts = initialPage.total;

  console.log(`\nFound ${totalProducts} total products across ${totalPages} pages in partner portal.\n`);

  const endPage = maxPages ? Math.min(startPage + maxPages - 1, totalPages) : totalPages;
  let totalProcessed = 0;

  for (let page = startPage; page <= endPage; page++) {
    if (limit > 0 && totalProcessed >= limit) break;

    console.log(`\n📄 [Page ${page}/${totalPages}] Fetching page data...`);
    let pageData;
    try {
      pageData = await client.getProductsPage(page, 30);
    } catch (err) {
      console.error(`Failed to fetch page ${page}: ${err.message}. Retrying after 2s...`);
      await new Promise(r => setTimeout(r, 2000));
      pageData = await client.getProductsPage(page, 30);
    }

    const products = pageData.data || [];
    for (const prod of products) {
      if (limit > 0 && totalProcessed >= limit) break;

      const prodId = prod.id;
      const prodDir = path.join(IMAGES_DIR, String(prodId));
      if (downloadImages) {
        fs.mkdirSync(prodDir, { recursive: true });
      }

      console.log(`\n📦 Product #${prod.id} | SKU: ${prod.product_code || 'N/A'} | ${prod.name.slice(0, 60)}...`);
      console.log(`   Wholesale: ৳${prod.sale_price} | Retail: ৳${prod.reselling_price}`);

      // Extract categories & gallery images from detail page if needed
      let categories = [];
      let galleryImages = [];

      if (prod.slug) {
        try {
          const detail = await client.getProductDetails(prod.slug);
          categories = detail.categories;
          galleryImages = detail.galleryImages;
        } catch (e) {
          console.warn(`   Could not fetch full details for slug: ${prod.slug}`);
        }
      }

      // Prepare local image downloads
      const localImages = [];
      if (prod.thumbnail_img) {
        let thumbUrl = prod.thumbnail_img;
        if (!thumbUrl.startsWith('http')) {
          thumbUrl = `https://dropshipping.com.bd/public/storage/${thumbUrl.replace(/^\/+/, '')}`;
        }
        const thumbFilename = path.basename(prod.thumbnail_img);
        const thumbDest = path.join(prodDir, `thumb_${thumbFilename}`);
        if (downloadImages) {
          await downloadFile(thumbUrl, thumbDest);
          localImages.push(`thumb_${thumbFilename}`);
        }
      }

      // Download additional gallery images
      if (downloadImages && galleryImages.length > 0) {
        let imgIndex = 1;
        for (const imgUrl of galleryImages) {
          const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
          const imgFilename = `gallery_${imgIndex}${ext}`;
          const imgDest = path.join(prodDir, imgFilename);
          const ok = await downloadFile(imgUrl, imgDest);
          if (ok && !localImages.includes(imgFilename)) {
            localImages.push(imgFilename);
            imgIndex++;
          }
        }
      }

      // Construct normalized product record
      const fullRecord = {
        id: prod.id,
        sku: prod.product_code || `DSP-${prod.id}`,
        name: prod.name,
        slug: prod.slug,
        wholesalePrice: prod.sale_price,
        retailPrice: prod.reselling_price || prod.reseller_price || prod.sale_price,
        status: prod.status === 1 ? 'ACTIVE' : 'DRAFT',
        thumbnailUrl: prod.thumbnail_img,
        categories: categories.length > 0 ? categories : ['General'],
        detailsHtml: prod.details,
        localImageFiles: localImages,
        fetchedAt: new Date().toISOString()
      };

      catalogMap.set(prod.id, fullRecord);
      downloadedIdSet.add(prod.id);
      totalProcessed++;

      // Create a local text file description inside the product folder (matching previous resellerhub layout)
      if (downloadImages) {
        const textSummary = [
          fullRecord.name,
          `SKU: ${fullRecord.sku}`,
          `Price: ${fullRecord.wholesalePrice} TK`,
          `Customer / Retail Price : ${fullRecord.retailPrice}`,
          `Categories: ${fullRecord.categories.join(' > ')}`,
          '',
          fullRecord.detailsHtml
            .replace(/<\/p>/gi, '\n')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .trim()
        ].join('\n');
        fs.writeFileSync(path.join(prodDir, 'product.txt'), textSummary, 'utf8');
        fs.writeFileSync(path.join(prodDir, 'product.json'), JSON.stringify(fullRecord, null, 2), 'utf8');
      }
    }

    // Save progress after each page
    manifest.downloadedIds = Array.from(downloadedIdSet);
    manifest.lastPage = page;
    manifest.lastUpdated = new Date().toISOString();
    saveManifest(manifest);
    saveCatalog(Array.from(catalogMap.values()));
    console.log(`💾 Saved checkpoint: ${manifest.downloadedIds.length} products saved.`);
  }

  console.log('\n====================================================');
  console.log(`🎉 Download Complete! Total catalog size: ${catalogMap.size} products.`);
  console.log(`📁 Files saved to: ${BASE_DATA_DIR}`);
  console.log('====================================================\n');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal error in downloader:', err);
    process.exit(1);
  });
}
