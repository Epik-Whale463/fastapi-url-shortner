from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_shorten_url():
    response = client.post("/shorten_url", json={"original_url": "https://www.youtube.com"})
    assert response.status_code == 200
    data = response.json()
    assert "short_code" in data
    
def test_invalid_url():
    response = client.post("/shorten_url", json={"original_url": "invalid-url"})
    assert response.status_code == 422  # Unprocessable Entity for invalid URL