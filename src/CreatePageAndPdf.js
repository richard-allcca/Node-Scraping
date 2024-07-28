const puppeteer = require('puppeteer');

// IMPORTANT - No ejecutes este archivo - Estos ejemplos están en una función auto ejecutable

// INFO - Example 1 Crear un pdf a partir de html
export const createPdfFromHtml = async () => {
  // Lanzar el navegador
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Establecer el contenido HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mi Página</title>
      <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Hola, mundo!</h1>
      <p>Esta es una página HTML convertida a PDF usando Puppeteer.</p>
    </body>
    </html>
  `;
  await page.setContent(htmlContent);

  // Generar el PDF
  await page.pdf({ path: 'mi_pagina.pdf', format: 'A4' });

  // Cerrar el navegador
  await browser.close();
};

// INFO - Example 2 Crear un pdf a partir de una pagina web

export const createPdfFromWebPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  // Generar el PDF
  await page.pdf({ path: 'pagina_web.pdf', format: 'A4' });

  await browser.close();
};

// INFO - Example 3 Crear un pdf a partir de una pagina web con estilos personalizados

export const createPdfFromWebPageWithCustomStyles = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  // Agregar estilos personalizados
  const customStyles = `
    body { font-family: Arial, sans-serif; }
    h1 { color: #333; }
  `;
  await page.addStyleTag({ content: customStyles });

  // Generar el PDF
  await page.pdf({ path: 'pagina_web_con_estilos.pdf', format: 'A4' });

  await browser.close();
};

// INFO - Example 4 Crear un pdf a partir de una pagina web con estilos personalizados y una tabla

export const createPdfFromWebPageWithCustomStylesAndTable = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  // Agregar estilos personalizados
  const customStyles = `
    body { font-family: Arial, sans-serif; }
    h1 { color: #333; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  `;
  await page.addStyleTag({ content: customStyles });

  // Generar el PDF
  await page.pdf({ path: 'pagina_web_con_tabla.pdf', format: 'A4' });

  await browser.close();
};
