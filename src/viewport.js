import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,// ejecuta por debajo
    slowMo: 200, // settimeout
    // defaultViewport: {
    //   width: 1080,
    //   height: 1920,
    // },
  });
  const page = await browser.newPage();

  // set a viewport for page
  await page.setViewport({
    width: 400,
    height: 650,
  });

  await page.goto("https://example.com");

  await browser.close();
})();