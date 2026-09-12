from pydantic import BaseModel
from typing import List, Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class OrderItemSchema(BaseModel):
    id: str | int
    title: str
    price: float
    quantity: int

class OrderCreateSchema(BaseModel):
    items: List[OrderItemSchema]
    total: float
    phone: str
    email: Optional[str] = None
    deliveryType: str
    address: Optional[str] = None
    paymentMethod: str
    requiresPackaging: bool = False