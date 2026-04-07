import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    `Missing Supabase env vars: ${!supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : ""} ${!supabaseServiceKey ? "SUPABASE_SERVICE_ROLE_KEY" : ""}`.trim()
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
