import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  console.log(title);

  const result = await page.evaluate(() => {
    // execute all tipe of js in dom
    const title = document.querySelector('h1');
    const description = document.querySelector('p').innerText;
    const more = document.querySelector('a').innerText;
    document.write('hello world');
    return {
      title,
      description,
      more,
    };
  });

  console.log(result);

  // Wait for 5 seconds
  await new Promise((r) => setTimeout(r, 3000));

  await page.close();

  await browser.close();
})();
