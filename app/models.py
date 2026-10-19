"""Esquemas Pydantic de la API.

Serializan en camelCase (imgHome, originShort...) para que las
respuestas coincidan con los nombres que ya usa el frontend de React.
"""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


def _to_camel(name: str) -> str:
    head, *rest = name.split("_")
    return head + "".join(part.capitalize() for part in rest)


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=_to_camel, populate_by_name=True)


class Product(CamelModel):
    id: str
    name: str
    origin: str
    origin_short: str
    notes: str
    notes_short: str
    price: float
    roast: str
    badge_tueste: str
    process: str
    altitude: str
    variety: str
    description: str
    img_home: str
    img_tienda: str
    img_detalle: str
    img_thumb: str


class Customer(CamelModel):
    fullname: str = Field(min_length=2)
    phone: str = Field(min_length=7)
    email: str = Field(pattern=r"^[\w.+-]+@[\w-]+\.[\w.-]+$")


class Address(CamelModel):
    department: str = Field(min_length=1)
    municipality: str = Field(min_length=1)
    address: str = Field(min_length=5)
    reference: str | None = None


class OrderItemIn(CamelModel):
    id: str
    grind: str = Field(min_length=1)
    qty: int = Field(ge=1, le=99)


class OrderIn(CamelModel):
    customer: Customer
    address: Address
    payment_method: Literal["transfer", "cash"]
    notes: str | None = None
    items: list[OrderItemIn] = Field(min_length=1)


class OrderItem(CamelModel):
    id: str
    name: str
    price: float
    qty: int
    grind: str
    subtotal: float


class Order(CamelModel):
    id: str
    customer: Customer
    address: Address
    payment_method: Literal["transfer", "cash"]
    notes: str | None = None
    items: list[OrderItem]
    subtotal: float
    shipping: float
    total: float
    status: Literal["pending", "paid", "shipped", "delivered"] = "pending"
    created_at: datetime
