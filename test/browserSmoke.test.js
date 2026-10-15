import assert from 'node:assert/strict';
import test from 'node:test';
import puppeteer from 'puppeteer';

test('Puppeteer renders and reads a local page', { skip: process.env.PUPPETEER_SMOKE !== '1' }, async () => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setContent('<main><h1>Local smoke test</h1></main>');
    const heading = await page.$eval('h1', (element) => element.textContent);

    assert.equal(heading, 'Local smoke test');
  } finally {
    await browser.close();
  }
});
