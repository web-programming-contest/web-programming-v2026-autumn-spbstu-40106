import uuid
import bcrypt
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database import get_db
from src import models, schemas

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/login")
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    
    if not user:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(payload.password.encode('utf-8'), salt).decode('utf-8')
        
        user = models.User(
            id=str(uuid.uuid4()),
            email=payload.email,
            password=hashed_password,
            username=payload.email.split("@")[0]
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        is_valid = bcrypt.checkpw(
            payload.password.encode('utf-8'), 
            user.password.encode('utf-8')
        )
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Неверный пароль"
            )

    return {
        "accessToken": f"fake-jwt-token-{user.id}",
        "refreshToken": f"fake-refresh-{user.id}",
        "username": user.username
    }