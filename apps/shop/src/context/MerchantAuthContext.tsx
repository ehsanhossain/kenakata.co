'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type MerchantStatus = 'PENDING_ONBOARDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface ShopInfo {
  id: string;
  name: string;
  slug: string;
  entityType: string;
  tradeLicenseNo?: string;
  tinNo?: string;
  binNo?: string;
  nidNo?: string;
  division?: string;
  district?: string;
  fullAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  isVerified: boolean;
  rating?: number;
  totalSalesMinor?: number;
}

export interface MerchantUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: MerchantStatus;
  rejectionReason?: string | null;
  shop: ShopInfo;
}

interface MerchantAuthContextType {
  merchant: MerchantUser | null;
  token: string | null;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<boolean>;
  register: (data: { name: string; email: string; phone: string; shopName: string; password?: string }) => Promise<boolean>;
  switchDemoMerchant: (role: 'APPROVED' | 'UNDER_REVIEW' | 'REJECTED') => void;
  updateShopData: (partial: Partial<ShopInfo>) => void;
  updateStatus: (newStatus: MerchantStatus, reason?: string) => void;
  logout: () => void;
}

const MerchantAuthContext = createContext<MerchantAuthContextType | undefined>(undefined);

// Demo Merchant Profiles for testing
const DEMO_MERCHANTS: Record<string, MerchantUser> = {
  APPROVED: {
    id: 'merch-dhk-01',
    name: 'Tanvir Hossain',
    email: 'dhaka.electronics@kenakata.co',
    phone: '+8801711223344',
    status: 'APPROVED',
    shop: {
      id: 'shop-dhk-01',
      name: 'Dhaka Tech Hub',
      slug: 'dhaka-tech-hub',
      entityType: 'PRIVATE_LIMITED',
      tradeLicenseNo: 'TL-DHK-2024-9812',
      tinNo: '123456789012',
      binNo: '987654321098',
      nidNo: '19902692812345678',
      division: 'Dhaka',
      district: 'Dhaka',
      fullAddress: 'Level 4, BCS Computer City, Dhaka 1205',
      contactPhone: '+8801711223344',
      contactEmail: 'dhaka.electronics@kenakata.co',
      isVerified: true,
      rating: 4.9,
    },
  },
  UNDER_REVIEW: {
    id: 'merch-ctg-01',
    name: 'Rashedul Karim',
    email: 'ctg.fashion@kenakata.co',
    phone: '+8801819988776',
    status: 'UNDER_REVIEW',
    shop: {
      id: 'shop-ctg-01',
      name: 'Ctg Lifestyle',
      slug: 'ctg-lifestyle',
      entityType: 'SOLE_PROPRIETORSHIP',
      tradeLicenseNo: 'TL-CTG-2025-4519',
      tinNo: '987654321987',
      nidNo: '19882691234567890',
      division: 'Chattogram',
      district: 'Chattogram',
      fullAddress: 'Shop 12, Level 2, GEC Circle Plaza, Agrabad, Chattogram 4000',
      contactPhone: '+8801819988776',
      contactEmail: 'ctg.fashion@kenakata.co',
      isVerified: false,
    },
  },
  REJECTED: {
    id: 'merch-syl-01',
    name: 'Nazmul Islam',
    email: 'sylhet.organic@kenakata.co',
    phone: '+8801915544332',
    status: 'REJECTED',
    rejectionReason: 'Trade License expired on December 31, 2025. Please upload a renewed 2026-2027 valid copy.',
    shop: {
      id: 'shop-syl-01',
      name: 'Sylhet Tea & Agro',
      slug: 'sylhet-tea-agro',
      entityType: 'PARTNERSHIP',
      tradeLicenseNo: 'TL-SYL-2023-1102',
      tinNo: '556677889900',
      nidNo: '19922693456789012',
      division: 'Sylhet',
      district: 'Sylhet',
      fullAddress: 'Zindabazar Commercial Area, Sylhet 3100',
      contactPhone: '+8801915544332',
      contactEmail: 'sylhet.organic@kenakata.co',
      isVerified: false,
    },
  },
};

