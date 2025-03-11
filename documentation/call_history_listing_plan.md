# Call History Listing Page Implementation Plan

## Overview
This document outlines the detailed implementation plan for the Call History Listing Page in our Next.js 14 application. This page will allow users to view, search, filter, and navigate through their call history with the AI voice coach powered by Retell AI.

## Page Structure and Location

The call history listing page will be implemented at `/app/history/page.tsx` following the Next.js 14 App Router structure. This will be a server component serving as the main container for the call history listing.

A corresponding layout file at `/app/history/layout.tsx` may be created if specific layout elements that differ from the main application layout are needed.

## Component Organization

All reusable UI elements will be placed in the existing components folder at the project level to maintain consistency with the rest of the application structure.

The following components will be developed:
- **CallHistoryList**: Container for the list of call records
- **CallHistoryItem**: Individual call record card/row
- **FilterSection**: Filter controls for the call list
- **SearchBar**: Search functionality for finding specific calls
- **Pagination**: Controls for navigating through multiple pages of results

These components should be designed to be reusable across the application if needed in other sections.

## Data Fetching Implementation

The main page component will implement server-side data fetching using the Supabase client to retrieve call history records from the `call_history` table.

Role-based access control logic will be implemented:
- Regular users will only see their own call records
- Admin users will see all users' call records with additional filtering options

Sorting functionality will be included, defaulting to sorting by start timestamp in descending order (newest calls first).

Pagination will be implemented to limit the number of records displayed at once (10-15 per page recommended).

## User Interface Elements

### Header Section
- "Call History" title
- Brief description of the page purpose
- Summary statistics (e.g., total calls, average duration)

### Filter and Search Section
- Date range selector (from/to date pickers)
- Call status dropdown filter (completed, abandoned, etc.)
- Free text search input that searches across transcripts
- For admin users: a user selector to filter by specific users

### Call List
The call list will have a clear tabular or card-based format showing:
- Date and time of the call (formatted from timestamp)
- Call duration (calculated from start and end timestamps)
- Agent name or ID
- Call status with appropriate visual indicators
- Brief preview of the transcript (first 1-2 exchanges)
- Clear visual indicator for navigating to the detail page

### Pagination Controls
- Previous/Next buttons
- Page number indicators
- Items per page selector

## Interaction Behavior

Each call history item will be clickable, navigating to `/history/[callId]` when selected.

Filters will apply in real-time when options change.

A loading state indicator will display while data is being fetched.

All filters will persist between page refreshes by storing them in the URL query parameters.

A "Clear Filters" button will be included to reset all search and filter options.

## Role-Specific Features

### Admin Users
- Toggle to switch between "My Calls" and "All Users" views
- User information columns in the call list
- Additional sorting options by user

### Regular Users
- Simplified interface focused only on their calls
- Potentially highlighted important or recent calls

## Error Handling

Appropriate error states will be created for:
- Failed data fetching
- No results found
- Server errors

Helpful messaging and retry options will be included for each error scenario.

## Responsive Design Considerations

The page layout will adapt to different screen sizes:
- Mobile: Stacked filters and simplified call list view
- Tablet: Adjusted column widths with possibly hidden less important information
- Desktop: Full detailed view with all available information

Touch-friendly controls will be implemented for mobile users with appropriate sizing for tap targets.

## Performance Optimizations

- Skeleton loaders during initial data fetching
- Efficient client-side caching for recently viewed call lists
- Potential "Load More" approach as an alternative to traditional pagination for a smoother user experience

## Database Integration

The page will interface with the existing `call_history` table in Supabase that has the following structure:

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `agent_id` (text)
- `call_id` (text)
- `call_status` (text)
- `start_timestamp` (int8)
- `end_timestamp` (int8)
- `transcript` (text)
- `created_at` (timestamptz)

Data will be retrieved according to the user's role, leveraging the existing Row Level Security policies in Supabase.

## Implementation Timeline

1. Create page and layout files
2. Implement basic component structure
3. Add data fetching with Supabase
4. Implement filtering and search functionality
5. Add pagination
6. Implement role-specific features
7. Add error handling
8. Optimize for responsive design
9. Performance testing and optimization
10. Final review and polish
