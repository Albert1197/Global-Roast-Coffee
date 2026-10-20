"""Endpoints del catálogo de cafés: /api/products."""
from fastapi import APIRouter, HTTPException, Query, status

from app.database import create_product, get_all_products, get_product_by_id
from app.models import Product

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=list[Product])
def list_products(
    roast: str | None = Query(default=None, description="Filtrar por tueste: Claro, Medio u Oscuro"),
    country: str | None = Query(default=None, description="Filtrar por país de origen"),
) -> list[Product]:
    return get_all_products(roast=roast, country=country)


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str) -> Product:
    product = get_product_by_id(product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No existe el café '{product_id}'",
        )
    return product


@router.post("", response_model=Product, status_code=status.HTTP_201_CREATED)
def add_product(payload: Product) -> Product:
    existing = get_product_by_id(payload.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ya existe un café con id '{payload.id}'",
        )
    return create_product(payload)
