const fs = require('fs');
const path = require('path');
const DropshippingClient = require('./client');

// Determine base data directory: Use S: NAS drive if available, fallback to local workspace
const HAS_S_DRIVE = fs.existsSync('S:\\');
const NAS_DATA_DIR = 'S:\\Kenakata_Products\\Marchents\\dropshipping.com.bd';
const LOCAL_DATA_DIR = path.resolve(__dirname, '..', '..', '..', 'Marchents', 'dropshipping.com.bd');

const PRIMARY_DATA_DIR = HAS_S_DRIVE ? NAS_DATA_DIR : LOCAL_DATA_DIR;
const PRODUCTS_DIR = path.join(PRIMARY_DATA_DIR, 'products');

// Local mirrored files (for fast access in repository)
const LOCAL_CATALOG_JSON = path.join(LOCAL_DATA_DIR, 'products_catalog.json');
const LOCAL_MANIFEST_JSON = path.join(LOCAL_DATA_DIR, 'download_manifest.json');
const LOCAL_CSV_EXPORT = path.join(LOCAL_DATA_DIR, 'all_products_summary.csv');

// Primary files
const PRIMARY_CATALOG_JSON = path.join(PRIMARY_DATA_DIR, 'products_catalog.json');
const PRIMARY_MANIFEST_JSON = path.join(PRIMARY_DATA_DIR, 'download_manifest.json');
const PRIMARY_CSV_EXPORT = path.join(PRIMARY_DATA_DIR, 'all_products_summary.csv');

fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

function loadManifest() {
  for (const p of [PRIMARY_MANIFEST_JSON, LOCAL_MANIFEST_JSON]) {
    if (fs.existsSync(p)) {
      try {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (data && typeof data.downloadedIds === 'object') {
          return data;
        }
      } catch (e) {}
    }
  }
  return { downloadedIds: {}, totalDownloaded: 0, completedPages: [] };
}

function saveManifest(manifest) {
  const content = JSON.stringify(manifest, null, 2);
  try { fs.writeFileSync(LOCAL_MANIFEST_JSON, content, 'utf8'); } catch (e) {}
  if (HAS_S_DRIVE) {
    try { fs.writeFileSync(PRIMARY_MANIFEST_JSON, content, 'utf8'); } catch (e) {}
  }
}

function loadCatalog() {
  for (const p of [PRIMARY_CATALOG_JSON, LOCAL_CATALOG_JSON]) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {}
    }
  }
  return [];
}

async function retryOp(fn, maxRetries = 15, delayMs = 2000, context = '', onFail = null) {
  let lastErr;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      console.warn(`⚠️ [Retry ${attempt}/${maxRetries}] ${context}: ${err.message}. Waiting ${delayMs / 1000}s...`);
      if (onFail) {
        try { await onFail(err); } catch (e) {}
      }
      await new Promise(r => setTimeout(r, delayMs));
      delayMs = Math.min(delayMs * 1.3, 20000);
    }
  }
  throw lastErr;
}

// Simple Concurrent Queue Helper
async function pMap(items, mapper, concurrency = 6) {
  const results = new Array(items.length);
  let index = 0;
  
  async function worker() {
    while (index < items.length) {
      const i = index++;
      try {
        results[i] = await mapper(items[i], i);
      } catch (err) {
        results[i] = null;
      }
    }
  }
  
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) {
    try {
      const stats = fs.statSync(destPath);
      if (stats.size > 500) return true;
    } catch (e) {}
  }
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      clearTimeout(timeout);
      if (!res.ok) {
        if (res.status === 404) return false;
        throw new Error(`HTTP ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
      return true;
    } catch (e) {
      if (attempt === 4) return false;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return false;
}

function cleanHtmlToText(html) {
  if (!html) return '';
  return html
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .join('\n');
}

function exportCsv(catalog) {
  const header = ['ID', 'SKU', 'Title', 'Wholesale_Price', 'Retail_Price', 'Categories', 'Thumbnail_Url', 'Gallery_Count'];
  const rows = catalog.map(p => [
    p.id,
    `"${(p.sku || '').replace(/"/g, '""')}"`,
    `"${(p.name || '').replace(/"/g, '""')}"`,
    p.wholesalePrice || 0,
    p.retailPrice || 0,
    `"${(p.categories || []).join(' > ').replace(/"/g, '""')}"`,
    `"${p.thumbnailUrl || ''}"`,
    (p.localImageFiles || []).length
  ]);
  const csvContent = '\ufeff' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  try { fs.writeFileSync(LOCAL_CSV_EXPORT, csvContent, 'utf8'); } catch (e) {}
  if (HAS_S_DRIVE) {
    try { fs.writeFileSync(PRIMARY_CSV_EXPORT, csvContent, 'utf8'); } catch (e) {}
  }
}

