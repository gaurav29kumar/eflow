import { test, expect } from '@playwright/test';

test.describe('eflow Critical Path', () => {
  test('User enters address, sees checklist and map, and can sync to calendar', async ({ page }) => {
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
    
    // 6. Verify Logistics Checklist
    await expect(page.getByRole('heading', { name: 'Your Voting Checklist' })).toBeVisible();
    const checklistsBoxes = page.locator('div[role="checkbox"]');
    await expect(checklistsBoxes).toHaveCount(4);

    // 7. Verify Calendar Sync Button
    const syncButton = page.getByRole('button', { name: 'Sync all deadlines to Google Calendar' });
    await expect(syncButton).toBeVisible();
    await syncButton.click();

    // 8. Verify Success State
    await expect(page.getByText('Successfully synced to your calendar!')).toBeVisible();
  });
});
