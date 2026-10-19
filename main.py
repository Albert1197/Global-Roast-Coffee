"""Global Roast Coffee — API FastAPI + servidor del frontend React.

- /api/products  → catálogo de cafés
- /api/orders    → creación y consulta de pedidos
- /api/health    → chequeo de vida
- Cualquier otra ruta sirve el build de React (dist/) con fallback SPA,
  así las rutas de React Router (/tienda, /producto/:id...) funcionan directo.
"""
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.routers import orders, products

BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"

app = FastAPI(
    title="Global Roast Coffee API",
    description="API del e-commerce de café de especialidad + serving del frontend React.",
    version="1.0.0",
)

# Para desarrollar el frontend con `npm run dev` (Vite en :5173) contra esta API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(orders.router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Serving del frontend compilado (dist/)
# ---------------------------------------------------------------------------
if (DIST_DIR / "assets").is_dir():
    app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")


@app.get("/{full_path:path}", include_in_schema=False)
def serve_spa(full_path: str) -> FileResponse:
    dist = DIST_DIR.resolve()

    # Archivos sueltos del build (favicon, etc.): seguridad contra path traversal.
    if full_path:
        candidate = (dist / full_path).resolve()
        if candidate.is_relative_to(dist) and candidate.is_file():
            return FileResponse(candidate)

    index = dist / "index.html"
    if not index.is_file():
        raise HTTPException(
            status_code=404,
            detail="Frontend no compilado: ejecutá `npm run build` para generar dist/.",
        )
    # Fallback SPA: React Router se encarga del resto de las rutas.
    return FileResponse(index)
