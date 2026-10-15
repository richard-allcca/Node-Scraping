import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

// Centraliza el ciclo de vida del navegador para cerrarlo también ante errores.
const withPage = async (createPdf) => {
  const browser = await puppeteer.launch(getLaunchOptions());
  try {
    const page = await browser.newPage();
    await createPdf(page);
  } finally {
    await browser.close();
  }
};

// Convierte HTML escrito aquí mismo, sin depender de una web externa.
export const createPdfFromHtml = async () =>
  withPage(async (page) => {
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
    await page.pdf({ path: 'mi_pagina.pdf', format: 'A4' });
  });

// Carga una web y espera a que la actividad de red casi termine.
export const createPdfFromWebPage = async () =>
  withPage(async (page) => {
    await page.goto(getTargetUrl('https://example.com'), { waitUntil: 'networkidle2' });
    await page.pdf({ path: 'pagina_web.pdf', format: 'A4' });
  });

// Añade CSS antes de imprimir para personalizar la apariencia del documento.
export const createPdfFromWebPageWithCustomStyles = async () =>
  withPage(async (page) => {
    await page.goto(getTargetUrl('https://example.com'), { waitUntil: 'networkidle2' });
    const customStyles = `
      body { font-family: Arial, sans-serif; }
      h1 { color: #333; }
    `;
    await page.addStyleTag({ content: customStyles });
    await page.pdf({ path: 'pagina_web_con_estilos.pdf', format: 'A4' });
  });

// Ejemplo de estilos para tablas impresas.
export const createPdfFromWebPageWithCustomStylesAndTable = async () =>
  withPage(async (page) => {
    await page.goto(getTargetUrl('https://example.com'), { waitUntil: 'networkidle2' });
    const customStyles = `
      body { font-family: Arial, sans-serif; }
      h1 { color: #333; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    `;
    await page.addStyleTag({ content: customStyles });
    await page.pdf({ path: 'pagina_web_con_tabla.pdf', format: 'A4' });
  });
