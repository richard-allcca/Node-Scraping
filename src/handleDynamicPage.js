/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

// NOTE - navega entre etiquetas y clases para obtener contenido

const handleDynamicPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');

  // Espera de elemento - Asegúrate de reemplazar esto con el selector de CSS correcto.
  // await page.waitForSelector('div[data-loaded="true"]');

  const data = await page.evaluate(() => {
    const quotes = document.querySelectorAll('.quote');

    const element = [...quotes].map((quote) => {
      const quoteText = quote.querySelector('.text').innerText;
      const author = quote.querySelector('.author').innerText;
      const tags = [...quote.querySelectorAll('.tag')].map(
        (tag) => tag.innerText,
      );

      return {
        quoteText,
        author,
        tags,
      };
    });

    return element;
  });

  console.log(data);
  await browser.close();
};

export default handleDynamicPage;
