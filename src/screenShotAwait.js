import puppeteer from 'puppeteer';

const screenShotAwait = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Usa una espera observable cuando el sitio renderiza contenido tarde.
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'example2.png' });
  } finally {
    await browser.close();
  }
};

export default screenShotAwait;
