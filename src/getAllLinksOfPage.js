/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

const getAllLinksOfPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://techcrunch.com/');

    // Extrae las URLs absolutas de los enlaces encontrados en la página.
    const result = await page.$$eval('a', (anchors) => anchors.map((anchor) => anchor.href));
    console.log(result);
  } finally {
    await browser.close();
  }
};

export default getAllLinksOfPage;
