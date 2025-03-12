# Test-Driven Development Plan for Call History Listing Page

This document outlines a Test-Driven Development (TDD) approach for implementing the Call History Listing Page, breaking down the development into small, testable increments.

## 1. Basic Page Structure & Component Tests

### Tests:
- Test that the history page route renders correctly
- Test that the page displays the correct title "Call History"
- Test that the basic layout structure is in place

### Implementation:
- Create `/app/history/page.tsx` and `/app/history/layout.tsx` files
- Implement a basic header section with "Call History" title
- Set up the skeleton layout for the page sections

## 2. Call History List Component

### Tests:
- Test that CallHistoryList renders correctly with no data (empty state)
- Test that CallHistoryList renders with mock data correctly
- Test that correct number of CallHistoryItem components are rendered
- Test that loading state displays correctly while data is being fetched
- Test that the component handles different user roles appropriately (admin vs. basic)
- Test edge cases like null data or various call status types

### Implementation:

#### File Structure:
```
/src
  /components
    /history
      CallHistoryList.tsx     # Main component for displaying call records
      CallHistoryItem.tsx     # Component for individual call record
      CallHistoryList.test.tsx # Tests for the component
```

#### Data Types:
```typescript
// Types for call history data
export interface CallRecord {
  id: string;
  call_id: string;
  user_id: string;
  agent_id: string;
  call_status: 'completed' | 'in-progress' | 'failed';
  start_timestamp: number;
  end_timestamp: number | null;
  transcript: string | null;
  created_at: string;
}

// Props for CallHistoryList component
export interface CallHistoryListProps {
  calls: CallRecord[] | null;
  isLoading: boolean;
  userRole: UserRole;
  currentUserId: string;
}
```

#### Detailed Implementation Phases:

1. **Phase 1: Basic Structure**
   - Create the basic component with TypeScript interfaces
   - Implement empty state UI with helpful message and "Start a new call" button
   - Add loading state with skeleton UI or spinner
   - Write initial tests for empty and loading states

2. **Phase 2: Styling and Layout**
   - Implement responsive table/grid layout using Tailwind CSS
   - Create container with white background, rounded corners, shadow
   - Design table headers and column layout
   - Add appropriate styling for different states
   - Test UI rendering for different viewport sizes

3. **Phase 3: CallHistoryItem Integration**
   - Create basic CallHistoryItem component structure
   - Connect it to the CallHistoryList
   - Implement mapping of data to individual items
   - Test rendering of multiple items with mock data

4. **Phase 4: Data Integration**
   - Connect to the data fetching logic in the parent component
   - Implement sorting and initial filtering
   - Test with real data structure
   - Add error state handling

5. **Phase 5: Role-Based Features**
   - Add admin-specific views and data fields
   - Implement conditional rendering based on user role
   - Test with different user role scenarios
   - Ensure proper access controls in the UI

## 3. Call History Item Component

### Tests:
- Test that CallHistoryItem correctly displays call date/time
- Test that CallHistoryItem correctly calculates and displays call duration
- Test that CallHistoryItem displays agent ID and call status
- Test that CallHistoryItem shows a preview of transcript
- Test that clicking on a CallHistoryItem navigates to correct detail page

### Implementation:
- Create `components/CallHistoryItem.tsx` component
- Implement formatting for timestamps
- Implement duration calculation logic
- Create a visually appealing card/row design with status indicators

## 4. Data Fetching with Role-Based Access

### Tests:
- Test that regular user only sees their own calls
- Test that admin users can see all calls
- Test handling of loading states
- Test error handling for failed data fetching

### Implementation:
- Implement server-side data fetching with Supabase client
- Add role checking logic
- Create loading states
- Implement error handling for data fetching issues

## 5. Search Functionality

### Tests:
- Test that SearchBar component renders correctly
- Test that search input updates search parameters
- Test that results are filtered based on search input
- Test that search persists across page refreshes

### Implementation:
- Create `components/SearchBar.tsx` component
- Implement client-side search logic
- Connect search input to URL parameters for persistence
- Add clear search functionality

## 6. Filter Section

### Tests:
- Test that FilterSection renders with correct filter options
- Test that date range selectors work correctly
- Test that status filter works correctly
- Test that filters persist in URL parameters
- Test that admin-specific user filter is only visible to admins

### Implementation:
- Create `components/FilterSection.tsx` component
- Implement date range pickers
- Add status dropdown selection
- For admin view, add user selector filter
- Connect filters to URL parameters

## 7. Pagination Component

### Tests:
- Test that Pagination component renders correctly
- Test that page navigation works correctly
- Test that items per page selector works
- Test that pagination state persists in URL

### Implementation:
- Create `components/Pagination.tsx` component
- Implement page navigation controls
- Add items per page selector
- Connect pagination to URL parameters

## 8. Role-Specific UI Features

### Tests:
- Test that admin toggle between "My Calls" and "All Users" works
- Test that admin view shows additional user information
- Test that regular user view is appropriately simplified

### Implementation:
- Add role-specific UI elements
- Implement admin toggle functionality
- Add conditional rendering for role-specific components

## 9. Responsive Design

### Tests:
- Test that layout adapts correctly to different viewport sizes
- Test that mobile view stacks elements appropriately
- Test that touch targets are appropriately sized on mobile

### Implementation:
- Add responsive breakpoints to layout
- Create mobile-specific view adaptations
- Ensure all interactive elements are touch-friendly

## 10. Performance Optimizations

### Tests:
- Test skeleton loader rendering during data fetching
- Test performance of list rendering with large datasets
- Test caching mechanism for repeated views

### Implementation:
- Add skeleton loaders for initial data fetching
- Implement client-side caching where appropriate
- Optimize rendering of large lists

## Incremental Development Workflow:

1. Write the test for the specific feature/component
2. Verify the test fails (red phase)
3. Implement the minimal code needed to pass the test (green phase)
4. Refactor the code while ensuring tests still pass (refactor phase)
5. Proceed to the next feature

This TDD approach ensures each component and feature is thoroughly tested before moving to the next one. By breaking down the development into these small, testable increments, we can build a robust and maintainable call history page that meets all the requirements outlined in the call history listing plan.
