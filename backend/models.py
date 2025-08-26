from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sku: Mapped[str] = mapped_column(String(64), unique=True, index=False)
    ean13: Mapped[str] = mapped_column(String(13), unique=True, index=True)
    quantity: Mapped[int] = mapped_column(Integer, default=0)
