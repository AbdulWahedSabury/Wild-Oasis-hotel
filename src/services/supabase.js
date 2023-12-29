import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pawqryafgeunwnokqkhs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3FyeWFmZ2V1bndub2txa2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MTE4MTMsImV4cCI6MjAxODk4NzgxM30.IEE6Fq_vbjagQyWGvxlr1j7RTGD7kB5M2WE5RGbShN8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
