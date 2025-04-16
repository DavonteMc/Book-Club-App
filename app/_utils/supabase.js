import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Access the supabase database
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Provide the necessary key to access the database

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
