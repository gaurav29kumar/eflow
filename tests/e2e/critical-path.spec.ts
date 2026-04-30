import { test, expect } from '@playwright/test';

test.describe('eflow Critical Path', () => {
  test('User enters address, interacts with checklist, authenticates, and syncs to calendar', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('/');

    // 2. Validate rendering
    await expect(page.getByRole('heading', { name: 'eflow' })).toBeVisible();

    // 3. Enter Address
    const addressInput = page.getByRole('textbox', { name: 'Address or Zip Code Input' });
    await expect(addressInput).toBeVisible();
    await addressInput.fill('1600 Pennsylvania Avenue');
    
    // 4. Submit Form
    await page.getByRole('button', { name: 'Go' }).click();

    // 5. Verify Polling Location appears via Mock Data
    await expect(page.getByRole('heading', { name: 'Your Polling Location' })).toBeVisible({ timeout: 5000 });
    
    // 6. Verify Logistics Checklist & WCAG Interactivity
    await expect(page.getByRole('heading', { name: 'Your Voting Checklist' })).toBeVisible();
    const firstCheckbox = page.locator('div[role="checkbox"]').first();
    await expect(firstCheckbox).toHaveAttribute('aria-checked', 'false');
    
    // Test Keyboard Accessibility (Spacebar to toggle)
    await firstCheckbox.focus();
    await page.keyboard.press('Space');
    await expect(firstCheckbox).toHaveAttribute('aria-checked', 'true');

    // 7. Handle Firebase Authentication Mock
    const authButton = page.getByRole('button', { name: 'Sign In' });
    await expect(authButton).toBeVisible();
    
    // Handle the browser alert triggered by the Mock Dev Token during sync
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('MOCK MODE: Calendar Sync Successful');
      await dialog.accept();
    });

    await authButton.click();
    // Wait for the auth mock to resolve and change button text
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible({ timeout: 5000 });

    // 8. Verify Calendar Sync Button
    const syncButton = page.getByRole('button', { name: 'Sync all deadlines to Google Calendar' });
    await expect(syncButton).toBeVisible();
    await syncButton.click();
  });
});
