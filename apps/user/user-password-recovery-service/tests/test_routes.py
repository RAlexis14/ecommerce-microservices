# tests/test_routes.py

import sys
import os
import pytest

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app

app = create_app()

def test_health():
    """Test for the /health endpoint."""
    test_client = app.test_client()
    response = test_client.get('/health')
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}
