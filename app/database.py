"""app/database.py — Conexión y operaciones con SQLite."""
import sqlite3
from pathlib import Path
from app.models import Product
from app.catalog import PRODUCTS  # Usado para sembrar datos iniciales

DB_PATH = Path(__file__).resolve().parent.parent / "coffee.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Permite acceder a las columnas por nombre
    return conn


def init_db():
    """Crea la tabla si no existe y si está vacía, inserta los productos actuales."""
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                origin TEXT NOT NULL,
                origin_short TEXT NOT NULL,
                notes TEXT NOT NULL,
                notes_short TEXT NOT NULL,
                price REAL NOT NULL,
                roast TEXT NOT NULL,
                badge_tueste TEXT NOT NULL,
                process TEXT NOT NULL,
                altitude TEXT NOT NULL,
                variety TEXT NOT NULL,
                description TEXT NOT NULL,
                img_home TEXT NOT NULL,
                img_tienda TEXT NOT NULL,
                img_detalle TEXT NOT NULL,
                img_thumb TEXT NOT NULL
            )
        """)

        # Si la tabla está vacía, sembramos los cafés existentes
        cursor = conn.execute("SELECT COUNT(*) FROM products")
        if cursor.fetchone()[0] == 0:
            for p in PRODUCTS:
                conn.execute("""
                    INSERT INTO products VALUES (
                        :id, :name, :origin, :origin_short, :notes, :notes_short,
                        :price, :roast, :badge_tueste, :process, :altitude,
                        :variety, :description, :img_home, :img_tienda,
                        :img_detalle, :img_thumb
                    )
                """, p.model_dump())
            conn.commit()


def get_all_products(roast: str | None = None, country: str | None = None) -> list[Product]:
    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if roast:
        query += " AND LOWER(roast) = LOWER(?)"
        params.append(roast)
    if country:
        query += " AND LOWER(origin) LIKE LOWER(?)"
        params.append(f"{country}%")

    with get_connection() as conn:
        rows = conn.execute(query, params).fetchall()
        return [Product(**dict(row)) for row in rows]


def get_product_by_id(product_id: str) -> Product | None:
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
        return Product(**dict(row)) if row else None


def create_product(product: Product) -> Product:
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO products VALUES (
                :id, :name, :origin, :origin_short, :notes, :notes_short,
                :price, :roast, :badge_tueste, :process, :altitude,
                :variety, :description, :img_home, :img_tienda,
                :img_detalle, :img_thumb
            )
        """, product.model_dump())
        conn.commit()
    return product
