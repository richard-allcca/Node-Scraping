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

  const tittle = await page.title();
  console.log(`Titulo de la pagina: ${tittle}`);

};

main();