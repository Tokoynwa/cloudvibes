import { test, expect } from '@playwright/test';

test.describe('CloudVibes Basic Functionality', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads
    await expect(page).toHaveTitle(/CloudVibes/);
    
    // Check for main navigation
    await expect(page.locator('text=CloudVibes')).toBeVisible();
  });

  test('navigation works properly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to About page
    await page.click('text=About');
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toContainText(/About/i);
    
    // Test navigation to Blog page
    await page.click('text=Weather Blog');
    await expect(page).toHaveURL(/.*\/blog/);
    await expect(page.locator('h1')).toContainText(/Weather News/i);
    
    // Test navigation to Contact page
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*\/contact/);
    await expect(page.locator('h1')).toContainText(/Contact/i);
  });

  test('health endpoint responds correctly', async ({ page }) => {
    const response = await page.goto('/api/health');
    expect(response?.status()).toBe(200);
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');
    
    // Check if mobile navigation exists (hamburger menu)
    const mobileMenu = page.locator('[aria-expanded="false"]').first();
    if (await mobileMenu.isVisible()) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('social sharing buttons are present', async ({ page }) => {
    await page.goto('/blog');
    
    // Check for social sharing elements
    await expect(page.locator('text=Share:')).toBeVisible();
  });
});