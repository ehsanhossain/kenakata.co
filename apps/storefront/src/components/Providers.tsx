'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthModal } from './auth/AuthModal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <AuthModal />
      </AuthProvider>
    </LanguageProvider>
  );
}
