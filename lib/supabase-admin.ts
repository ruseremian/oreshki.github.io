import "server-only";

import { createClient } from "@supabase/supabase-js";

export class MissingSupabaseEnvError extends Error {
  constructor(public readonly missingVariables: string[]) {
    super(`Missing Supabase server environment variables: ${missingVariables.join(", ")}`);
    this.name = "MissingSupabaseEnvError";
  }
}

export function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  const missingVariables = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !serverKey ? "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY" : null
  ].filter(Boolean) as string[];

  if (missingVariables.length > 0) {
    throw new MissingSupabaseEnvError(missingVariables);
  }

  return createClient(supabaseUrl!, serverKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
