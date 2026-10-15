/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

// NOTE - navega entre etiquetas y clases para obtener contenido

const handleDynamicPage = async () => {
  const browser = await puppeteer.launch(
    getLaunchOptions({
      headless: false,
      slowMo: 200,
    }),
  );
  try {
    const page = await browser.newPage();
    await page.goto(getTargetUrl('https://quotes.toscrape.com'));

    // Espera un elemento observable en vez de depender de una pausa de duración fija.
    await page.waitForSelector('.quote');
    const data = await page.$$eval('.quote', (quotes) =>
      quotes.map((quote) => ({
        quoteText: quote.querySelector('.text')?.textContent?.trim() ?? '',
        author: quote.querySelector('.author')?.textContent?.trim() ?? '',
        tags: Array.from(quote.querySelectorAll('.tag')).map((tag) => tag.textContent.trim()),
      })),
    );

    console.log(data);
  } finally {
    await browser.close();
  }
};

export default handleDynamicPage;
