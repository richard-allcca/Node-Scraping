import puppeteer from 'puppeteer';
import { getLaunchOptions, getTargetUrl } from './exampleConfig.js';

const loginForm = async () => {
  const username = process.env.PUPPETEER_LOGIN_USERNAME;
  const password = process.env.PUPPETEER_LOGIN_PASSWORD;

  if (!username || !password) {
    throw new Error('Define PUPPETEER_LOGIN_USERNAME y PUPPETEER_LOGIN_PASSWORD para el sitio de práctica.');
  }

  const browser = await puppeteer.launch(
    getLaunchOptions({
      headless: false,
    }),
  );
  try {
    const page = await browser.newPage();

    // Espera a que termine la navegación para que el formulario esté disponible.
    await page.goto(getTargetUrl('https://quotes.toscrape.com/'));

    // El enlace lleva al formulario de inicio de sesión del sitio de práctica.
    await page.click('a[href="/login"]');

    // Los selectores CSS localizan los campos por el atributo name.
    // El retraso solo hace visible la escritura; no es necesario para automatizarla.
    await page.type('input[name=username]', username, { delay: 100 });
    await page.type('input[name=password]', password);

    // Envía el formulario haciendo clic en el botón submit.
    await page.click('input[type=submit]');
  } finally {
    await browser.close();
  }
};

export default loginForm;
