import { test, expect, Page } from '@playwright/test';

// These test accounts should be created in Supabase with proper roles
// In a real CI environment, these would be stored in environment variables
// For testing purposes only - in production these should be environment variables
const TEST_BASIC_USER = {
  email: process.env.TEST_BASIC_USER_EMAIL || 'basic-test@example.com',
  password: process.env.TEST_BASIC_USER_PASSWORD || 'test-password'
};

const TEST_ADMIN_USER = {
  email: process.env.TEST_ADMIN_USER_EMAIL || 'admin-test@example.com',
  password: process.env.TEST_ADMIN_USER_PASSWORD || 'admin-password'
};

async function loginAsUser(page: Page, email: string, password: string) {
  await page.goto('/auth/login');
  
  // Fill login form
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('/dashboard');
}

test.describe('Call History Page', () => {
  const mockCalls = [
    {
      id: '1',
      call_id: 'call123456789',
      user_id: 'test-user-id',
      user_email: 'basic-test@example.com',
      agent_id: 'agent123',
      call_status: 'completed',
      start_timestamp: 1646733600000,
      end_timestamp: 1646735400000,
      transcript: 'Hello, this is a test call transcript with some content to display.',
      created_at: '2022-03-08T12:00:00.000Z'
    }
  ];

  test('shows loading state initially', async ({ page }) => {
    // Login as basic user
    await loginAsUser(page, TEST_BASIC_USER.email, TEST_BASIC_USER.password);
    
    // Route to delay call history response to show loading state
    await page.route('**/rest/v1/call_history**', async (route) => {
      // Delay response to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 1000));
      return route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    
    // Navigate to history page
    await page.goto('/history');
    
    // Check for loading spinner with role="status"
    await expect(page.locator('[role="status"]')).toBeVisible();
  });

  test('shows empty state when no calls exist', async ({ page }) => {
    // Login as basic user
    await loginAsUser(page, TEST_BASIC_USER.email, TEST_BASIC_USER.password);
    
    // Mock empty call history response
    await page.route('**/rest/v1/call_history**', (route) => {
      return route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    
    // Navigate to history page
    await page.goto('/history');
    
    // Check for empty state message
    await expect(page.locator('text=No calls found')).toBeVisible();
    await expect(page.locator('button:has-text("Start a new call")')).toBeVisible();
  });

  test('displays call records when data exists', async ({ page }) => {
    // Login as basic user
    await loginAsUser(page, TEST_BASIC_USER.email, TEST_BASIC_USER.password);
    
    // Mock call history with data
    await page.route('**/rest/v1/call_history**', (route) => {
      return route.fulfill({ status: 200, body: JSON.stringify(mockCalls) });
    });
    
    // Navigate to history page
    await page.goto('/history');
    
    // Check for call ID display with truncated format (8 chars + ellipsis)
    await expect(page.locator(`text=Call ID: ${mockCalls[0].call_id.substring(0, 8)}...`)).toBeVisible();
    await expect(page.locator('text=Agent: agent123')).toBeVisible();
    
    // Verify that the 'View Details' button is present
    await expect(page.locator('button:has-text("View Details")')).toBeVisible();
  });

  test('shows admin-specific content for admin users', async ({ page }) => {
    // Login as admin user
    await loginAsUser(page, TEST_ADMIN_USER.email, TEST_ADMIN_USER.password);
    
    // Mock call history with data for different user
    const adminMockCalls = [
      {
        ...mockCalls[0],
        user_id: 'different-user-id', // Different from admin user
        user_email: 'different-user@example.com'
      }
    ];
    
    await page.route('**/rest/v1/call_history**', (route) => {
      return route.fulfill({ status: 200, body: JSON.stringify(adminMockCalls) });
    });
    
    // Navigate to history page
    await page.goto('/history');
    
    // Check for admin-specific content
    await expect(page.locator('text=All user calls')).toBeVisible();
    await expect(page.locator('text=User: different-user@example.com')).toBeVisible();
  });

  test('navigates to call page when "Start a new call" button is clicked', async ({ page }) => {
    // Login as basic user
    await loginAsUser(page, TEST_BASIC_USER.email, TEST_BASIC_USER.password);
    
    // Mock empty call history
    await page.route('**/rest/v1/call_history**', (route) => {
      return route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    
    // Navigate to history page
    await page.goto('/history');
    
    // Click the "Start a new call" button
    await page.locator('button:has-text("Start a new call")').click();
    
    // Verify navigation to the call page
    await expect(page).toHaveURL('/call');
  });
});
