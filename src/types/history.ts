import { UserRole } from '@/utils/supabase';

export interface CallRecord {
  id: string;
  call_id: string;
  user_id: string;
  user_email?: string; // For admin view
  agent_id: string;
  call_status: 'completed' | 'in-progress' | 'failed';
  start_timestamp: number;
  end_timestamp: number | null;
  transcript: string | null;
  created_at: string;
}

export interface CallHistoryListProps {
  calls: CallRecord[] | null;
  isLoading: boolean;
  userRole: UserRole;
  currentUserId: string;
  onStartNewCall?: () => void;
}

export interface CallHistoryItemProps {
  call: CallRecord;
  userRole: UserRole;
  currentUserId: string;
  onViewDetails?: (callId: string) => void;
}
