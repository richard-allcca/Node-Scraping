import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

const viewPort = async () => {
  const browser = await puppeteer.launch(
    getLaunchOptions({
      headless: false,
      slowMo: 200,
    }),
  );

  try {
    const page = await browser.newPage();

    // El viewport define el tamaño de la página emulada, no el de la ventana de Chromium.
    await page.setViewport({
      width: 400,
      height: 650,
    });

    await page.goto(getTargetUrl('https://example.com'));
  } finally {
    await browser.close();
  }
};

export default viewPort;
