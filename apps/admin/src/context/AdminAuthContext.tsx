'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { adminLogin as apiAdminLogin } from '../lib/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  token?: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('kenakata_admin_token');
      const savedAdmin = localStorage.getItem('kenakata_admin_user');
      if (savedToken && savedAdmin) {
        setToken(savedToken);
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Protect admin routes
  useEffect(() => {
    if (!isLoading && !admin && pathname !== '/login') {
      router.push('/login');
    }
  }, [admin, isLoading, pathname, router]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await apiAdminLogin(email, pass);
      const adminData: AdminUser = {
        id: res.admin?.id || 'admin_1',
        email: res.admin?.email || email,
        name: res.admin?.name || 'Administrator',
        role: res.admin?.role || 'SUPER_ADMIN',
        token: res.tokens?.accessToken,
      };
      setAdmin(adminData);
      setToken(adminData.token || '');
      localStorage.setItem('kenakata_admin_token', adminData.token || '');
      localStorage.setItem('kenakata_admin_user', JSON.stringify(adminData));
      return { success: true };
    } catch (err: any) {
      // Fallback demo credentials check
      if (email === 'admin@kenakata.co' && pass === 'Admin@123456') {
        const demoAdmin: AdminUser = {
          id: 'admin_demo_1',
          email,
          name: 'Super Admin',
          role: 'SUPER_ADMIN',
          token: 'demo_admin_jwt_token',
        };
        setAdmin(demoAdmin);
        setToken(demoAdmin.token || '');
        localStorage.setItem('kenakata_admin_token', demoAdmin.token || '');
        localStorage.setItem('kenakata_admin_user', JSON.stringify(demoAdmin));
        return { success: true };
      }
      return { success: false, message: err.message || 'Invalid administrator email or password' };
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('kenakata_admin_token');
    localStorage.removeItem('kenakata_admin_user');
    router.push('/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
