# 🌍 Global Roast Coffee — App React desde Stitch

Aplicación web generada a partir de las pantallas del proyecto de **Google Stitch** ["Global Roast Coffee Home"](https://stitch.withgoogle.com), usando el MCP de Stitch + OpenCode.

## Pantallas incluidas

| Ruta | Pantalla |
|------|----------|
| `/` | Home — hero, cafés destacados, proceso y CTA |
| `/tienda` | Catálogo con filtros por país y tueste |
| `/producto/:id` | Detalle del café — molienda, cantidad y total |
| `/checkout` | Formulario de compra + resumen del pedido |
| `/confirmacion` | Confirmación con botón de WhatsApp |

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7

## Cómo ejecutarlo

```bash
# 1. Clonar el repositorio
git clone <URL-del-repositorio>
cd <nombre-carpeta>

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173/** en tu navegador.

### Otros comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar el build de producción |

## Estructura del proyecto

```
src/
├── components/     # Header y Footer compartidos
├── context/        # Estado global del carrito (CartContext)
├── data/           # Catálogo de productos
├── pages/          # Una página por pantalla de Stitch
├── styles/         # Estilos custom por pantalla (hero, cards, formularios)
└── index.css       # Tokens de diseño unificados (Tailwind v4)
stitch-export/      # HTML y capturas originales exportados desde Stitch
scripts/            # Utilidades (unwrap-stitch.cjs extrae el HTML del JSON)
```

## Funcionalidades

- ✅ Filtros interactivos en la tienda (país + tueste)
- ✅ Selector de molienda y contador de cantidad con total dinámico
- ✅ Carrito global: agregar desde Detalle, gestionar en Checkout
- ✅ Navegación real entre todas las pantallas
- ✅ Diseño fiel al exportado desde Stitch (fuentes Fraunces + DM Sans)

## Notas

- Las imágenes de los productos están hospedadas en los servidores de Google (URLs de Stitch) — se cargan desde internet.
- Los colores de las 5 pantallas de Stitch variaban levemente entre sí; se unificaron en un solo tema en `src/index.css`.
