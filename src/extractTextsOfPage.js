/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

export const extractTextsOfPage = async () => {

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });

  const page = await browser.newPage();

  await page.goto('https://example.com', { waitUntil: 'networkidle2' } );

  // const title = await page.title();
  // console.log(title);

  // Obtener textos de pagina
  const result = await page.evaluate(() => {
    // execute all type of js in dom
    const title = document.querySelector('h1');
    const description = document.querySelector('p').innerText;
    const links = document.querySelector('a').innerText;
    document.write('hello world');
    return {
      title,
      description,
      links,
    };
  });

  console.log(result);

  // Wait for 5 seconds
  await new Promise((r) => setTimeout(r, 3000));

  await page.close();

  await browser.close();
};
