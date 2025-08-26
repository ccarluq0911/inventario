from pydantic import BaseModel, Field

class ItemBase(BaseModel):
    sku: str
    ean13: str = Field(min_length=13, max_length=13)

class ItemOut(ItemBase):
    id: int
    quantity: int

    class Config:
        from_attributes = True
