import puppeteer from 'puppeteer';

const getStructure = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // page.content devuelve el HTML actual después de que JavaScript haya podido modificarlo.
    const html = await page.content();
    console.log(html);
  } finally {
    await browser.close();
  }
};

export default getStructure;
