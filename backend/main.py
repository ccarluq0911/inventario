from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models, schemas

from crud import update_stock
from schemas import ItemUpdate, UserLogin, Token
from auth import verify_password, create_access_token, get_password_hash
from dependencies import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventario API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/items", response_model=list[schemas.ItemOut])
def list_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).order_by(models.Item.id).all()
    return items

@app.patch("/items/{item_id}", response_model=schemas.ItemOut)
def patch_item(item_id: int, body: ItemUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    item = db.get(models.Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="No se encontró el Item")
    updated, _ = update_stock(db, item, body.quantity)
    return updated

@app.get("/movements", response_model=list[schemas.MovementOut])
def list_movements(db: Session = Depends(get_db)):
    movements = db.query(models.Movement).join(models.Item).order_by(models.Movement.timestamp.desc()).all()
    return [
        schemas.MovementOut(
            id=m.id,
            type=m.type,
            change=m.change,
            timestamp=m.timestamp,
            sku=m.item.sku,
            ean13=m.item.ean13,
        )
        for m in movements
    ]

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


def seed_demo():
    with Session(engine) as db:
        if db.query(models.Item).count() == 0:
            items = [
                models.Item(sku="SKU-001", ean13="1234567890123", quantity=10),
                models.Item(sku="SKU-002", ean13="1111111111111", quantity=5),
            ]
            db.add_all(items)
            db.commit()
        if db.query(models.User).count() == 0:
            db.add(models.User(username="admin", hashed_password=get_password_hash("admin123")))
            db.commit()

seed_demo()