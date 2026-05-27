import { createClient } from "@supabase/supabase-js";

// Fallback to empty strings so the module doesn't crash during static build.
// Vercel must have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export type TestimonialRow = {
  id: number;
  name: string;
  last_name: string;
  gender: "male" | "female";
  avatar_url: string;
  comment: string;
  created_at: string;
};
