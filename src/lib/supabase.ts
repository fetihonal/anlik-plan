import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Database types
export type Profile = {
  id: string;
  email: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type EventFormat = {
  id: string;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  spots_left: number;
  total_spots: number;
  images: string[];
  host: {
    name: string;
    image: string;
    bio: string;
  };
  included_items: string[];
  requirements: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  
  // Client-side properties (not in database)
  spotsLeft?: number;
  totalSpots?: number;
  includedItems?: string[];
};

export type EventParticipant = {
  id: string;
  event_id: string;
  user_id: string;
  status: string;
  payment_status: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  event_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type View = {
  id: string;
  event_id: string;
  user_id: string | null;
  viewed_at: string;
};

/**
 * Create a Supabase client for use in browser components (Client Components)
 * This uses createClientComponentClient which is safe to use in the browser
 */
export const createBrowserClient = () => {
  return createClientComponentClient();
};

/**
 * Create a Supabase client for server-side operations
 * This should only be used in Server Components or API routes
 */
export const createServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
};
