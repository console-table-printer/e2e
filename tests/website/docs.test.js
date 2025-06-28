const { test, expect } = require('@playwright/test');

test.describe('Documentation Pages', () => {
  test('quick start page loads correctly', async ({ page }) => {
    // Navigate to the Quick Start page
    await page.goto('/docs/quick-start');
    
    // Check that the title contains the site name
    await expect(page).toHaveTitle(/Console Table Printer/);
    
    // Check that the main heading is present
    const heading = page.locator('h1:has-text("Quick Start")');
    await expect(heading).toBeVisible();
    
    // Check that the code examples are present
    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toBeVisible();
  });

  test('navigation between documentation pages works', async ({ page }) => {
    // Navigate to the Quick Start page
    await page.goto('/docs/quick-start');
    
    // Find and click on a link to another documentation page
    const link = page.locator('a:has-text("Getting Started With CLI")');
    await link.click();
    
    // Check that we've navigated to the CLI page
    await expect(page).toHaveURL(/.*cli.*/);
    
    // Check that the CLI page content is visible
    const cliHeading = page.locator('h1:has-text("Getting Started With CLI")');
    await expect(cliHeading).toBeVisible();
  });

  test('code examples are properly displayed', async ({ page }) => {
    // Navigate to the Quick Start page
    await page.goto('/docs/quick-start');
    
    // Check that code examples are present and visible
    const codeBlocks = page.locator('pre code');
    
    // Wait for the first code block to be visible
    await expect(codeBlocks.first()).toBeVisible();
    
    // Check that there's at least one code block with npm/yarn installation commands
    const installationCode = page.locator('pre code:has-text("npm install")');
    await expect(installationCode).toBeVisible();
  });
}); 