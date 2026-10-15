import puppeteer from 'puppeteer';

const loginForm = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();

    // Espera a que termine la navegación para que el formulario esté disponible.
    await page.goto('https://quotes.toscrape.com/');

    // El enlace lleva al formulario de inicio de sesión del sitio de práctica.
    await page.click('a[href="/login"]');

    // Los selectores CSS localizan los campos por el atributo name.
    // El retraso solo hace visible la escritura; no es necesario para automatizarla.
    await page.type('input[name=username]', 'admin', { delay: 100 });
    await page.type('input[name=password]', 'admin');

    // Envía el formulario haciendo clic en el botón submit.
    await page.click('input[type=submit]');
  } finally {
    await browser.close();
  }
};

export default loginForm;
