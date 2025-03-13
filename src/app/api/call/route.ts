import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase-server';

// Transform Retell AI data to our schema
function transformCallData(retellData: any, userId: string) {
  return {
    call_id: retellData.call_id,
    user_id: userId,
    agent_id: retellData.agent_id,
    call_status: retellData.call_status || '',
    start_timestamp: retellData.start_timestamp,
    end_timestamp: retellData.end_timestamp,
    transcript: retellData.transcript
  };
}

export async function POST(request: Request) {
  try {
    // Get request body
    const retellData = await request.json();
    
    // Initialize Supabase client for server-side operations
    const supabase = createServerSupabaseClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Transform data
    const callData = transformCallData(retellData, user.id);
    
    // Insert into database
    const { data, error } = await supabase
      .from('call_history')
      .insert(callData)
      .select();
    
    if (error) {
      console.error('Error inserting call data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Return success response
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in call API:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}
