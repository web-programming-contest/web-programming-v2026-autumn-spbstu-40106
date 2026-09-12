from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database import get_db
from src import models

router = APIRouter(prefix="/api", tags=["Goods"])

@router.get("/goods")
def get_goods(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@router.get("/promo")
def get_promo(db: Session = Depends(get_db)):
    promo = db.query(models.Product).filter(models.Product.oldPrice != None).first()
    
    if not promo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Промо-товар не найден"
        )
    return promo