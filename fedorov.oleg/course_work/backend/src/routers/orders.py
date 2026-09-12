import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database import get_db
from src import models, schemas

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.get("")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(models.Order).all()
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "createdAt": order.created_at.isoformat(),
            "totalPrice": order.total_price,
            "items": [{"id": i.product_id, "title": i.title, "price": i.price, "quantity": i.quantity} for i in order.items]
        })
    return result

@router.get("/{order_id}")
def get_order_by_id(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Заказ не найден"
        )
    return {
        "id": order.id,
        "createdAt": order.created_at.isoformat(),
        "totalPrice": order.total_price,
        "phone": order.phone,
        "email": order.email,
        "deliveryType": order.delivery_type,
        "address": order.address,
        "paymentMethod": order.payment_method,
        "requiresPackaging": order.requires_packaging,
        "items": [{"id": i.product_id, "title": i.title, "price": i.price, "quantity": i.quantity} for i in order.items]
    }

@router.post("", status_code=status.HTTP_201_CREATED)
def create_order(payload: schemas.OrderCreateSchema, db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        raise HTTPException(status_code=400, detail="Пользователи не найдены")

    order_id = str(uuid.uuid4())[:8]
    
    new_order = models.Order(
        id=order_id,
        user_id=user.id,
        total_price=payload.total,
        phone=payload.phone,
        email=payload.email,
        delivery_type=payload.deliveryType,
        address=payload.address,
        payment_method=payload.paymentMethod,
        requires_packaging=payload.requiresPackaging
    )
    db.add(new_order)
    
    for item in payload.items:
        order_item = models.OrderItem(
            id=str(uuid.uuid4()),
            order_id=order_id,
            product_id=str(item.id),
            title=item.title,
            price=item.price,
            quantity=item.quantity
        )
        db.add(order_item)

    db.commit()
    return {"id": order_id, "message": "Заказ успешно создан"}