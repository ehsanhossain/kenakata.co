import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://api.oryzen.app';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3NjUwNjgyMCwiZXhwIjo0OTMyMTgwNDIwLCJyb2xlIjoiYW5vbiJ9.TDo9WBt9JOb90GEV1jXRlcQGwYpUk4DvU0dkgw0qAQA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'kenakata_supabase_auth_session',
  },
});
