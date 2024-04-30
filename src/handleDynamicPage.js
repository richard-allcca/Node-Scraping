import puppeteer from 'puppeteer';

// NOTE - navega entre etiquetas y clases para obtener contenido

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');
  //   await page.waitForSelector('div[data-loaded="true"]'); // Asegúrate de reemplazar esto con el selector de CSS correcto.
  const data = await page.evaluate(() => {
    const quotes = document.querySelectorAll('.quote');

    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector('.text').innerText;
      const author = quote.querySelector('.author').innerText;
      const tags = [...quote.querySelectorAll('.tag')].map(
        (tag) => tag.innerText
      );

      return {
        quoteText,
        author,
        tags,
      };
    });

    return data;
  });

  console.log(data);
  await browser.close();
})();
