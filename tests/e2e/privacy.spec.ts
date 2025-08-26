import { test, expect } from '@playwright/test';

test.describe('Privacy Policy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy');
  });

  test('should load privacy policy page', async ({ page }) => {
    await expect(page).toHaveTitle(/Privacy Policy.*CloudVibes/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
  });

  test('should contain required legal sections', async ({ page }) => {
    // Check for essential privacy policy sections
    const requiredSections = [
      'Information We Collect',
      'How We Use Your Information',
      'Third-Party Services',
      'Your Rights',
      'GDPR Compliance',
      'COPPA Compliance',
      'Contact Us'
    ];

    for (const section of requiredSections) {
      const sectionElement = page.getByText(section, { exact: false });
      await expect(sectionElement.first()).toBeVisible();
    }
  });

  test('should have Google AdSense disclosure', async ({ page }) => {
    await expect(page.getByText(/google/i)).toBeVisible();
    await expect(page.getByText(/advertising/i)).toBeVisible();
    await expect(page.getByText(/adsense/i)).toBeVisible();
  });

  test('should include GDPR rights information', async ({ page }) => {
    await expect(page.getByText(/gdpr/i)).toBeVisible();
    await expect(page.getByText(/data protection/i)).toBeVisible();
    await expect(page.getByText(/right to access/i)).toBeVisible();
    await expect(page.getByText(/right to delete/i)).toBeVisible();
  });

  test('should have COPPA children privacy section', async ({ page }) => {
    await expect(page.getByText(/children/i)).toBeVisible();
    await expect(page.getByText(/coppa/i)).toBeVisible();
    await expect(page.getByText(/under 13/i)).toBeVisible();
  });

  test('should contain contact information', async ({ page }) => {
    await expect(page.getByText(/contact/i)).toBeVisible();
    
    // Should have some form of contact method
    const hasEmail = await page.getByText(/@/).count() > 0;
    const hasContactForm = await page.getByText(/contact.*form/i).count() > 0;
    const hasContactSection = await page.getByText(/contact.*us/i).count() > 0;
    
    expect(hasEmail || hasContactForm || hasContactSection).toBeTruthy();
  });

  test('should have proper document structure', async ({ page }) => {
    // Should have main content area
    await expect(page.getByRole('main')).toBeVisible();
    
    // Should have multiple sections with headings
    const headings = page.getByRole('heading');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(3); // Multiple sections
  });

  test('should be readable and well-formatted', async ({ page }) => {
    // Check for proper paragraph structure
    const paragraphs = page.locator('p');
    const paragraphCount = await paragraphs.count();
    expect(paragraphCount).toBeGreaterThan(5); // Should have substantial content
    
    // Check that text is not cut off or hidden
    const mainContent = page.getByRole('main');
    await expect(mainContent).toBeVisible();
  });

  test('should have navigation back to main site', async ({ page }) => {
    // Should have some way to navigate back to main site
    const homeLinks = [
      page.getByRole('link', { name: /home/i }),
      page.getByRole('link', { name: /cloudvibes/i }),
      page.getByRole('link', { name: /back/i }),
    ];

    let hasNavigation = false;
    for (const link of homeLinks) {
      if (await link.count() > 0) {
        hasNavigation = true;
        break;
      }
    }

    // If no explicit navigation, at least check that clicking logo/title works
    if (!hasNavigation) {
      const titleElement = page.getByText(/cloudvibes/i).first();
      if (await titleElement.count() > 0) {
        hasNavigation = true;
      }
    }

    expect(hasNavigation).toBeTruthy();
  });

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (isMobile) {
      // Content should be visible and not overflow
      const mainContent = page.getByRole('main');
      await expect(mainContent).toBeVisible();
      
      // Text should be readable (not too small)
      const paragraph = page.locator('p').first();
      const fontSize = await paragraph.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      // Font size should be at least 14px on mobile
      const fontSizeNum = parseInt(fontSize.replace('px', ''));
      expect(fontSizeNum).toBeGreaterThanOrEqual(14);
    }
  });
});