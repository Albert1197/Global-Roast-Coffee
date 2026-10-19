"""Endpoints del catálogo de cafés: /api/products."""
from fastapi import APIRouter, HTTPException, Query, status

from app.catalog import PRODUCTS, PRODUCTS_BY_ID
from app.models import Product

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=list[Product])
def list_products(
    roast: str | None = Query(default=None, description="Filtrar por tueste: Claro, Medio u Oscuro"),
    country: str | None = Query(default=None, description="Filtrar por país de origen"),
) -> list[Product]:
    result = PRODUCTS
    if roast:
        result = [p for p in result if p.roast.lower() == roast.lower()]
    if country:
        result = [p for p in result if p.origin.lower().startswith(country.lower())]
    return result


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str) -> Product:
    product = PRODUCTS_BY_ID.get(product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No existe el café '{product_id}'",
        )
    return product
