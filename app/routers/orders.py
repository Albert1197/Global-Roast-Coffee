"""Endpoints de pedidos: /api/orders.

Los pedidos se guardan en memoria (dict) para mantener el proyecto simple;
al reiniciar el servidor se pierden.
"""
import itertools
import threading
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from app.catalog import PRODUCTS_BY_ID
from app.models import Order, OrderIn, OrderItem

router = APIRouter(prefix="/api/orders", tags=["orders"])

SHIPPING_COST = 3.5

_orders: dict[str, Order] = {}
_order_numbers = itertools.count(1)
_lock = threading.Lock()


@router.post("", response_model=Order, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderIn) -> Order:
    items: list[OrderItem] = []
    for item in payload.items:
        product = PRODUCTS_BY_ID.get(item.id)
        if product is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No existe el café '{item.id}'",
            )
        items.append(
            OrderItem(
                id=product.id,
                name=product.name,
                price=product.price,
                qty=item.qty,
                grind=item.grind,
                subtotal=round(product.price * item.qty, 2),
            )
        )

    # El precio siempre lo calcula el servidor: no se confía en el cliente.
    subtotal = round(sum(i.subtotal for i in items), 2)
    total = round(subtotal + SHIPPING_COST, 2)

    with _lock:
        order_id = f"GR-{next(_order_numbers):05d}"
        order = Order(
            id=order_id,
            customer=payload.customer,
            address=payload.address,
            payment_method=payload.payment_method,
            notes=payload.notes,
            items=items,
            subtotal=subtotal,
            shipping=SHIPPING_COST,
            total=total,
            created_at=datetime.now(timezone.utc),
        )
        _orders[order_id] = order

    return order


@router.get("/{order_id}", response_model=Order)
def get_order(order_id: str) -> Order:
    order = _orders.get(order_id.strip().upper())
    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No existe el pedido '{order_id}'",
        )
    return order
