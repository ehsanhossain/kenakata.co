const fs = require('fs');
const path = require('path');

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

class DropshippingClient {
  constructor(phone = '01728485858', password = '201@Dropshipping') {
    this.phone = phone;
    this.password = password;
    this.baseUrl = 'https://dropshipping.com.bd';
    this.cookies = new Map();
    this.resellerToken = null;
    this.resellerInfo = null;
  }

  _parseSetCookie(response) {
    const getSetCookie = response.headers.getSetCookie 
      ? response.headers.getSetCookie() 
      : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie')] : []);
    
    for (const cookieStr of getSetCookie) {
      const parts = cookieStr.split(';');
      const [nameVal] = parts;
      const idx = nameVal.indexOf('=');
      if (idx !== -1) {
        const name = nameVal.substring(0, idx).trim();
        const value = nameVal.substring(idx + 1).trim();
        this.cookies.set(name, value);
      }
    }
  }

  _getCookieHeader() {
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  async login() {
    console.log('[DropshippingBD] Initializing session...');
    // 1. Initial GET to obtain XSRF-TOKEN
    const initRes = await fetch(`${this.baseUrl}/dropshipper/login`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    this._parseSetCookie(initRes);

    const rawXsrf = this.cookies.get('XSRF-TOKEN');
    const decodedXsrf = rawXsrf ? decodeURIComponent(rawXsrf) : '';

    console.log('[DropshippingBD] Submitting login credentials...');
    // 2. POST to api/reseller/login
    const loginRes = await fetch(`${this.baseUrl}/api/reseller/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': decodedXsrf,
        'Cookie': this._getCookieHeader(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        phone: this.phone,
        password: this.password
      })
    });

    this._parseSetCookie(loginRes);
    const data = await loginRes.json();

    if (!data.status) {
      throw new Error(`Login failed: ${data.message || JSON.stringify(data)}`);
    }

    this.resellerToken = data.reseller_token;
    this.resellerInfo = data.reseller;
    console.log(`[DropshippingBD] Successfully logged in! Reseller ID: ${data.reseller?.id}, Name: ${data.reseller?.name || data.reseller?.phone}`);
    return true;
  }

  async getProductsPage(page = 1, item = 30) {
    const url = `${this.baseUrl}/api/reseller/show/product/list?page=${page}&item=${item}&status=&category_id=&sub_category_id=&sub_sub_category_id=&type=all`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': this._getCookieHeader(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch page ${page}: HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.products;
  }

  async getProductDetails(slug) {
    const url = `${this.baseUrl}/product/${slug}`;
    const res = await fetch(url, {
      headers: {
        'Cookie': this._getCookieHeader(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      return { categories: [], galleryImages: [] };
    }

    const html = await res.text();
    
    // Extract categories
    const categoryMatches = [...html.matchAll(/<a[^>]*class="[^"]*single_product_list_link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
    const categories = categoryMatches
      .map(m => decodeHtmlEntities(m[1].replace(/<[^>]+>/g, '').trim()))
      .filter(Boolean);

    // Extract gallery images from the primary gallery section
    const galleryImages = [];
    
    // 1. Primary carousel images
    const projectPicMatches = [...html.matchAll(/class="[^"]*project-picture[^"]*"[\s\S]*?<img[^>]+src="([^">]+)"/gi)];
    for (const match of projectPicMatches) {
      let src = match[1];
      if (src.includes('images/products/') || src.includes('product_thumbnail_img')) {
        if (!src.startsWith('http')) {
          if (!src.startsWith('/')) src = '/' + src;
          src = `${this.baseUrl}${src}`;
        }
        src = src.replace(/([^:])\/\/+/g, '$1/');
        if (!galleryImages.includes(src)) {
          galleryImages.push(src);
        }
      }
    }

    // 2. If no project-picture found, check the product details area
    if (galleryImages.length === 0) {
      const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/gi)];
      for (const match of imgMatches) {
        let src = match[1];
        if (src.includes('images/products/')) {
          if (!src.startsWith('http')) {
            if (!src.startsWith('/')) src = '/' + src;
            src = `${this.baseUrl}${src}`;
          }
          src = src.replace(/([^:])\/\/+/g, '$1/');
          if (!galleryImages.includes(src) && galleryImages.length < 5) {
            galleryImages.push(src);
          }
        }
      }
    }

    return { categories, galleryImages };
  }
}

module.exports = DropshippingClient;
