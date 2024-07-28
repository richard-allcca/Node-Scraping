import puppeteer from 'puppeteer';

const getStructure = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage({
    headless: 'new', // hace en proceso sin abrir la ventana
    slowMo: 200, // hace el proceso en mili segundos indicado
  });

  await page.goto('https://example.com');

  // get structure page
  const html = await page.content();
  console.log(html);

  await browser.close();
};

export default getStructure;
