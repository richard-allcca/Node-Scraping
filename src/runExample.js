import {
  createPdfFromHtml,
  createPdfFromWebPage,
  createPdfFromWebPageWithCustomStyles,
  createPdfFromWebPageWithCustomStylesAndTable,
} from './CreatePageAndPdf.js';
import { extractTextsOfPage } from './extractTextsOfPage.js';
import getAllLinksOfPage from './getAllLinksOfPage.js';
import getStructure from './getStructurePage.js';
import githubShop from './githubShop.js';
import handleDynamicPage from './handleDynamicPage.js';
import loginForm from './loginForm.js';
import printPdf from './printPdf.js';
import screenShot from './screenShot.js';
import screenShotAwait from './screenShotAwait.js';
import viewPort from './viewport.js';
import scrapeProducts from './with-proxies/index.js';

// Keep the public command names together so each example remains independently callable.
const examples = {
  texts: extractTextsOfPage,
  links: getAllLinksOfPage,
  structure: getStructure,
  login: loginForm,
  quotes: handleDynamicPage,
  shop: githubShop,
  viewport: viewPort,
  screenshot: screenShot,
  'screenshot-await': screenShotAwait,
  pdf: printPdf,
  'pdf-web': createPdfFromWebPage,
  'pdf-html': createPdfFromHtml,
  'pdf-styled': createPdfFromWebPageWithCustomStyles,
  'pdf-table': createPdfFromWebPageWithCustomStylesAndTable,
  products: scrapeProducts,
};

const exampleName = process.argv[2];

const runExample = async () => {
  if (!exampleName || !Object.hasOwn(examples, exampleName)) {
    console.error(`Indica un ejemplo válido: ${Object.keys(examples).join(', ')}`);
    process.exitCode = 1;
    return;
  }

  await examples[exampleName]();
};

runExample().catch((error) => {
  console.error(`No se pudo ejecutar el ejemplo "${exampleName}":`, error.message);
  process.exitCode = 1;
});
