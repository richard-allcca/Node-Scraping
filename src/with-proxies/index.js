/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import xlsx from 'xlsx';

const main = async () => {
  const url = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  // const userName = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  // const password = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  // Lanza una instancia del navegador
  const browser = await puppeteer.launch({
    headless: false, // permite mostrar el navegador
    // args: ['--start-maximized'], // maximiza la ventana del navegador
    // args: ['--window-size=1920,1080'],
    // args: [ // En caso quieras usarlo con proxies
    //   `--proxy-server=${proxyUrl}`,
    // ],
  });

  const page = await browser.newPage();

  // En caso quieras usarlo con proxies
  // await page.authenticate({ username: userName, password });

  // El obj de configuración le dice que espere mientras la pagina carga
  await page.goTo(url, { waitUntil: 'networkidle2' });

  // const tittle = await page.title();
  // console.log(`Titulo de la pagina: ${tittle}`);

  let product = [];
  let nexPage = true;

  // IMPORTANT - Utiliza solo un ejemplo de los ciclos y comenta el resto

  // Example 1
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

    // NOTE - Verificar el comportamiento del botón para mantener el ciclo while
    const nextPageButton = await page.$('.next-page-button');

    if (nextPageButton && !nextPageButton.classList.contains('.btn-disable')) {
      await nextPageButton.click();
      await page.waitForNetworkIdle();
    } else {
      nexPage = false;
    }
  }

  // Example 2
  while (nexPage) {
    const newProducts = await page.$$eval('.product-card', ($products) => {
      return $products.map(($product) => {
        return {
          title: $product.querySelector('.product-title').textContent,
          price: $product.querySelector('.product-price').textContent,
          priceWhole: $product.querySelector('.product-price-whole').textContent,
          image: $product.querySelector('.product-image').src,
        };
      });
    });

    // product = product.concat(newProducts);
    product = [...products, ...newProducts];

    const nextPageButton = await page.$('.next-page-button');
    if (nextPageButton && !nextPageButton.classList.contains('.btn-disable')) {
      await nextPageButton.click();
      await page.waitForNetworkIdle();
    } else {
      nexPage = false;
    }
  }

  // Example 3
  while (nexPage) {
    const newProducts = await page.evaluate(() => {
      const $products = Array.from(document.querySelectorAll('.product-card'));

      $products.map(($product) => {
        return {
          title: $product.querySelector('.product-title').textContent,
          price: $product.querySelector('.product-price').textContent,
          priceWhole: $product.querySelector('.product-price-whole').textContent,
          image: $product.querySelector('.product-image').src,
        };
      });
    });

    // product = product.concat(newProducts);
    product = [...products, ...newProducts];

    const nextPageButton = await page.$('.next-page-button');
    if (nextPageButton && !nextPageButton.classList.contains('.btn-disable')) {
      await nextPageButton.click();
      await page.waitForNetworkIdle();
    } else {
      nexPage = false;
    }
  }

  // Guardar en un archivo excel
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(product);
  const path = 'products.xlsx';

  xlsx.utils.book_append_sheet(wb, ws, 'Products');
  xlsx.writeFile(wb, path);

  await browser.close();
};

main();
