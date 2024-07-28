import puppeteer from 'puppeteer';

import fs from 'fs/promises'; // modulo para manejo de archivos, node

// NOTE - ejemplo de mapeo de elementos internos en tienda online

const githubShop = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.thegithubshop.com/collectibles');

  // NOTE - Method 1
  //   const result = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll(".item.product.product-item")).map(
  //       (e) => ({
  //         name: e.querySelector(".product-item-link").innerText,
  //         price: e.querySelector(".price").innerText,
  //         image: e.querySelector(".product-image-photo").src,
  //       })
  //     )
  //   );

  // NOTE - Method 2
  const mapElements = (elements) => {
    return elements.map((e) => {
      return {
        name: e.querySelector('.product-item-link').innerText,
        price: e.querySelector('.price').innerText,
        image: e.querySelector('.product-image-photo').src,
      };
    });
  };

  const result = await page.$$eval('.item.product.product-item', mapElements);

  console.log(result);

  // save result in file
  await fs.writeFile(
    './example/githubshop.json',
    JSON.stringify(result, null, 2),
  );

  await browser.close();
};

export default githubShop;
