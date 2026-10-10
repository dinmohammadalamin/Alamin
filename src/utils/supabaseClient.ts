import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PortfolioData, ContactMessage } from '../types';

const CONFIG_STORAGE_KEY = 'din_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Get configured credentials from env or user settings
export function getSupabaseConfig(): SupabaseConfig {
  let savedConfig: Partial<SupabaseConfig> = {};
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        savedConfig = JSON.parse(stored);
      }
    }
  } catch {
    // Ignore storage issues
  }

  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

  return {
    url: (savedConfig.url || envUrl || '').trim(),
    anonKey: (savedConfig.anonKey || envKey || '').trim()
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    }
  } catch (e) {
    console.error('Failed to save Supabase config', e);
  }
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http') && anonKey.length > 10);
}

let cachedClient: SupabaseClient | null = null;
let lastUsedConfig: string = '';

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  const configSignature = `${config.url}|${config.anonKey}`;
  if (cachedClient && lastUsedConfig === configSignature) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastUsedConfig = configSignature;
    return cachedClient;
  } catch (error) {
    console.error('Failed to create Supabase client', error);
    return null;
  }
}

// SQL schema to run in Supabase SQL editor
export const SUPABASE_SQL_SCHEMA = `-- 1. Table for storing Portfolio Data (JSON sync)
CREATE TABLE IF NOT EXISTS public.portfolio_data (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Grant schema & table permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.portfolio_data TO anon, authenticated;

-- Enable RLS (Row Level Security)
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist to avoid conflict
DROP POLICY IF EXISTS "Public Read Portfolio Data" ON public.portfolio_data;
DROP POLICY IF EXISTS "Allow Upsert Portfolio Data" ON public.portfolio_data;

-- Allow public read
CREATE POLICY "Public Read Portfolio Data"
  ON public.portfolio_data
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow upsert for public/anon or authenticated
CREATE POLICY "Allow Upsert Portfolio Data"
  ON public.portfolio_data
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 2. Table for Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Grant table permissions
GRANT ALL ON TABLE public.contact_messages TO anon, authenticated;

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow Public Insert Messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow Read Messages" ON public.contact_messages;

-- Allow anyone to insert contact messages
CREATE POLICY "Allow Public Insert Messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow read for admin
CREATE POLICY "Allow Read Messages"
  ON public.contact_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);
`;

// Test Supabase connection
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL or Anon Key is missing. Please configure them first.'
    };
  }

  try {
    // Attempt a lightweight query
    const { error } = await client
      .from('portfolio_data')
      .select('id')
      .limit(1);

    if (error) {
      // Check if table just doesn't exist yet
      if (error.code === '42P01') {
        return {
          success: true,
          message: 'Connected to Supabase successfully! (Note: tables not created yet. Please execute the SQL schema below in Supabase SQL Editor).'
        };
      }
      if (error.code === '42501') {
        return {
          success: false,
          message: 'Permission denied (42501): টেবিল অ্যাক্সেস পারমিশন দিতে নিচের আপডেট করা SQL স্ক্রিপ্টটি Supabase SQL Editor-এ রান করুন (GRANT permissions প্রয়োজন)।'
        };
      }
      return {
        success: false,
        message: `Supabase Error (${error.code}): ${error.message}`
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase and verified database tables!'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to connect to Supabase.'
    };
  }
}

// Push local portfolio data to Supabase
export async function syncDataToSupabase(data: PortfolioData): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase is not configured.' };
  }

  try {
    const { error } = await client
      .from('portfolio_data')
      .upsert({
        id: 'main',
        data: data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Portfolio data saved to Supabase successfully!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to sync data to Supabase.' };
  }
}

// Fetch portfolio data from Supabase
export async function fetchDataFromSupabase(): Promise<{ success: boolean; data?: PortfolioData; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase is not configured.' };
  }

  try {
    const { data: rows, error } = await client
      .from('portfolio_data')
      .select('data')
      .eq('id', 'main')
      .limit(1);

    if (error) {
      return { success: false, message: error.message };
    }

    if (rows && rows.length > 0 && rows[0].data) {
      return {
        success: true,
        data: rows[0].data as PortfolioData,
        message: 'Data successfully loaded from Supabase!'
      };
    }

    return {
      success: false,
      message: 'No portfolio data record found in Supabase yet.'
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch data from Supabase.' };
  }
}

// Insert contact message into Supabase
export async function insertMessageToSupabase(msg: ContactMessage): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('contact_messages')
      .insert([{
        id: msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        created_at: msg.createdAt,
        read: msg.read
      }]);

    if (error) {
      console.warn('Could not insert message to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Error saving message to Supabase:', e);
    return false;
  }
}

// Fetch all contact messages from Supabase
export async function fetchMessagesFromSupabase(): Promise<ContactMessage[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data: rows, error } = await client
      .from('contact_messages')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (error || !rows) {
      console.warn('Could not fetch messages from Supabase:', error?.message);
      return [];
    }

    return rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject || '',
      message: r.message,
      createdAt: r.created_at || '',
      read: Boolean(r.read)
    }));
  } catch (e) {
    console.warn('Error reading messages from Supabase:', e);
    return [];
  }
}