export const MerchantAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [merchant, setMerchant] = useState<MerchantUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check saved session
    const saved = localStorage.getItem('kenakata_merchant_user');
    const savedToken = localStorage.getItem('kenakata_merchant_token');

    if (saved && savedToken) {
      try {
        setMerchant(JSON.parse(saved));
        setToken(savedToken);
      } catch (e) {
        // Fallback default
        setMerchant(DEMO_MERCHANTS.APPROVED);
        setToken('mock-jwt-token-approved');
      }
    } else {
      // Default to live approved seller for convenient preview
      setMerchant(DEMO_MERCHANTS.APPROVED);
      setToken('mock-jwt-token-approved');
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    // Find matching demo or API
    let matched = Object.values(DEMO_MERCHANTS).find(
      (m) => m.email.toLowerCase() === emailOrPhone.toLowerCase() || m.phone === emailOrPhone
    );

    if (!matched) {
      matched = DEMO_MERCHANTS.APPROVED;
    }

    const mockToken = `jwt-merchant-${matched.id}`;
    setMerchant(matched);
    setToken(mockToken);
    localStorage.setItem('kenakata_merchant_user', JSON.stringify(matched));
    localStorage.setItem('kenakata_merchant_token', mockToken);
    setIsLoading(false);

    if (matched.status === 'PENDING_ONBOARDING' || matched.status === 'UNDER_REVIEW') {
      router.push('/onboarding');
    } else {
      router.push('/');
    }
    return true;
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    shopName: string;
    password?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    const newMerchant: MerchantUser = {
      id: `merch-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'PENDING_ONBOARDING',
      shop: {
        id: `shop-${Date.now()}`,
        name: data.shopName,
        slug: data.shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        entityType: 'SOLE_PROPRIETORSHIP',
        contactEmail: data.email,
        contactPhone: data.phone,
        isVerified: false,
      },
    };

    const mockToken = `jwt-merchant-${newMerchant.id}`;
    setMerchant(newMerchant);
    setToken(mockToken);
    localStorage.setItem('kenakata_merchant_user', JSON.stringify(newMerchant));
    localStorage.setItem('kenakata_merchant_token', mockToken);
    setIsLoading(false);

    router.push('/onboarding');
    return true;
  };

  const switchDemoMerchant = (role: 'APPROVED' | 'UNDER_REVIEW' | 'REJECTED') => {
    const target = DEMO_MERCHANTS[role];
    setMerchant(target);
    setToken(`jwt-merchant-${target.id}`);
    localStorage.setItem('kenakata_merchant_user', JSON.stringify(target));
    localStorage.setItem('kenakata_merchant_token', `jwt-merchant-${target.id}`);

    if (role === 'UNDER_REVIEW' || role === 'REJECTED') {
      router.push('/onboarding');
    } else {
      router.push('/');
    }
  };

  const updateShopData = (partial: Partial<ShopInfo>) => {
    if (!merchant) return;
    const updated = {
      ...merchant,
      shop: { ...merchant.shop, ...partial },
    };
    setMerchant(updated);
    localStorage.setItem('kenakata_merchant_user', JSON.stringify(updated));
  };

  const updateStatus = (newStatus: MerchantStatus, reason?: string) => {
    if (!merchant) return;
    const updated = {
      ...merchant,
      status: newStatus,
      rejectionReason: reason || null,
    };
    setMerchant(updated);
    localStorage.setItem('kenakata_merchant_user', JSON.stringify(updated));
  };

  const logout = () => {
    setMerchant(null);
    setToken(null);
    localStorage.removeItem('kenakata_merchant_user');
    localStorage.removeItem('kenakata_merchant_token');
    router.push('/login');
  };

  return (
    <MerchantAuthContext.Provider
      value={{
        merchant,
        token,
        isLoading,
        login,
        register,
        switchDemoMerchant,
        updateShopData,
        updateStatus,
        logout,
      }}
    >
      {children}
    </MerchantAuthContext.Provider>
  );
};

export const useMerchantAuth = () => {
  const context = useContext(MerchantAuthContext);
  if (!context) {
    throw new Error('useMerchantAuth must be used within a MerchantAuthProvider');
  }
  return context;
};
