import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
