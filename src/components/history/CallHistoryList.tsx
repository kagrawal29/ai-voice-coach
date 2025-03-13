'use client';

import { useRouter } from 'next/navigation';
import { CallHistoryListProps } from '@/types/history';

export function CallHistoryList({
  calls,
  isLoading,
  userRole,
  currentUserId,
  onStartNewCall
}: CallHistoryListProps) {
  const router = useRouter();

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="p-8 flex justify-center">
          <div role="status" className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!calls || calls.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No calls found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your call history will appear here.
          </p>
          <div className="mt-6">
            <button
              onClick={() => onStartNewCall ? onStartNewCall() : router.push('/call')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start a new call
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Populated state - will be expanded in Phase 2 and 3
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Call History</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {userRole === 'admin' ? 'All user calls' : 'Your recent calls'}
        </p>
      </div>
      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {calls.map((call) => (
            <li key={call.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  Call ID: {call.call_id.substring(0, 8)}...
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${call.call_status === 'completed' ? 'bg-green-100 text-green-800' : 
                      call.call_status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {call.call_status}
                  </p>
                </div>
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
                    {new Date(call.created_at).toLocaleString()}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
