import puppeteer from 'puppeteer';

const loginForm = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com/');

  // search tag
  await page.click('a[href="/login"]');

  await page.type('input[name=username]', 'admin', { delay: 100 });
  await page.type('input[name=password]', 'admin');

  await page.click('input[type=submit]');

  await browser.close();
};

export default loginForm;
