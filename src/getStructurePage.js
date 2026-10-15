import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

const getStructure = async () => {
  const browser = await puppeteer.launch(
    getLaunchOptions({
      headless: false,
      slowMo: 200,
    }),
  );

  try {
    const page = await browser.newPage();
    await page.goto(getTargetUrl('https://example.com'));

    // page.content devuelve el HTML actual después de que JavaScript haya podido modificarlo.
    const html = await page.content();
    console.log(html);
  } finally {
    await browser.close();
  }
};

export default getStructure;
