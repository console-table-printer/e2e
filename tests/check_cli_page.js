const { chromium } = require('@playwright/test');

async function checkCliPage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://console-table.netlify.app/docs/doc-cli-install-quick-start');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Get the page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check for h1 elements
    const h1Elements = await page.locator('h1').all();
    console.log('Number of h1 elements:', h1Elements.length);
    
    for (const h1 of h1Elements) {
      const text = await h1.textContent();
      console.log('H1 text:', text);
    }
    
    // Check for the specific heading we're looking for
    const pageHeading = await page.locator('h1').first();
    if (pageHeading) {
      const headingText = await pageHeading.textContent();
      console.log('First h1 text:', headingText);
    }
    
    // Get all visible headings
    const headings = await page.locator('h1, h2, h3').all();
    console.log('\nAll headings:');
    for (const heading of headings) {
      const text = await heading.textContent();
      const tag = await heading.evaluate(node => node.tagName.toLowerCase());
      console.log(`${tag}: ${text}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkCliPage(); 