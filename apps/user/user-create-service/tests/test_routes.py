# tests/test_routes.py

import pytest
from app import create_app

app = create_app()

def test_health():
    """Test for the /health endpoint."""
    test_client = app.test_client()
    response = test_client.get('/health')
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}
