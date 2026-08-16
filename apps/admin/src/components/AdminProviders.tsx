'use client';

import React from 'react';
import { AdminAuthProvider } from '../context/AdminAuthContext';

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
