const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function fetchAdminApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('kenakata_admin_token') : null;
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

export async function getAdminOrders(params?: { status?: string; q?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.q) query.set('q', params.q);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const res = await fetchAdminApi<{ items: any[]; meta: any }>(`/orders/admin/queue?${query.toString()}`);
  return res;
}

export async function updateOrderStatus(orderId: string, status: string, note?: string) {
  return fetchAdminApi<any>(`/orders/admin/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, note }),
  });
}

export async function getAdminStockOverview() {
  return fetchAdminApi<any>('/inventory/overview');
}

export async function getAdminWarehouses() {
  return fetchAdminApi<any[]>('/inventory/warehouses');
}

export async function getAdminCoupons() {
  return fetchAdminApi<any[]>('/promotions/admin/coupons');
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid email or password');
  const json = await res.json();
  const data = json.data ?? json;
  if (data.tokens?.accessToken && typeof window !== 'undefined') {
    localStorage.setItem('kenakata_admin_token', data.tokens.accessToken);
    localStorage.setItem('kenakata_admin_user', JSON.stringify(data.admin));
  }
  return data;
}
