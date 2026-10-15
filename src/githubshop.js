import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import { validateProducts } from './productData.js';

// NOTE - ejemplo de mapeo de elementos internos en tienda online

const githubShop = async () => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.thegithubshop.com/collectibles');

    // $$eval ejecuta el mapeo en la página y devuelve solo datos serializables a Node.
    const result = await page.$$eval('.item.product.product-item', (elements) =>
      elements.map((element) => ({
        name: element.querySelector('.product-item-link')?.textContent?.trim() ?? '',
        price: element.querySelector('.price')?.textContent?.trim() ?? '',
        image: element.querySelector('.product-image-photo')?.src ?? '',
      })),
    );

    const validProducts = validateProducts(result, ['name', 'price', 'image']);
    await fs.mkdir('./example', { recursive: true });
    await fs.writeFile('./example/githubshop.json', JSON.stringify(validProducts, null, 2));
    console.log(`Se guardaron ${validProducts.length} productos en example/githubshop.json`);
  } finally {
    await browser.close();
  }
};

export default githubShop;
