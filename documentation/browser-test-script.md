# Browser Console Test Script

To test the call data insertion API, follow these steps:

1. Start your Next.js app with `npm run dev`
2. Log in to the application as either a basic user or admin user
3. Once logged in, open your browser's developer tools (F12 or right-click > Inspect)
4. Navigate to the Console tab
5. Copy and paste the following script
6. Press Enter to run it

```javascript
// Browser console script to test call data insertion
async function insertMockCallDataForCurrentUser() {
  console.log('Inserting mock call data for current user...');
  
  // Sample call data based on Retell AI format
  const callData = {
    "call_type": "web_call",
    "call_id": `TestCall-${Date.now()}`, // Unique call ID for each test
    "agent_id": "TestAgent123",
    "call_status": "registered", // Using original Retell status
    "start_timestamp": Date.now() - 600000, // 10 minutes ago
    "end_timestamp": Date.now(),
    "transcript": "Agent: Hello! How can I help you today?\nUser: Just testing the system.\nAgent: Great! Test successful."
  };
  
  try {
    const response = await fetch('/api/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(callData),
      credentials: 'include'
    });
    
    const result = await response.json();
    console.log('API response:', result);
    
    if (response.ok) {
      console.log('✅ Call data inserted successfully!');
    } else {
      console.error('❌ Failed to insert call data:', result.error);
    }
  } catch (error) {
    console.error('❌ Error making API request:', error);
  }
}

// Insert a mock call
insertMockCallDataForCurrentUser();

// You can run this multiple times to insert different calls
```

## Testing with Different User Types

To test with both user types:

1. **Test as Basic User**:
   - Log in with a basic user account
   - Run the script above
   - Verify the call appears in your history

2. **Test as Admin User**:
   - Log in with an admin user account
   - Run the script again
   - Verify the call appears in your history
   - Navigate to the history page and confirm you can see calls from all users

## Verifying Results

After inserting data, you can:

1. Navigate to your Call History page to see if the records appear
2. Check your Supabase dashboard to confirm the data was inserted correctly

This approach allows you to test the API with real authentication directly in the browser context.
