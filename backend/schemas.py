from pydantic import BaseModel, Field
from datetime import datetime

class ItemBase(BaseModel):
    sku: str
    ean13: str = Field(min_length=13, max_length=13)

class ItemOut(ItemBase):
    id: int
    quantity: int

    class Config:
        from_attributes = True
        
class MovementOut(BaseModel):
    id: int
    change: int
    type: str
    timestamp: datetime
    sku: str
    ean13: str

    class Config:
        from_attributes = True

class ItemUpdate(BaseModel):
    quantity: int
    
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
