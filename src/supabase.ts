import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4amxscmJoYm96emV5Y2lwcGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NjI2MTEsImV4cCI6MjAzMzIzODYxMX0.xTbCXwWpvSDIrLArdGk1a2Vlr0n6oEtB9eer8WXEWAM';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://yxjllrbhbozzeycippdk.supabase.co',
  SUPABASE_ANON_KEY
);