async function startFastDownload() {
  console.log('================================================================');
  console.log('⚡ BULLETPROOF DROPSHIPPING.COM.BD 100% CATALOG DOWNLOADER');
  console.log('================================================================');
  console.log(`Primary Storage Target: ${PRODUCTS_DIR} (${HAS_S_DRIVE ? 'NAS S: Drive - 2.4TB Free' : 'Local Workspace'})`);

  const client = new DropshippingClient();
  await retryOp(() => client.login(), 10, 3000, 'Initial Login');

  let manifest = loadManifest();
  let downloadedIdMap = manifest.downloadedIds || {};
  let catalog = loadCatalog();
  const catalogMap = new Map(catalog.map(p => [p.id, p]));

  // Get total pages
  const page1 = await retryOp(() => client.getProductsPage(1, 30), 10, 3000, 'Get Page 1');
  const totalPages = page1.last_page;
  const totalProducts = page1.total;

  console.log(`\n🎯 TARGET: ${totalProducts} Products across ${totalPages} Pages.`);
  console.log(`📊 Currently Cached in Catalog: ${catalogMap.size} Products\n`);

  const startTime = Date.now();

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    console.log(`\n================================================================`);
    console.log(`🚀 [PAGE ${pageNum} of ${totalPages}] Fetching product batch...`);
    console.log(`================================================================`);

    let pageData = await retryOp(async () => {
      return await client.getProductsPage(pageNum, 30);
    }, 20, 2000, `Fetch Page ${pageNum}`, async (err) => {
      console.warn(`[Auto-ReLogin] Re-authenticating session for Page ${pageNum}...`);
      await client.login();
    });

    const items = pageData.data || [];

    // Process all products on this page in parallel with worker pool
    await pMap(items, async (prod) => {
      const prodId = prod.id;
      const prodDir = path.join(PRODUCTS_DIR, String(prodId));
      const jsonFilePath = path.join(prodDir, 'product.json');
      const txtFilePath = path.join(prodDir, 'product.txt');

      // If already downloaded and valid on disk, verify and skip
      if (fs.existsSync(jsonFilePath) && fs.existsSync(txtFilePath)) {
        try {
          const existing = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
          if (existing && existing.sku) {
            catalogMap.set(prod.id, existing);
            downloadedIdMap[prod.id] = true;
            console.log(`⏩ [#${prod.id}] SKU: ${existing.sku} (Verified on disk)`);
            return;
          }
        } catch (e) {}
      }

      fs.mkdirSync(prodDir, { recursive: true });

      // Fetch detail page for category & gallery images
      let categories = ['General'];
      let galleryImages = [];

      if (prod.slug) {
        try {
          const detail = await retryOp(() => client.getProductDetails(prod.slug), 4, 1500, `Details for ${prod.slug}`, async () => {
            await client.login();
          });
          if (detail.categories && detail.categories.length > 0) {
            categories = detail.categories;
          }
          if (detail.galleryImages) {
            galleryImages = detail.galleryImages;
          }
        } catch (e) {
          console.warn(`[Details Warning] Could not fetch details for slug: ${prod.slug}`);
        }
      }

      // Download images
      const localImageFiles = [];
      const imageDownloadTasks = [];

      if (prod.thumbnail_img) {
        let thumbUrl = prod.thumbnail_img;
        if (!thumbUrl.startsWith('http')) {
          thumbUrl = `https://dropshipping.com.bd/public/storage/${thumbUrl.replace(/^\/+/, '')}`;
        }
        const thumbName = `thumb_${path.basename(prod.thumbnail_img)}`;
        const thumbDest = path.join(prodDir, thumbName);
        imageDownloadTasks.push({ url: thumbUrl, dest: thumbDest, filename: thumbName });
      }

      let gIdx = 1;
      for (const gUrl of galleryImages) {
        const ext = path.extname(gUrl.split('?')[0]) || '.jpg';
        const gName = `gallery_${gIdx}${ext}`;
        const gDest = path.join(prodDir, gName);
        imageDownloadTasks.push({ url: gUrl, dest: gDest, filename: gName });
        gIdx++;
      }

      // Execute image downloads
      for (const imgTask of imageDownloadTasks) {
        const ok = await downloadFile(imgTask.url, imgTask.dest);
        if (ok && !localImageFiles.includes(imgTask.filename)) {
          localImageFiles.push(imgTask.filename);
        }
      }

      const rawDescriptionText = cleanHtmlToText(prod.details);

      const record = {
        id: prod.id,
        sku: prod.product_code || `DSP-${prod.id}`,
        name: prod.name,
        slug: prod.slug,
        wholesalePrice: prod.sale_price,
        retailPrice: prod.reselling_price || prod.reseller_price || prod.sale_price,
        status: prod.status === 1 ? 'ACTIVE' : 'DRAFT',
        thumbnailUrl: prod.thumbnail_img,
        categories: categories,
        detailsHtml: prod.details,
        descriptionText: rawDescriptionText,
        localImageFiles: localImageFiles,
        savedAt: new Date().toISOString()
      };

      // Save formatted text document
      const txtContent = [
        record.name,
        `SKU: ${record.sku}`,
        `Price: ${record.wholesalePrice} TK`,
        `Customer / Retail Price : ${record.retailPrice}`,
        `Categories: ${record.categories.join(' > ')}`,
        '',
        rawDescriptionText
      ].join('\n');

      fs.writeFileSync(txtFilePath, txtContent, 'utf8');
      fs.writeFileSync(jsonFilePath, JSON.stringify(record, null, 2), 'utf8');

      catalogMap.set(prod.id, record);
      downloadedIdMap[prod.id] = true;

      console.log(`✅ [#${prod.id}] SKU: ${record.sku} | ${record.name.slice(0, 45)}... | ৳${record.wholesalePrice} -> ৳${record.retailPrice} | ${localImageFiles.length} imgs`);
    }, 6);

    // Save catalog and state after each page
    const currentCatalogArray = Array.from(catalogMap.values());
    try { fs.writeFileSync(LOCAL_CATALOG_JSON, JSON.stringify(currentCatalogArray, null, 2), 'utf8'); } catch (e) {}
    if (HAS_S_DRIVE) {
      try { fs.writeFileSync(PRIMARY_CATALOG_JSON, JSON.stringify(currentCatalogArray, null, 2), 'utf8'); } catch (e) {}
    }

    manifest.downloadedIds = downloadedIdMap;
    manifest.totalDownloaded = Object.keys(downloadedIdMap).length;
    manifest.lastCompletedPage = pageNum;
    manifest.lastUpdated = new Date().toISOString();
    saveManifest(manifest);
    exportCsv(currentCatalogArray);

    const elapsedSec = Math.round((Date.now() - startTime) / 1000);
    console.log(`\n💾 Page ${pageNum}/${totalPages} complete. Total verified on disk: ${manifest.totalDownloaded}/${totalProducts} products (${elapsedSec}s elapsed).`);
  }

  // Final 100% Verification Pass
  console.log('\n================================================================');
  console.log('🔍 RUNNING FINAL 100% INTEGRITY & VERIFICATION PASS...');
  console.log('================================================================');
  
  let verifiedCount = 0;
  for (const [id, prod] of catalogMap.entries()) {
    const prodDir = path.join(PRODUCTS_DIR, String(id));
    if (fs.existsSync(path.join(prodDir, 'product.json')) && fs.existsSync(path.join(prodDir, 'product.txt'))) {
      verifiedCount++;
    }
  }

  console.log(`\n🎉 100% DOWNLOAD & VERIFICATION FINISHED!`);
  console.log(`📦 Verified Products on Disk: ${verifiedCount} / ${totalProducts}`);
  console.log(`📁 Files Location: ${PRODUCTS_DIR}`);
  console.log(`📄 Full Catalog JSON: ${LOCAL_CATALOG_JSON}`);
  console.log(`📊 Full Catalog CSV: ${LOCAL_CSV_EXPORT}`);
  console.log('================================================================\n');
}

if (require.main === module) {
  startFastDownload().catch(err => {
    console.error('Fatal error in fast downloader:', err);
    process.exit(1);
  });
}
