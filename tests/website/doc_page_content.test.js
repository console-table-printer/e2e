const { test, expect } = require('@playwright/test');

test.describe('Documentation Page Content Tests', () => {
  const pages = [
    {
      title: "Install and Quick start",
      headlines: ["Installation", "Basic Example"]
    },
    {
      title: "Create Table Instance",
      headlines: ["Table instance creation", "Functions of table instance"]
    },
    {
      title: "Adding Rows",
      headlines: ["One row at a time", "Batch Row Adding"]
    },
    {
      title: "Row Dividers",
      headlines: ["Basic Row Divider", "Multiple Sections"]
    },
    {
      title: "Coloring",
      headlines: ["Custom Color"]
    },
    {
      title: "Sort and Filter",
      headlines: ["Filter", "Advanced Sorting"]
    },
    {
      title: "Alignment",
      headlines: []
    },
    {
      title: "Enable and Disable Columns",
      headlines: ["Enable", "Disable"]
    },
    {
      title: "Calculated Columns",
      headlines: ["Using All Parameters", "Advanced Examples"]
    },
    {
      title: "Special Chars and emojis",
      headlines: ["Special chars", "Newlines in cells"]
    }
  ];

  test.beforeEach(async ({ page }) => {
    // Go to docs page before each test
    await page.goto('/');
    await page.locator('a:has-text("GET STARTED")').click();
  });

  for (const pageInfo of pages) {
    test(`${pageInfo.title} page contains correct headlines`, async ({ page }) => {
      // Find and click the link with the page title in the sidebar
      await page.locator(`nav.menu a:has-text("${pageInfo.title}")`).first().click();
      
      // Check that the page title is in the h1 heading
      await expect(page.locator(`h1:has-text("${pageInfo.title}")`)).toBeVisible();
      
      // Check each headline by looking for heading elements containing the text
      for (const headline of pageInfo.headlines) {
        // Use a more specific selector for each headline
        await page.waitForSelector(`h2:has-text("${headline}"), h3:has-text("${headline}"), h4:has-text("${headline}")`, { state: 'visible' });
      }

      // Special check for Special Chars and emojis page
      if (pageInfo.title === "Special Chars and emojis") {
        // Verify screenshot presence
        const screenshots = await page.locator('img[alt="Screenshot"]').count();
        expect(screenshots).toBeGreaterThan(0);
      }
    });
  }
}); 