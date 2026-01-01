import { createClient } from '@supabase/supabase-js';

// --- ISI DATA DARI DASHBOARD SUPABASE KAMU ---
// Caranya: Buka Project Settings -> API -> Project URL & anon/public Key
const SUPABASE_URL = 'https://sdqwnjassohqahigdnwi.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcXduamFzc29ocWFoaWdkbndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMzQ4NDAsImV4cCI6MjA4MjgxMDg0MH0.mUsUmS-K0513kPz2K7Xo52E0NgexB7xNXRBkiOzVIOM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);