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
- FastAPI + Python para el catálogo de productos

Para ejecutar Vite 8 necesitas Node.js 20.19 o superior; el backend usa Python.

## Cómo ejecutarlo

```bash
# 1. Clonar el repositorio e instalar dependencias del frontend
git clone <URL-del-repositorio>
cd <nombre-carpeta>
npm install
```

Arrancá el backend FastAPI en una terminal:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
uvicorn backend.main:app --reload
```

En otra terminal, iniciá React:

```bash
npm run dev
```

Abre **http://localhost:5173/**. La API queda disponible en **http://127.0.0.1:8000** y su documentación interactiva en **http://127.0.0.1:8000/docs**.

### API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Verificar que la API está activa |
| `GET` | `/api/products` | Obtener el catálogo |
| `GET` | `/api/products/{product_id}` | Obtener un café por su ID |

El catálogo compartido entre frontend y backend está en `src/data/products.json`. Para cambiar el origen permitido por CORS, define la variable `CORS_ORIGINS` con una lista de URLs separadas por comas. El frontend acepta `VITE_API_URL` para configurar la URL base de la API; por defecto usa `http://127.0.0.1:8000`.

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
├── context/        # Estado global del carrito y catálogo obtenido por API
├── data/           # Catálogo JSON compartido con FastAPI
├── pages/          # Una página por pantalla de Stitch
├── styles/         # Estilos custom por pantalla (hero, cards, formularios)
└── index.css       # Tokens de diseño unificados (Tailwind v4)
backend/            # API FastAPI del catálogo
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

## Ficha técnica

| Campo | Detalle |
|---|---|
| **Nombre del proyecto** | Global Roast Coffee |
| **Tipo de aplicación** | Tienda web de café con catálogo, detalle de productos y flujo de compra |
| **Frontend** | React 19, React Router 7 y Vite 8 |
| **Estilos** | Tailwind CSS 4 y hojas CSS propias |
| **Backend** | API REST desarrollada con FastAPI |
| **Datos del catálogo** | Archivo JSON compartido entre el frontend y el backend |
| **Rutas principales** | `/`, `/tienda`, `/producto/:id`, `/checkout` y `/confirmacion` |
| **Endpoints principales** | `GET /api/health`, `GET /api/products` y `GET /api/products/{product_id}` |
| **Herramientas de desarrollo** | Node.js 20.19 o superior y Python |

## Equipo y roles

Roles sugeridos para equipos de 3 a 5 personas; pueden combinarse según las necesidades del proyecto.

| Integrante | Rol | Responsabilidad |
|---|---|---|
| **Joel Alberto Barrera Peraza** | Líder / integrador | Coordina el repositorio y al equipo, integra los cambios y ayuda a resolver conflictos. |
| **Oscar José Amaya Sánchez** | Diseñador de Stitch | Define la temática y diseña las pantallas en Stitch, manteniendo un estilo visual coherente. |
| **Ana Mária López de Aguilar** | Operadora del agente | Conduce OpenCode para importar las pantallas y revisa que la implementación coincida con el diseño. |
| **Lucía Milena Hernández Bonilla** | QA / revisora | Prueba las rutas, los enlaces, la vista móvil y la accesibilidad; reporta los ajustes necesarios. |
| **Miguel Josué Tobías Rivas** | Guardián de commits | Revisa el uso de Conventional Commits y verifica que no se suban archivos `.env` ni claves. |
