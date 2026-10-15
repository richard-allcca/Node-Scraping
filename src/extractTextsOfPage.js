/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

export const extractTextsOfPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    // page.evaluate corre en el contexto del navegador, donde existe document.
    const result = await page.evaluate(() => ({
      title: document.querySelector('h1')?.innerText ?? '',
      description: document.querySelector('p')?.innerText ?? '',
      links: Array.from(document.querySelectorAll('a')).map((link) => link.innerText),
    }));

    console.log(result);
  } finally {
    await browser.close();
  }
};
