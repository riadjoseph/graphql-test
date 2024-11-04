const puppeteer = require('puppeteer');

(async () => {
  const urls = [
    'http://localhost:8080/', // Optimized version
    'http://localhost:8080/slow.html', // Slow version with high overhead
    'http://localhost:8080/jsinhead.html' // Version with JS in <head>
  ];

  for (const url of urls) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set User-Agent to emulate Googlebot
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

    console.log(`Testing URL: ${url}`);

    // Start capturing performance metrics
    await page.tracing.start({ path: `trace-${url.includes('slow') ? 'slow' : url.includes('jsinhead') ? 'jsinhead' : 'optimized'}.json`, categories: ['devtools.timeline'] });

    try {
      // Navigate to the page and wait for it to finish loading
      const startTime = Date.now();
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60000 // Increase timeout to 60 seconds
      });
      const endTime = Date.now();

      // Log page load time
      console.log(`Page load time for ${url}: ${(endTime - startTime) / 1000} seconds`);

      // Take a screenshot to capture the final rendering
      await page.screenshot({ path: `screenshot-${url.includes('slow') ? 'slow' : url.includes('jsinhead') ? 'jsinhead' : 'optimized'}.png`, fullPage: true });
    } catch (err) {
      console.error(`Error loading ${url}:`, err);
    }

    // Stop capturing performance metrics
    await page.tracing.stop();

    await browser.close();
  }
})();
