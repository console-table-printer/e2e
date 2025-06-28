const { test, expect } = require('@playwright/test');

test.describe('Console Table Printer Website', () => {
  test('homepage loads correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the title is correct
    await expect(page).toHaveTitle(/Console Table Printer/);
    
    // Check that the main heading is present
    const heading = page.locator('text=Print colorful Tables on Console, directly from JSON string');
    await expect(heading).toBeVisible();
    
    // Check that the "GET STARTED" button is present
    const getStartedButton = page.locator('text=GET STARTED');
    await expect(getStartedButton).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the "Quick Start" link is present
    const quickStartLink = page.locator('text=Quick Start');
    await expect(quickStartLink).toBeVisible();
    
    // Check that the "GitHub" link is present
    const githubLink = page.locator('text=GitHub');
    await expect(githubLink).toBeVisible();
    
    // Check that the "Npmjs" link is present
    const npmjsLink = page.locator('text=Npmjs');
    await expect(npmjsLink).toBeVisible();
  });

  test('features are displayed', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the "Light and Fast" feature is present
    const lightAndFastFeature = page.locator('text=Light and Fast');
    await expect(lightAndFastFeature).toBeVisible();
    
    // Check that the "Free" feature is present
    const freeFeature = page.locator('text=Free');
    await expect(freeFeature).toBeVisible();
    
    // Check that the "Typed" feature is present
    const typedFeature = page.locator('text=Typed');
    await expect(typedFeature).toBeVisible();
  });
}); 