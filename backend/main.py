from fastapi import FastAPI
from sqlalchemy import create_engine, text

app = FastAPI()

@app.get("/")
def root():
    engine = create_engine("postgresql+psycopg://postgres:postgres@localhost:5432/inventario")
    with engine.connect() as connection:
        print(connection.execute(text("SELECT 1")).fetchall())
    return {"message" : "Backend funciona"}