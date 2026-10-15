# Ejemplos de Puppeteer

Colección de ejemplos independientes para aprender navegación, extracción de datos,
capturas y generación de PDF con Puppeteer. Cada ejemplo se puede ejecutar por separado.

## Requisitos

- Node.js 20 o posterior.
- Chromium instalado automáticamente por Puppeteer durante la instalación de dependencias.
- Acceso a Internet para los ejemplos que navegan a sitios externos.

```bash
npm install
```

## Comandos y destinos

| Comando                            | Destino              | Qué produce                                   |
| ---------------------------------- | -------------------- | --------------------------------------------- |
| `npm run example:texts`            | example.com          | Textos de encabezado, párrafo y enlaces.      |
| `npm run example:links`            | TechCrunch           | URLs de los enlaces.                          |
| `npm run example:structure`        | example.com          | HTML actual de la página.                     |
| `npm run example:login`            | quotes.toscrape.com  | Completa el formulario de práctica.           |
| `npm run example:quotes`           | quotes.toscrape.com  | Citas, autores y etiquetas.                   |
| `npm run example:shop`             | GitHub Shop          | `example/githubshop.json`.                    |
| `npm run example:viewport`         | example.com          | Viewport emulado de 400 x 650.                |
| `npm run example:screenshot`       | example.com          | `save/here/example.png`.                      |
| `npm run example:screenshot-await` | example.com          | `example2.png`, tras esperar el encabezado.   |
| `npm run example:pdf`              | example.com          | `example/example.pdf`.                        |
| `npm run example:pdf-web`          | example.com          | `pagina_web.pdf`.                             |
| `npm run example:pdf-html`         | HTML incluido        | `mi_pagina.pdf`; funciona sin Internet.       |
| `npm run example:pdf-styled`       | example.com          | `pagina_web_con_estilos.pdf`.                 |
| `npm run example:pdf-table`        | example.com          | `pagina_web_con_tabla.pdf`.                   |
| `npm run example:products`         | Catálogo configurado | `products.xlsx`; requiere adaptar selectores. |

Salvo `example:pdf-html`, estos comandos navegan a sitios externos y pueden verse afectados
por cambios del sitio o de la red. Para probar Chromium sin contactar servicios externos, usa
el smoke test local descrito en la sección de calidad.

## Configuración

`PUPPETEER_URL` reemplaza el destino predeterminado de los ejemplos que navegan. Los
selectores y esperas también deben corresponder a esa página. `PUPPETEER_HEADLESS` acepta
`true` o `false`, y `PUPPETEER_SLOW_MO` una demora en milisegundos mayor o igual que cero.
Si no se definen, cada ejemplo conserva sus opciones predeterminadas.

```powershell
$env:PUPPETEER_URL = 'https://sitio-autorizado.example'
$env:PUPPETEER_HEADLESS = 'true'
$env:PUPPETEER_SLOW_MO = '0'
npm run example:texts
```

El formulario requiere credenciales de una cuenta autorizada, proporcionadas solo en el
entorno y nunca guardadas en el repositorio:

```powershell
$env:PUPPETEER_LOGIN_USERNAME = 'usuario-de-prueba'
$env:PUPPETEER_LOGIN_PASSWORD = '<contraseña>'
npm run example:login
```

Para Bash, asigna las variables antes del comando, por ejemplo:
`PUPPETEER_URL='https://sitio-autorizado.example' npm run example:texts`.

Los ejemplos de productos usan selectores de muestra (`.product-card`, `.product-title`,
`.product-price`, `.product-image` y `.next-page-button`). Adáptalos al HTML del catálogo
autorizado. `SCRAPE_URL` configura específicamente su URL y tiene prioridad sobre `PUPPETEER_URL`:

```powershell
$env:SCRAPE_URL = 'https://sitio-autorizado.example/catalogo'
npm run example:products
```

En Bash, usa `SCRAPE_URL='https://sitio-autorizado.example/catalogo' npm run example:products`.

## Calidad

```bash
npm run lint
npm run format:check
npm test
```

Prettier es la única herramienta que define el formato. ESLint usa sus reglas recomendadas
para detectar problemas de código, sin imponer una segunda guía de estilo.

La comprobación de Chromium es optativa y usa una página creada localmente:

```powershell
$env:PUPPETEER_SMOKE = '1'
npm run test:browser
```

## Solución de errores

- `Define SCRAPE_URL o PUPPETEER_URL`: configura una URL de catálogo autorizada.
- `Define PUPPETEER_LOGIN_USERNAME y PUPPETEER_LOGIN_PASSWORD`: configura credenciales autorizadas para el sitio de práctica.
- `No se encontraron productos`: inspecciona el HTML y adapta los selectores del ejemplo.
- Error al iniciar Chromium: ejecuta `npm install` para instalar las dependencias y el navegador de Puppeteer.
- Error al guardar un archivo: ejecuta los comandos desde la raíz del repositorio para que las rutas relativas coincidan.

## Uso responsable

Ejecuta estos ejemplos únicamente en sitios y datos para los que tengas permiso. Respeta
los términos del sitio, sus límites de frecuencia y las instrucciones de `robots.txt` cuando
corresponda. No uses proxies para eludir controles de acceso o límites del servicio.
