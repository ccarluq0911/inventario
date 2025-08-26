import pytest

@pytest.mark.asyncio
async def test_login_fail(client):
    response = await client.post("/login", json={
        "username": "admin",
        "password": "wrong"
    })
    assert response.status_code == 401
    
@pytest.mark.asyncio
async def test_login_success(client):
    response = await client.post("/login", json={
        "username": "admin",
        "password": "admin123"
    })
    assert response.status_code == 200