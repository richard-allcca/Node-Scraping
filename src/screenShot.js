import puppeteer from 'puppeteer';

const screenShot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'save/here/example.png' });
  await browser.close();
};

export default screenShot;
