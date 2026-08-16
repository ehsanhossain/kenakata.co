import { products, categories, brands, heroBanners, trendingSearches, searchProducts } from './mock-data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

export async function getProducts(params?: { category?: string; brand?: string; q?: string; sort?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.brand) query.set('brand', params.brand);
  if (params?.q) query.set('q', params.q);
  if (params?.sort) query.set('sort', params.sort);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const apiRes = await fetchApi<{ items: any[]; meta: any }>(`/catalog/products?${query.toString()}`);
  if (apiRes && apiRes.items && apiRes.items.length > 0) {
    return apiRes;
  }

  // Fallback to local mock data
  let filtered = [...products];
  if (params?.category) {
    filtered = filtered.filter((p) => p.categorySlug === params.category);
  }
  if (params?.brand) {
    filtered = filtered.filter((p) => p.brandSlug === params.brand);
  }
  if (params?.q) {
    filtered = searchProducts(params.q);
  }
  return {
    items: filtered,
    meta: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      total: filtered.length,
      totalPages: 1,
    },
  };
}

export async function getProductBySlug(slug: string) {
  const apiRes = await fetchApi<any>(`/catalog/products/${slug}`);
  if (apiRes) return apiRes;

  return products.find((p) => p.slug === slug) || null;
}

export async function getCategories() {
  const apiRes = await fetchApi<any[]>('/catalog/categories');
  if (apiRes && apiRes.length > 0) return apiRes;

  return categories;
}

export async function getBrands() {
  const apiRes = await fetchApi<any[]>('/catalog/brands');
  if (apiRes && apiRes.length > 0) return apiRes;

  return brands;
}

export async function getFlashDeals() {
  const apiRes = await fetchApi<any[]>('/catalog/products/flash-deals');
  if (apiRes && apiRes.length > 0) return apiRes;

  return products.slice(0, 6).map((p, i) => ({
    ...p,
    discountPercent: [20, 25, 15, 30, 10, 35][i % 6],
    soldCount: [45, 120, 85, 32, 64, 90][i % 6],
    totalStock: 150,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export async function getFeaturedProducts() {
  const apiRes = await fetchApi<any[]>('/catalog/products/featured');
  if (apiRes && apiRes.length > 0) return apiRes;

  return products.slice(0, 8);
}

export async function getNewArrivals() {
  const apiRes = await fetchApi<any[]>('/catalog/products/new-arrivals');
  if (apiRes && apiRes.length > 0) return apiRes;

  return products.slice(0, 8);
}

export async function getBestSellers() {
  const apiRes = await fetchApi<any[]>('/catalog/products/best-sellers');
  if (apiRes && apiRes.length > 0) return apiRes;

  return products.slice(4, 12);
}

export async function getHeroBanners() {
  const apiRes = await fetchApi<any[]>('/content/hero-banners');
  if (apiRes && apiRes.length > 0) return apiRes;

  return heroBanners;
}

export async function calculateCheckoutQuote(division: string, items: { variantId: string; quantity: number }[], couponCode?: string) {
  const apiRes = await fetchApi<any>('/checkout/quote', {
    method: 'POST',
    body: JSON.stringify({ division, items, couponCode }),
  });
  return apiRes;
}

export async function placeOrder(orderData: any, idempotencyKey?: string) {
  const apiRes = await fetchApi<any>('/checkout/place-order', {
    method: 'POST',
    headers: idempotencyKey ? { 'idempotency-key': idempotencyKey } : {},
    body: JSON.stringify(orderData),
  });
  return apiRes;
}

export async function trackOrder(orderNumber: string, phone: string) {
  const apiRes = await fetchApi<any>('/orders/track', {
    method: 'POST',
    body: JSON.stringify({ orderNumber, phone }),
  });
  return apiRes;
}
