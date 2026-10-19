# 🌍 Global Roast Coffee — App React desde Stitch Grupo 4

Este repositorio integra:
- **API IA (`api-ia/`)**: FastAPI para analizar prompts, procesar texto y generar respuestas controladas.
- **Skill personalizada (`.github/skills/prompt-analyzer/`)**: guía al agente para usar/modificar la API con criterio técnico, validación y seguridad.

## 1) Funcionalidad de la API

La API expone endpoints simples, funcionales y correctamente documentados con **Swagger / OpenAPI** en `/docs`.

### Endpoints

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- FastAPI + Python para el catálogo de productos

Para ejecutar Vite 8 necesitas Node.js 20.19 o superior; el backend usa Python.

### Estructura (separación rutas / lógica / configuración)

```text
api-ia/
├── app/
│   ├── config.py      # Settings: límites, tonos, stopwords, umbrales de riesgo
│   ├── models.py      # Esquemas Pydantic (request/response) con validación
│   ├── services.py    # Lógica pura: tokenización, intención, riesgo, keywords, resumen, stats
│   ├── routers/
│   │   ├── prompts.py   # /api/prompts
│   │   ├── text.py      # /api/text
│   │   └── responses.py # /api/responses
│   └── main.py        # App FastAPI + CORS + inclusión de routers
└── requirements.txt
```

### Ejemplos rápidos

**POST `/api/prompts/analyze`**
```json
{
  "text": "¿Cómo preparo un café V60?",
  "context": "chat",
  "top_keywords": 5
}
```

**POST `/api/text/process`**
```json
{
  "text": "Hola mundo, esto es una prueba de análisis de texto.",
  "remove_stopwords": true,
  "lowercase": false,
  "top_keywords": 5,
  "summary_sentences": 2
}
```

**POST `/api/responses/generate`**
```json
{
  "prompt": "Necesito ayuda con FastAPI",
  "tone": "profesional"
}
```

### Cómo ejecutar

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

## 2) Propósito y funcionamiento de la skill

La skill **`prompt-analyzer`** se encuentra en `.github/skills/prompt-analyzer/SKILL.md`.

**Propósito:** guiar al agente para mantener coherencia al diseñar, extender o consumir esta API. Busca aplicar buenas prácticas: validación estricta, separación de responsabilidades, valores por defecto seguros y documentación clara.

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

## 3) Cómo la skill modifica o personaliza el comportamiento del agente

La skill influye de forma explícita en la forma de razonar y actuar:

- **Consumo guiado**: usa únicamente los esquemas existentes. No inventa campos ni rompe el contrato.
- **Validación obligatoria**: aplica `Field` + `@field_validator` (trim, no vacío, rangos).
- **Fuente única**: toma constantes desde `app/config.py`. Elimina "números mágicos".
- **Separación reforzada**: cualquier nuevo cálculo va primero a `services.py`, luego se mapea a modelos y se expone en router.
- **Conciencia de riesgo**: al detectar riesgo `medio/alto` debe incluir `flags` y `recommendation.message`. Nunca vuelca patrones sensibles en `reply`.
- **Generación controlada**: respeta `settings.tones`. Usa `template` para trazabilidad.
- **Sin efectos colaterales**: mantiene `services.py` puro y determinista.
- **Documentación sincronizada**: actualiza descripciones para mantener coherente `/docs`.
- **Pruebas mínimas**: valida con `/docs` o `curl` tras cualquier cambio.
- **Dependencias mínimas**: se mantiene en `fastapi`, `uvicorn[standard]`, `pydantic>=2`.

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

## Equipo y roles Grupo 4

Roles sugeridos para equipos de 3 a 5 personas; pueden combinarse según las necesidades del proyecto.

| Integrante | Rol | Responsabilidad |
|---|---|---|
| **Joel Alberto Barrera Peraza** | Líder / integrador | Coordina el repositorio y al equipo, integra los cambios y ayuda a resolver conflictos. |
| **Oscar José Amaya Sánchez** | Diseñador de Stitch | Define la temática y diseña las pantallas en Stitch, manteniendo un estilo visual coherente. |
| **Ana Mária López de Aguilar** | Operadora del agente | Conduce OpenCode para importar las pantallas y revisa que la implementación coincida con el diseño. |
| **Lucía Milena Hernández Bonilla** | QA / revisora | Prueba las rutas, los enlaces, la vista móvil y la accesibilidad; reporta los ajustes necesarios. |
| **Miguel Josué Tobías Rivas** | Guardián de commits | Revisa el uso de Conventional Commits y verifica que no se suban archivos `.env` ni claves. |
