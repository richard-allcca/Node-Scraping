/* eslint-disable no-undef */
import puppeteer from "puppeteer";

const main = async () => {
  const url = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  // Lanza una instancia del navegador
  const browser = await puppeteer.launch({
    headless: false, // permite mostrar el navegador
  });

  const page = await browser.newPage();

  // El obj de configuración le dice que espere mientras la pagina carga
  await page.goTo(url, { waitUntil: 'networkidle2' });

  // const tittle = await page.title();
  // console.log(`Titulo de la pagina: ${tittle}`);

  let product = [];
  let nexPage = true;

  while (nexPage) {
    // Evaluate usa el inspector de elementos
    const newProducts = await page.evaluate(() => {
      const $products = document.querySelectorAll('.product-card');
      const mappedProducts = [];

      $products.forEach(($product) => {
        mappedProducts.push({
          title: $product.querySelector('.product-title').textContent,
          price: $product.querySelector('.product-price').textContent,
          priceWhole: $product.querySelector('.product-price-whole').textContent,
          image: $product.querySelector('.product-image').src,
        });
      });

      return mappedProducts;
    });

    product = product.concat(newProducts);

    const nextPageButton = await page.$('.next-page-button');

    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitForNetworkIdle();
    } else {
      nexPage = false;
    }
  }

};

main();