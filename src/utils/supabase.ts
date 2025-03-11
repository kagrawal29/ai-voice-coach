import { createClient } from '@supabase/supabase-js';

// These values should be stored in environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Custom types for user roles
export type UserRole = 'basic' | 'admin';

// Helper function to check if a user is an admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) return false;
  
  return data.role === 'admin';
}

// Helper function to get current user with role
export async function getCurrentUserWithRole() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { user: null, role: null };
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  return {
    user,
    role: error ? 'basic' : data?.role as UserRole
  };
}
