import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call History | AI Voice Coach',
  description: 'View your call history, transcripts, and detailed reports',
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
