const { test, expect } = require('@playwright/test');

test.describe('Direct URL Access Tests', () => {
  const pages = [
    {
      url: "/docs/",
      title: "Install and Quick start",
      headlines: ["Installation", "Basic Example"]
    },
    {
      url: "/docs/doc-table-instance-creation",
      title: "Create Table Instance",
      headlines: ["Table instance creation", "Functions of table instance"]
    },
    {
      url: "/docs/doc-adding-rows",
      title: "Adding Rows",
      headlines: ["One row at a time", "Batch Row Adding"]
    },
    {
      url: "/docs/doc-row-divider",
      title: "Row Dividers",
      headlines: ["Basic Row Divider", "Multiple Sections"]
    },
    {
      url: "/docs/doc-color",
      title: "Coloring",
      headlines: ["Custom Color"]
    },
    {
      url: "/docs/doc-sort-filter",
      title: "Sort and Filter",
      headlines: ["Filter", "Advanced Sorting"]
    },
    {
      url: "/docs/doc-alignment",
      title: "Alignment",
      headlines: []
    },
    {
      url: "/docs/doc-enable-disable-col",
      title: "Enable and Disable Columns",
      headlines: ["Enable", "Disable"]
    },
    {
      url: "/docs/doc-computed-function",
      title: "Calculated Columns",
      headlines: ["Using All Parameters", "Advanced Examples"]
    },
    {
      url: "/docs/doc-emojis-special-chars",
      title: "Special Chars and emojis",
      headlines: ["Special chars", "Newlines in cells"]
    },
    {
      url: "/docs/doc-typescript",
      title: "Typescript",
      headlines: []
    },
    {
      url: "/docs/doc-cli-install-quick-start",
      title: "CLI Quick Start",
      headlines: ["Installation", "Basic Example"]
    }
  ];

  for (const pageInfo of pages) {
    test(`Direct access to ${pageInfo.title} page works correctly`, async ({ page }) => {
      // Navigate directly to the URL
      await page.goto(pageInfo.url);
      
      // Check that the page title is in the h1 heading or somewhere on the page
      if (pageInfo.title === "CLI Quick Start") {
        // Special case for CLI Quick Start page - it has "Quick Start" as the h1
        await expect(page.locator('h1:has-text("Quick Start")')).toBeVisible();
      } else {
        await expect(page.locator(`h1:has-text("${pageInfo.title}")`)).toBeVisible();
      }
      
      // Check each headline by looking for heading elements containing the text
      for (const headline of pageInfo.headlines) {
        // Use a more specific selector for each headline
        await page.waitForSelector(`h2:has-text("${headline}"), h3:has-text("${headline}"), h4:has-text("${headline}")`, { state: 'visible' });
      }

      // Special check for Special Chars and emojis page
      if (pageInfo.title === "Special Chars and emojis") {
        // Verify code examples
        const codeBlocks = await page.locator('pre code').count();
        expect(codeBlocks).toBeGreaterThan(1);
        
        // Verify screenshots
        const screenshots = await page.locator('img[alt="Screenshot"]').count();
        expect(screenshots).toBeGreaterThan(0);
      }
    });
  }

  test('404 page is displayed for non-existent pages', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/docs/non-existent-page');
    
    // Check that the 404 page is displayed
    await expect(page.locator('h1:has-text("Page Not Found")')).toBeVisible();
  });
}); 