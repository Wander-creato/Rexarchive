import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

const FALLBACK_SUPABASE_URL = "https://vcqojnuekzzdxrkymvpq.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjcW9qbnVla3p6ZHhya3ltdnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NTg1OTYsImV4cCI6MjA5NDAzNDU5Nn0.I64qoyfgAP1tE2CNX0kO6ThdQZxwTn-gvwfP43VtOIQ";

function pickNonEmpty(primary: string | undefined, fallback: string) {
  if (primary && primary.trim().length > 0) {
    return primary;
  }
  return fallback;
}

export function getSupabaseServerClient() {
  const supabaseUrl = pickNonEmpty(process.env.NEXT_PUBLIC_SUPABASE_URL, FALLBACK_SUPABASE_URL);
  const supabaseKey =
    pickNonEmpty(process.env.SUPABASE_SERVICE_ROLE_KEY, "") ||
    pickNonEmpty(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, "") ||
    FALLBACK_SUPABASE_ANON_KEY;

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
