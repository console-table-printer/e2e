const { test, expect } = require('@playwright/test');

test.describe('Navigation Links Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header navigation links work correctly', async ({ page }) => {
    // Test GitHub link in header
    const githubLink = page.locator('nav[aria-label="Main"] a:has-text("GitHub")');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/console-table-printer/console-table-printer');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Test NPM link in header
    const npmLink = page.locator('nav[aria-label="Main"] a:has-text("npmjs")');
    await expect(npmLink).toBeVisible();
    await expect(npmLink).toHaveAttribute('href', 'https://www.npmjs.com/package/console-table-printer');
    await expect(npmLink).toHaveAttribute('target', '_blank');
    await expect(npmLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('footer links work correctly', async ({ page }) => {
    // Test Learn section links
    const quickStartLink = page.locator('footer a:has-text("Quick Start")').first();
    await expect(quickStartLink).toBeVisible();
    await expect(quickStartLink).toHaveAttribute('href', '/docs');

    const cliLink = page.locator('footer a:has-text("Getting Started With CLI")').first();
    await expect(cliLink).toBeVisible();
    await expect(cliLink).toHaveAttribute('href', '/docs/doc-cli-install-quick-start');

    // Test Decorate section links
    const colorLink = page.locator('footer a:has-text("Color")').first();
    await expect(colorLink).toBeVisible();
    await expect(colorLink).toHaveAttribute('href', '/docs/doc-color');

    const borderLink = page.locator('footer a:has-text("Border")').first();
    await expect(borderLink).toBeVisible();
    await expect(borderLink).toHaveAttribute('href', '/docs/doc-border-design');

    const alignmentLink = page.locator('footer a:has-text("Alignment")').first();
    await expect(alignmentLink).toBeVisible();
    await expect(alignmentLink).toHaveAttribute('href', '/docs/doc-alignment');
  });

  test('external links in footer work correctly', async ({ page }) => {
    // Test GitHub link in footer
    const githubLink = page.locator('footer a:has-text("GitHub")').first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/console-table-printer/console-table-printer');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Test NPM link in footer
    const npmLink = page.locator('footer a:has-text("Npmjs")').first();
    await expect(npmLink).toBeVisible();
    await expect(npmLink).toHaveAttribute('href', 'https://www.npmjs.com/package/console-table-printer');
    await expect(npmLink).toHaveAttribute('target', '_blank');
    await expect(npmLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('announcement bar link works correctly', async ({ page }) => {
    // Test GitHub star link in announcement bar
    const announcementLink = page.locator('div[role="banner"] a[href="https://github.com/console-table-printer/console-table-printer"]');
    await expect(announcementLink).toBeVisible();
    await expect(announcementLink).toHaveAttribute('target', '_blank');
    await expect(announcementLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test.describe('Documentation Page Navigation', () => {
  test('sidebar navigation links work correctly', async ({ page }) => {
    // Go to docs page
    await page.goto('/');
    await page.locator('a:has-text("GET STARTED")').click();
    
    // Define the sidebar links to test
    const sidebarLinks = [
      { text: "Install and Quick start", url: "/docs/" },
      { text: "Create Table Instance", url: "/docs/doc-table-instance-creation" },
      { text: "Adding Rows", url: "/docs/doc-adding-rows" },
      { text: "Row Dividers", url: "/docs/doc-row-divider" },
      { text: "Coloring", url: "/docs/doc-color" },
      { text: "Sort and Filter", url: "/docs/doc-sort-filter" },
      { text: "Alignment", url: "/docs/doc-alignment" },
      { text: "Enable and Disable Columns", url: "/docs/doc-enable-disable-col" },
      { text: "Calculated Columns", url: "/docs/doc-computed-function" },
      { text: "Special Chars and emojis", url: "/docs/doc-emojis-special-chars" },
      { text: "Typescript", url: "/docs/doc-typescript" }
    ];

    // Test each sidebar link
    for (const link of sidebarLinks) {
      // Find and click the link
      await page.locator(`nav.menu a:has-text("${link.text}")`).first().click();
      
      // Check that the URL includes the expected path
      await expect(page).toHaveURL(new RegExp(link.url));
      
      // Verify page content is loaded
      await expect(page.locator('main')).toBeVisible();
      
      // Additional checks for Special Chars and emojis page
      if (link.text === "Special Chars and emojis") {
        // Verify both sections are present using heading elements
        await expect(page.locator('h2:has-text("Special chars")')).toBeVisible();
        await expect(page.locator('h2:has-text("Newlines in cells")')).toBeVisible();
        
        // Verify code examples - use count greater than 1
        const codeBlocks = await page.locator('pre code').count();
        expect(codeBlocks).toBeGreaterThan(1);
        
        // Verify screenshots - use count greater than 0
        const screenshots = await page.locator('img[alt="Screenshot"]').count();
        expect(screenshots).toBeGreaterThan(0);
      }
    }
  });
}); 