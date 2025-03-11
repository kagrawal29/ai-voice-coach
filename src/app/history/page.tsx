'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUserWithRole, UserRole } from '@/utils/supabase';

export default function HistoryPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/auth/login');
          return;
        }

        const { user, role } = await getCurrentUserWithRole();
        setUser(user);
        setRole(role);
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">AI Voice Coach</h1>
            </div>
            <div className="flex items-center">
              <p className="mr-4">
                {user?.email} <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{role}</span>
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="mr-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 px-4 rounded"
              >
                Dashboard
              </button>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/auth/login');
                }}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 px-4 rounded"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Call History</h2>
            <p className="mt-1 text-sm text-gray-500">
              {role === 'admin' 
                ? 'View and manage all call records, transcripts, and reports.' 
                : 'View your call history, transcripts, and detailed reports.'}
            </p>
          </div>
        </div>

        {/* Placeholder for filter section */}
        <div className="bg-white shadow overflow-hidden rounded-lg p-4 mb-6">
          <p className="text-gray-500">Filter and search options will appear here</p>
        </div>

        {/* Placeholder for call history list */}
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
                onClick={() => router.push('/call')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start a new call
              </button>
            </div>
          </div>
        </div>
        
        {/* Placeholder for pagination controls */}
        <div className="mt-6 flex justify-center">
          <p className="text-gray-500">Pagination controls will appear here</p>
        </div>
      </div>
    </div>
  );
}
