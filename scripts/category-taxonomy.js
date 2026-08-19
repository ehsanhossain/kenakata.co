const fs = require('fs');
const path = require('path');

const dropshippingCatalogPath = path.join(__dirname, '..', 'Marchents', 'dropshipping.com.bd', 'products_catalog.json');
const resellerhubCatalogPath = path.join(__dirname, '..', 'data', 'resellerhub-catalog.json');

function slugify(text) {
  if (!text) return 'general';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'general';
}

function cleanString(str) {
  if (typeof str !== 'string') return str || '';
  return str.toWellFormed().replace(/[\uD800-\uDFFF]/g, '').trim();
}

function buildCategoryTaxonomy(dropshippingProducts, resellerhubProducts) {
  const rootCategories = new Map();

  // Standard predefined root categories
  const predefinedRoots = {
    'gadgets': { slug: 'gadgets', en: 'Gadgets & Electronics', bn: 'গ্যাজেটস ও ইলেকট্রনিক্স', order: 1, sub: {} },
    'home-appliance': { slug: 'home-appliance', en: 'Home & Living', bn: 'হোম অ্যাপ্লায়েন্সেস', order: 2, sub: {} },
    'womens-fashion': { slug: 'womens-fashion', en: "Women's Fashion", bn: 'উইমেন্স ফ্যাশন', order: 3, sub: {} },
    'mens-fashion': { slug: 'mens-fashion', en: "Men's Fashion", bn: 'মেনস ফ্যাশন', order: 4, sub: {} },
    'health-beauty': { slug: 'health-beauty', en: 'Health & Beauty', bn: 'হেলথ ও বিউটি', order: 5, sub: {} },
    'kids-baby': { slug: 'kids-baby', en: 'Kids & Baby Toys', bn: 'কিডস ও খেলনা', order: 6, sub: {} },
    'automotive': { slug: 'automotive', en: 'Automotive & Motorbike', bn: 'মোটর ও বাইক এক্সেসরিজ', order: 7, sub: {} },
    'lifestyle': { slug: 'lifestyle', en: 'Lifestyle & Accessories', bn: 'লাইফস্টাইল ও এক্সেসরিজ', order: 8, sub: {} }
  };

  for (const [k, v] of Object.entries(predefinedRoots)) {
    rootCategories.set(k, v);
  }

  // Helper to map any partner category string to our root and subcategory
  function resolveCategory(catPath) {
    if (!catPath || catPath.length === 0) {
      return { rootSlug: 'gadgets', subSlug: 'electronics', subEn: 'Smart Electronics', subBn: 'স্মার্ট ইলেকট্রনিক্স' };
    }

    const rawRoot = catPath[0] || '';
    const rawSub = catPath[1] || catPath[0] || 'General';
    const cleanRootLower = rawRoot.toLowerCase();
    const cleanSubLower = rawSub.toLowerCase();

    let rootSlug = 'gadgets';
    if (cleanRootLower.includes('women') || cleanRootLower.includes('borka') || cleanSubLower.includes('borka') || cleanSubLower.includes('abaya') || cleanSubLower.includes('hijab')) {
      rootSlug = 'womens-fashion';
    } else if (cleanRootLower.includes('men') || cleanSubLower.includes('shirt') || cleanSubLower.includes('punjabi') || cleanSubLower.includes('pant') || cleanSubLower.includes('trouser')) {
      rootSlug = 'mens-fashion';
    } else if (cleanRootLower.includes('home') || cleanRootLower.includes('kitchen') || cleanSubLower.includes('bed') || cleanSubLower.includes('cook') || cleanSubLower.includes('mug') || cleanSubLower.includes('clean')) {
      rootSlug = 'home-appliance';
    } else if (cleanRootLower.includes('health') || cleanRootLower.includes('beauty') || cleanSubLower.includes('cream') || cleanSubLower.includes('wash') || cleanSubLower.includes('massag') || cleanSubLower.includes('shav')) {
      rootSlug = 'health-beauty';
    } else if (cleanRootLower.includes('kid') || cleanRootLower.includes('baby') || cleanSubLower.includes('toy') || cleanSubLower.includes('book') || cleanSubLower.includes('child')) {
      rootSlug = 'kids-baby';
    } else if (cleanRootLower.includes('car') || cleanRootLower.includes('bike') || cleanRootLower.includes('auto') || cleanSubLower.includes('car') || cleanSubLower.includes('vehicle')) {
      rootSlug = 'automotive';
    } else if (cleanRootLower.includes('gadget') || cleanRootLower.includes('electric') || cleanSubLower.includes('watch') || cleanSubLower.includes('earbud') || cleanSubLower.includes('camera') || cleanSubLower.includes('fan') || cleanSubLower.includes('speaker')) {
      rootSlug = 'gadgets';
    } else {
      rootSlug = 'lifestyle';
    }

    let subSlug = slugify(rawSub);
    if (!subSlug || subSlug === 'all') subSlug = slugify(rawRoot) || 'general';

    const rootObj = rootCategories.get(rootSlug);
    if (!rootObj.sub[subSlug]) {
      rootObj.sub[subSlug] = {
        slug: subSlug,
        en: rawSub,
        bn: rawSub
      };
    }

    return { rootSlug, subSlug, subEn: rawSub, subBn: rawSub };
  }

  return { rootCategories, resolveCategory };
}

module.exports = {
  slugify,
  cleanString,
  buildCategoryTaxonomy
};
