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

## Comandos

| Comando                            | Qué muestra                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `npm run example:texts`            | Extrae títulos, párrafos y enlaces de example.com.           |
| `npm run example:links`            | Recopila URLs de TechCrunch.                                 |
| `npm run example:structure`        | Imprime el HTML de example.com.                              |
| `npm run example:login`            | Completa el formulario de práctica de quotes.toscrape.com.   |
| `npm run example:quotes`           | Extrae citas, autores y etiquetas.                           |
| `npm run example:shop`             | Lee productos de GitHub Shop y escribe JSON.                 |
| `npm run example:viewport`         | Abre example.com con un viewport de 400 x 650.               |
| `npm run example:screenshot`       | Guarda una captura en `save/here/example.png`.               |
| `npm run example:screenshot-await` | Espera a que aparezca un encabezado y guarda `example2.png`. |
| `npm run example:pdf`              | Genera un PDF de example.com en `example/example.pdf`.       |
| `npm run example:pdf-web`          | Genera un PDF web en `pagina_web.pdf`.                       |
| `npm run example:pdf-html`         | Genera un PDF desde HTML definido en el ejemplo.             |
| `npm run example:pdf-styled`       | Genera un PDF web con estilos personalizados.                |
| `npm run example:pdf-table`        | Muestra estilos de impresión para tablas.                    |
| `npm run example:products`         | Recorre páginas de un catálogo y escribe `products.xlsx`.    |

Los ejemplos de productos usan selectores de muestra (`.product-card`, `.product-title`,
`.product-price`, `.product-image` y `.next-page-button`). Adáptalos al HTML del sitio
autorizado que estés estudiando. La URL se configura antes de ejecutar:

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

- `Define SCRAPE_URL`: configura la variable de entorno con una URL de catálogo autorizada.
- `No se encontraron productos`: inspecciona el HTML y adapta los selectores del ejemplo.
- Error al iniciar Chromium: ejecuta `npm install` para instalar las dependencias y el navegador de Puppeteer.
- Error al guardar un archivo: ejecuta los comandos desde la raíz del repositorio para que las rutas relativas coincidan.

## Uso responsable

Ejecuta estos ejemplos únicamente en sitios y datos para los que tengas permiso. Respeta
los términos del sitio, sus límites de frecuencia y las instrucciones de `robots.txt` cuando
corresponda. No uses proxies para eludir controles de acceso o límites del servicio.
