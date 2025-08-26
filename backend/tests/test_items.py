import pytest
from backend.auth import create_access_token

@pytest.mark.asyncio
async def test_list_items(client):
    response = await client.get("/items")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        assert "sku" in data[0]
        assert "ean13" in data[0]
        assert "quantity" in data[0]
        
@pytest.mark.asyncio
async def test_list_movements(client):
    response = await client.get("/movements")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        assert "type" in data[0]
        assert "change" in data[0]
        assert "timestamp" in data[0]
        assert "sku" in data[0]
        assert "ean13" in data[0]
        
@pytest.mark.asyncio
async def test_patch_item(client):
    # 1. Obtener primer item
    response = await client.get("/items")
    assert response.status_code == 200
    data = response.json()
    if not data:
        pytest.skip("No hay items en la DB")
    item = data[0]

    # 2. Cambiar cantidad
    token = create_access_token(data={"sub": "admin"})
    
    new_qty = item["quantity"] + 1
    response = await client.patch(f"/items/{item['id']}", json={"quantity": new_qty}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    updated = response.json()
    assert updated["quantity"] == new_qty

    # 3. Restaurar cantidad original
    await client.patch(f"/items/{item['id']}", json={"quantity": item["quantity"]})