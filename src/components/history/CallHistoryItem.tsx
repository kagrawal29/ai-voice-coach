'use client';

import { useRouter } from 'next/navigation';
import { CallHistoryItemProps } from '@/types/history';

export function CallHistoryItem({
  call,
  userRole,
  currentUserId,
  onViewDetails
}: CallHistoryItemProps) {
  const router = useRouter();

  // Format date
  const formattedDate = new Date(call.created_at).toLocaleString();
  
  // Calculate call duration if available
  const getDuration = () => {
    if (call.start_timestamp && call.end_timestamp) {
      const durationMs = call.end_timestamp - call.start_timestamp;
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
    return 'N/A';
  };

  // No status display as per requirements

  // Handle click for viewing details
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(call.call_id);
    } else {
      router.push(`/call/${call.call_id}`);
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-indigo-600 truncate">
          Call ID: {call.call_id}
        </p>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-gray-500">
            <span>Agent: {call.agent_id}</span>
          </p>
          {userRole === 'admin' && call.user_id !== currentUserId && (
            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
              <span>User: {call.user_email || call.user_id}</span>
            </p>
          )}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
          <p>
            {formattedDate} • Duration: {getDuration()}
          </p>
        </div>
      </div>
      {call.transcript && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 truncate">
            {call.transcript.substring(0, 100)}...
          </p>
        </div>
      )}
      <div className="mt-3">
        <button
          onClick={handleViewDetails}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Details
        </button>
      </div>
    </li>
  );
}
