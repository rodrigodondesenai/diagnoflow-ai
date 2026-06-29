from fastapi.testclient import TestClient

from app.main import app


def test_root():
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        assert "Nenhum LLM" in response.json()["message"]


def test_dashboard():
    with TestClient(app) as client:
        response = client.get("/dashboard")
        assert response.status_code == 200
        payload = response.json()
        assert "summary" in payload
        assert "latest_incidents" in payload
