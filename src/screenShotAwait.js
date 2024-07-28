import puppeteer from 'puppeteer';

const screenShotAwait = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));// Wait for 5 seconds

  await page.screenshot({ path: 'example2.png' });
  //   await browser.waitForTarget(() => false);

  await browser.close();
};

export default screenShotAwait;
