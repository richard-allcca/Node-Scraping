import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  // config viewport
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("https://example.com");

  // save in format pdf
  await page.pdf({ path: "./example/example.pdf", format: "A4", printBackground: false });

  await browser.close();
})();
