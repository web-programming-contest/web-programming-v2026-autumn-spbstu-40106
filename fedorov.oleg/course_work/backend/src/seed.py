import uuid
import bcrypt
from src.database import SessionLocal, Base, engine
from src import models

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    existing_products = db.query(models.Product).count()
    if existing_products > 0:
        print("База данных уже заполнена товарами.")
        db.close()
        return

    print("Заполнение базы данных начальными товарами...")

    initial_products = [
        {
            "id": str(uuid.uuid4()),
            "title": "Смартфон Apple iPhone 15 Pro 256GB",
            "price": 115990.0,
            "oldPrice": 129990.0,
            "discount": "-11%",
            "rating": 4.9,
            "image": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
            "type": "Смартфоны",
            "color": "Синий",
            "description": "Флагманский смартфон с титановым корпусом и мощным процессором A17 Pro.",
            "specs": {"Экран": "6.1 OLED", "Память": "256 ГБ"},
            "labels": ["Хит", "Скидка"]
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Ноутбук Apple MacBook Pro 16 M3 Max",
            "price": 289990.0,
            "oldPrice": None,
            "discount": None,
            "rating": 5.0,
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
            "type": "Ноутбуки",
            "color": "Серый",
            "description": "Профессиональный инструмент для разработчиков и дизайнеров.",
            "specs": {"Процессор": "M3 Max", "SSD": "1 ТБ"},
            "labels": ["Новинка"]
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Беспроводные наушники Sony WH-1000XM5",
            "price": 34990.0,
            "oldPrice": 39990.0,
            "discount": "-12%",
            "rating": 4.8,
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            "type": "Наушники",
            "color": "Черный",
            "description": "Лучшая система активного шумоподавления для музыки и работы.",
            "specs": {"Автономность": "до 30 ч"},
            "labels": ["Хит"]
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Смарт-часы Apple Watch Series 9",
            "price": 39990.0,
            "oldPrice": 45990.0,
            "discount": "-13%",
            "rating": 4.7,
            "image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80",
            "type": "Умные часы",
            "color": "Красный",
            "description": "Яркий дисплей и продвинутые функции мониторинга здоровья.",
            "specs": {"Корпус": "41 мм"},
            "labels": ["Хит"]
        }
    ]

    for p_data in initial_products:
        product = models.Product(**p_data)
        db.add(product)

    existing_user = db.query(models.User).first()
    if not existing_user:
        hashed_password = bcrypt.hashpw("1111".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        test_user = models.User(
            id=str(uuid.uuid4()),
            email="test@store.ru",
            password=hashed_password,
            username="dizey"
        )
        db.add(test_user)

    db.commit()
    db.close()
    print("База данных успешно заполнена тестовыми данными!")

if __name__ == "__main__":
    seed_database()