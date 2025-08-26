from fastapi import FastAPI, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models, schemas

from crud import update_stock
from schemas import ItemUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventario API")

@app.get("/items", response_model=list[schemas.ItemOut])
def list_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).order_by(models.Item.id).all()
    return items

@app.patch("/items/{item_id}", response_model=schemas.ItemOut)
def patch_item(item_id: int = Path(..., ge=1), body: ItemUpdate = None, db: Session = Depends(get_db)):
    item = db.get(models.Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="No se encontró el Item")
    updated, _ = update_stock(db, item, body.quantity)
    return updated

@app.get("/movements", response_model=list[schemas.MovementOut])
def list_movements(db: Session = Depends(get_db)):
    return db.query(models.Movement).order_by(models.Movement.timestamp).all()


def seed_demo():
    with Session(engine) as db:
        if db.query(models.Item).count() == 0:
            items = [
                models.Item(sku="SKU-001", ean13="1234567890123", quantity=10),
                models.Item(sku="SKU-002", ean13="1111111111111", quantity=5),
            ]
            db.add_all(items)
            db.commit()

seed_demo()