from sqlalchemy import Column, String, Float, Integer, Boolean, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String, nullable=False)
    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    rating = Column(Float, default=0.0)
    image = Column(String)
    type = Column(String)
    color = Column(String)
    description = Column(String, nullable=True)
    specs = Column(JSON, nullable=True)
    labels = Column(JSON, nullable=True)
    oldPrice = Column(Float, nullable=True)
    discount = Column(String, nullable=True)

class Order(Base):
    __tablename__ = "orders"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    total_price = Column(Float, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    delivery_type = Column(String, nullable=False)
    address = Column(String, nullable=True)
    payment_method = Column(String, nullable=False)
    requires_packaging = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(String, primary_key=True)
    order_id = Column(String, ForeignKey("orders.id"))
    product_id = Column(String)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)