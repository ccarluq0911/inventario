from sqlalchemy.orm import Session
import models

def update_stock(db: Session, item: models.Item, new_quantity: int):
    difference = new_quantity - item.quantity 
    item.quantity = new_quantity

    mv_type = "Entrada" if difference > 0 else "Salida" if difference < 0 else "Estable"

    mv = models.Movement(item_id=item.id, change=difference, type=mv_type)
    db.add(mv)
    db.commit()
    db.refresh(item)
    return item, mv