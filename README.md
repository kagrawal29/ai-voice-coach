# AI Voice Coach

A modern web application built with Next.js 14 that allows users to initiate calls with an AI agent powered by Retell AI. This application provides basic user authentication through Supabase, enabling users to log in, initiate audio calls, view live transcriptions in a chat format, and access detailed call reports and historical records.

## Features

- **User Authentication**: Secure login and signup functionality with email verification
- **Role-Based Access Control**: Two distinct user roles with different permissions
  - **Basic Users**: Can make calls, view their own call history, access personal transcripts and reports
  - **Admin Users**: Have elevated privileges to view all users' call records, access all transcripts and reports, and filter data by specific users
- **AI Voice Calls**: Integration with Retell AI for natural voice conversations
- **Real-time Transcription**: Live transcription displayed in chat format during calls
- **Call History**: Access to past call logs with pagination, search, and filtering
- **Detailed Reports**: Generation of comprehensive call reports

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)
- Retell AI (Voice API)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `env.example.txt` to `.env.local` and fill in your Supabase credentials:

```bash
cp env.example.txt .env.local
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/auth/`: Authentication pages (login and signup)
- `app/dashboard/`: Main dashboard for initiating calls and navigation
- `app/call/`: Live call session management with real-time transcription
- `app/history/`: Call history with search and filtering
- `app/api/`: API routes for Supabase interactions, Retell AI calls, and fetching reports
- `components/`: Reusable components including authentication wrappers
- `utils/`: Utility functions including Supabase client configuration

## Authentication and Security

This application implements Supabase authentication with email verification and role-based access control. The two user roles (basic and admin) have different permissions and access levels within the application.

## Deployment

The application can be deployed to platforms like Vercel:

```bash
npm run build
```

For more details on deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
