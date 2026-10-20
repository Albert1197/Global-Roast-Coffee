# 🌍 Global Roast Coffee — Tienda de Café de Especialidad (Grupo 4)

Plataforma e-commerce moderna para la venta y exploración de café de especialidad de orígenes internacionales (El Salvador, Ruanda, Panamá). Diseñada a partir de pantallas de Stitch y desarrollada con un stack desacoplado de **React 19** en el frontend y **FastAPI con SQLite** en el backend.

---

## 🚀 Arquitectura y Tecnologías

* **Frontend:** React 19, React Router v7, Vite 8 y Tailwind CSS v4.
* **Backend:** FastAPI (Python), servidor ASGI Uvicorn y validación de datos con Pydantic v2 (serialización en `camelCase` para el frontend).
* **Base de Datos:** SQLite (`coffee.db`) con migración y sembrado automático inicial (*seed*).
* **Serving Unificado:** En producción, FastAPI puede servir directamente el build estático de React con soporte para rutas SPA.

---

## 📁 Estructura del Proyecto

```text
Global-Roast-Coffee/
├── app/                      # Backend FastAPI
│   ├── database.py           # Conexión SQLite, migraciones y operaciones CRUD
│   ├── models.py             # Modelos Pydantic (Product, Order, Customer, etc.)
│   ├── catalog.py            # Catálogo base inicial utilizado para el seed
│   └── routers/              # Rutas modularizadas de la API
│       ├── products.py       # Endpoints para el catálogo de cafés
│       └── orders.py         # Endpoints para creación y consulta de pedidos
├── src/                      # Frontend React
│   ├── components/           # Componentes comunes (Header, Footer, etc.)
│   ├── context/              # CartContext (estado global del carrito de compras)
│   ├── data/                 # Catálogo de fallback local (products.js)
│   ├── pages/                # Páginas de la tienda (Home, Tienda, Detalle, Checkout, etc.)
│   ├── styles/               # Estilos personalizados y utilidades de Tailwind v4
│   ├── api.js                # Cliente HTTP para conectar con la API de FastAPI
│   └── hooks.js              # Hooks personalizados de consumo de datos
├── stitch-export/            # Diseños y capturas originales exportados de Stitch
├── main.py                   # Punto de entrada de FastAPI + serving SPA
├── vite.config.js            # Configuración de Vite con proxy hacia /api
├── requirements.txt          # Dependencias de Python
└── package.json              # Dependencias de Node.js
```

---

## 🛠️ Cómo Ejecutar el Proyecto

### Requisitos previos
* **Node.js:** Versión 20.19 o superior y `npm`.
* **Python:** Versión 3.10 o superior y `pip`.

### Modo Desarrollo (Recomendado)

Ejecuta el backend y el frontend en dos terminales separadas para contar con recarga automática en vivo (*hot-reload*):

#### 1. Backend (FastAPI)
```powershell
# Crear y activar entorno virtual (opcional pero recomendado)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Iniciar el servidor
uvicorn main:app --reload --port 8000
```
* **API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
* **Documentación interactiva (Swagger / OpenAPI):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### 2. Frontend (React + Vite)
```powershell
# Instalar paquetes
npm install

# Iniciar servidor de desarrollo
npm run dev
```
* **Aplicación Web:** [http://localhost:5173](http://localhost:5173)

> [!NOTE]
> Vite incluye un proxy en `vite.config.js` que redirige automáticamente todas las peticiones a `/api` hacia `http://127.0.0.1:8000`.

---

### Modo Producción / Servidor Unificado

Si deseas que FastAPI compile y sirva tanto la API como la interfaz web desde un único puerto:

```powershell
# 1. Compilar el frontend (genera la carpeta dist/)
npm run build

# 2. Levantar el servidor unificado
uvicorn main:app --port 8000
```
Ingresa a [http://127.0.0.1:8000](http://127.0.0.1:8000). FastAPI servirá la aplicación de React y resolverá automáticamente el enrutamiento SPA para rutas como `/tienda`, `/checkout` o `/producto/:id`.

---

## 📡 Endpoints de la API

Todos los endpoints están documentados con OpenAPI en `/docs`:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/health` | Chequeo de estado del servidor (`{"status": "ok"}`). |
| `GET` | `/api/products` | Obtiene el catálogo completo desde SQLite. Permite filtros por query: `?roast=Medio` o `?country=El Salvador`. |
| `GET` | `/api/products/{id}` | Obtiene el detalle de un café específico por su identificador (ej: `/api/products/pacamara`). |
| `POST` | `/api/products` | Agrega un nuevo café a la base de datos `coffee.db`. |
| `POST` | `/api/orders` | Registra una orden de compra, valida los productos en la base de datos, calcula subtotales y suma el envío (\$3.50). |
| `GET` | `/api/orders/{id}` | Consulta una orden registrada mediante su identificador único (ej: `GR-00001`). |

---

## 📋 Ficha Técnica

| Campo | Detalle |
|---|---|
| **Nombre del proyecto** | Global Roast Coffee |
| **Tipo de aplicación** | Tienda web de café con catálogo, detalle de productos y flujo de compra |
| **Frontend** | React 19, React Router 7 y Vite 8 |
| **Estilos** | Tailwind CSS 4 y módulos CSS propios |
| **Backend** | API REST desarrollada con FastAPI |
| **Base de Datos** | SQLite (`coffee.db`) |
| **Rutas principales** | `/`, `/tienda`, `/nuestro-cafe`, `/producto/:id`, `/checkout` y `/confirmacion` |
| **Herramientas** | Node.js (v20+), Python (v3.10+) |

---

## 👥 Equipo y Roles — Grupo 4

| Integrante | Rol | Responsabilidad |
|---|---|---|
| **Joel Alberto Barrera Peraza** | Líder / integrador | Coordina el repositorio y al equipo, integra los cambios y ayuda a resolver conflictos. |
| **Oscar José Amaya Sánchez** | Diseñador de Stitch | Define la temática y diseña las pantallas en Stitch, manteniendo un estilo visual coherente. |
| **Ana María López de Aguilar** | Operadora del agente | Conduce la importación de las pantallas y revisa que la implementación coincida con el diseño. |
| **Lucía Milena Hernández Bonilla** | QA / revisora | Prueba las rutas, los enlaces, la vista móvil y la accesibilidad; reporta los ajustes necesarios. |
| **Miguel Josué Tobías Rivas** | Guardián de commits | Revisa el uso de Conventional Commits y verifica que no se suban archivos `.env`, bases de datos ni claves. |
