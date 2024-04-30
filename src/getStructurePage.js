import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  // STUB - abre una ventana para hacer el proecso
  // const page = await browser.newPage();

  const page = await browser.newPage({
    headless: 'new', // hace en proceso sin abrir la ventana
    slowMo: 200, // hace el proceso en milisegundos indicado
  });

  await page.goto('https://example.com');

  // get structure page
  const html = await page.content();
  console.log(html);

  await browser.close();
})();
