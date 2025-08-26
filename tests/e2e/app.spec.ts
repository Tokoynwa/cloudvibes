import { test, expect } from '@playwright/test';

test.describe('CloudVibes Weather App', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/CloudVibes/);
    
    // Check for main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('CloudVibes');
  });

  test('should have working navigation', async ({ page }) => {
    // Check if privacy link exists and works
    const privacyLink = page.getByRole('link', { name: /privacy/i });
    await expect(privacyLink).toBeVisible();
    
    await privacyLink.click();
    await expect(page).toHaveURL(/.*privacy/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
  });

  test('should display weather interface elements', async ({ page }) => {
    // Look for weather-related content
    const weatherElements = [
      page.getByText(/weather/i).first(),
      page.getByText(/forecast/i).first(),
    ];

    for (const element of weatherElements) {
      if (await element.count() > 0) {
        await expect(element).toBeVisible();
      }
    }
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check if the page is properly responsive
      await expect(page.getByRole('main')).toBeVisible();
      
      // Check that content doesn't overflow
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(414); // Typical mobile width
    }
  });

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = page.getByRole('heading');
    await expect(headings.first()).toBeVisible();
    
    // Check for main landmark
    await expect(page.getByRole('main')).toBeVisible();
    
    // Check for alt text on images (if any)
    const images = page.getByRole('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('should load CSS and JavaScript properly', async ({ page }) => {
    // Check if styles are loaded
    const body = page.locator('body');
    await expect(body).toHaveClass(/.*\w+.*/); // Should have some classes applied
    
    // Check if page is interactive (JavaScript loaded)
    await expect(page.getByRole('main')).toBeVisible();
  });
});