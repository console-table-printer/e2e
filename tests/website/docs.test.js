const { test, expect } = require('@playwright/test');

test.describe('Documentation Pages', () => {
  test('quick start page loads correctly', async ({ page }) => {
    // Navigate to the Quick Start page (updated URL)
    await page.goto('/docs/');
    
    // Check that the title contains the site name
    await expect(page).toHaveTitle(/Console Table Printer/);
    
    // Check that the main heading is present (updated selector)
    const heading = page.locator('h1:has-text("Install and Quick start")');
    await expect(heading).toBeVisible();
    
    // Check that the code examples are present (using first() to avoid strict mode violation)
    const codeBlock = page.locator('pre code').first();
    await expect(codeBlock).toBeVisible();
  });

  test('navigation between documentation pages works', async ({ page }) => {
    // Navigate to the Quick Start page (updated URL)
    await page.goto('/docs/');
    
    // Find and click on a link to another documentation page (using more specific selector)
    const link = page.locator('nav.pagination-nav a:has-text("Create Table Instance")');
    await link.click();
    
    // Check that we've navigated to the table instance creation page
    await expect(page).toHaveURL(/.*doc-table-instance-creation.*/);
    
    // Check that the page content is visible
    const heading = page.locator('h1:has-text("Create Table Instance")');
    await expect(heading).toBeVisible();
  });

  test('code examples are properly displayed', async ({ page }) => {
    // Navigate to the Quick Start page (updated URL)
    await page.goto('/docs/');
    
    // Check that code examples are present and visible
    const codeBlocks = page.locator('pre code');
    
    // Wait for the first code block to be visible
    await expect(codeBlocks.first()).toBeVisible();
    
    // Check that there's at least one code block with npm/yarn installation commands
    const installationCode = page.locator('pre code:has-text("npm install")').first();
    await expect(installationCode).toBeVisible();
  });
}); 