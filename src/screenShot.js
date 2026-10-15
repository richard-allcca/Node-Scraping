import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

const screenShot = async () => {
  const browser = await puppeteer.launch(
    getLaunchOptions({
      headless: false,
    }),
  );
  try {
    const page = await browser.newPage();
    await page.goto(getTargetUrl('https://example.com'));
    await mkdir('save/here', { recursive: true });
    await page.screenshot({ path: 'save/here/example.png' });
  } finally {
    await browser.close();
  }
};

export default screenShot;
