import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Create a Supabase client for server components and API routes
export function createServerSupabaseClient() {
  return createRouteHandlerClient({ cookies });
}
