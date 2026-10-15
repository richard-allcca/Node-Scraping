import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const printPdf = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  try {
    const page = await browser.newPage();

    // El viewport controla el área visible; el formato del PDF se configura aparte.
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://example.com');
    await mkdir('example', { recursive: true });
    await page.pdf({
      path: './example/example.pdf',
      format: 'A4',
      printBackground: false,
    });
  } finally {
    await browser.close();
  }
};

export default printPdf;
