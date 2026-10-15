import puppeteer from 'puppeteer';
import ExcelJS from 'exceljs';
import { validateProducts } from '../productData.js';

const scrapeProducts = async () => {
  const { SCRAPE_URL } = process.env;

  if (!SCRAPE_URL) {
    throw new Error('Define SCRAPE_URL con la URL del sitio autorizado que vas a practicar.');
  }

  // Abre Chromium en modo visible para poder observar el recorrido.
  const browser = await puppeteer.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();
    await page.goto(SCRAPE_URL, { waitUntil: 'networkidle2' });

    const products = [];
    let hasNextPage = true;

    while (hasNextPage) {
      // Ajusta estos selectores a la estructura HTML del sitio de práctica.
      const pageProducts = await page.$$eval('.product-card', (productCards) =>
        productCards.map((productCard) => ({
          title: productCard.querySelector('.product-title')?.textContent?.trim() ?? '',
          price: productCard.querySelector('.product-price')?.textContent?.trim() ?? '',
          priceWhole: productCard.querySelector('.product-price-whole')?.textContent?.trim() ?? '',
          image: productCard.querySelector('.product-image')?.src ?? '',
        })),
      );

      products.push(...pageProducts);

      // Un ElementHandle vive en Node; evalúa sus propiedades en el navegador.
      const nextPageButton = await page.$('.next-page-button');
      if (!nextPageButton) {
        hasNextPage = false;
      } else {
        const isDisabled = await nextPageButton.evaluate((button) => {
          return (
            button.disabled ||
            button.classList.contains('btn-disable') ||
            button.getAttribute('aria-disabled') === 'true'
          );
        });

        if (isDisabled) {
          hasNextPage = false;
        } else {
          await nextPageButton.click();
          await page.waitForNetworkIdle({ timeout: 10000 });
        }
      }
    }

    const validProducts = validateProducts(products);

    // ExcelJS ya está declarada en package.json; crea el libro y agrega las filas extraídas.
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');
    worksheet.columns = [
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Price', key: 'price', width: 20 },
      { header: 'Price whole', key: 'priceWhole', width: 20 },
      { header: 'Image', key: 'image', width: 60 },
    ];
    worksheet.addRows(validProducts);
    await workbook.xlsx.writeFile('products.xlsx');
    console.log(`Se guardaron ${validProducts.length} productos en products.xlsx`);
  } finally {
    await browser.close();
  }
};

export default scrapeProducts;
