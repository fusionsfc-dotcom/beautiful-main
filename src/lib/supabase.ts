import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// TypeScript 타입 정의
export interface Profile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Case {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  category: string;
  created_at: string;
  author_id: string;
  author?: Profile;
}

export interface Column {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'cancer' | 'gynecologic_cancer' | 'gastro_cancer' | 'lung_cancer' | 'liver_cancer' | 'other_cancer';
  thumbnail: string | null;
  views?: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  category: 'cancer' | 'rehab' | 'tinnitus' | 'hospital';
  views?: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: 'program' | 'diet' | 'environment' | 'event' | 'etc';
  caption: string | null;
  created_at: string;
  author_id: string;
}