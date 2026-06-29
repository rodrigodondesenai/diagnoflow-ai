from fastapi.testclient import TestClient

from app.main import app


def test_root():
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert "DiagnoFlow AI" in response.text


def test_dashboard():
    with TestClient(app) as client:
        response = client.get("/dashboard")
        assert response.status_code == 200
        payload = response.json()
        assert "summary" in payload
        assert "latest_incidents" in payload


def test_spa_fallback():
    with TestClient(app) as client:
        response = client.get("/historico")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert "DiagnoFlow AI" in response.text
