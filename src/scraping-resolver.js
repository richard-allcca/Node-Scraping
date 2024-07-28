import puppeteer from 'puppeteer';
import { fs } from 'fs';

// DESC - Scraping for localhost pagebuilder resolvers

const timeout = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

async function handleDynamicWebPage(url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 50,
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector('#pb-search input');
  await page.type('#pb-search input', 'amp'); // Inserta el texto en el campo de entrada

  await timeout(50);

  const scrollScreen = async () => {
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => {
        // eslint-disable-next-line no-undef
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  };

  await scrollScreen();
  await timeout(50);

  // Obtener elementos
  const elements = await page.$$(
    '.browser__list .list__panel__item .browser__list__left__column h5.browser__list .list__panel__item .browser__list__left__column h5'
  );

  const nameResolverCSS = '.resolver__input__container input[name=name]';
  const regexResolverCSS = '.resolver__input__container input[name=pattern]';

  const resolvers = [];

  for (const element of elements) {
    await element.click();

    await page.waitForSelector('.btn.btn__secondary.btn__drawer');
    await page.click('.btn.btn__secondary.btn__drawer');

    await page.waitForSelector(nameResolverCSS);
    await page.waitForSelector(regexResolverCSS);

    // Extract information from the resolver name
    const inputNameResolver = await page.$eval(
      nameResolverCSS,
      (input) => input.value
    );

    // Extract information from the resolver pattern
    const inputPatternResolver = await page.$eval(
      nameResolverCSS,
      (input) => input.value
    );

    resolvers.push(inputNameResolver, inputPatternResolver);
    // const isRegex = similarRegex.find((item) => item.includes(inputNameResolver));

    // TODO - Remove capture and click event unnecessary
    // await page.waitForSelector('.btn.btn__primary.btn__drawer');
    // await page.click('.btn.btn__primary.btn__drawer');

    // await page.waitForSelector('.btn.btn__half__width.float-right.btn__primary');
    // await page.click('.btn.btn__half__width.float-right.btn__primary');

    // await page.click('.resolverPanel__actions > button');
  }

  await fs.writeFile(`infobae-resolvers.json`, JSON.stringify(resolvers, null, 2));

  await browser.close();
}
const URL_BASE = 'http://localhost/pagebuilder/tools/resolvers';
const URLS_SITE = [ 'Infobae' ];

URLS_SITE.map(async (URL_SITE) => {
  const urlComplete = `${URL_BASE}`;
  handleDynamicWebPage(urlComplete, URL_SITE);
});
