from main import app
from app.config.database import Base, get_db


import os

# Variables temporales para las pruebas
os.environ["DATABASE_URL"] = "sqlite://"
os.environ["SECRET_KEY"] = "clave_temporal_para_pruebas"

import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from fastapi.testclient import TestClient

from main import app
from app.config.database import Base, get_db


# Base de datos temporal SQLite
engine_test = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine_test
)


def admin_headers(client):
    usuario = {
        "nombre_usuario": "Admin",
        "apellido_usuario": "Prueba",
        "correo_usuario": "admin@test.com",
        "telefono_usuario": "3001234567",
        "contrasena_usuario": "Admin#2026",
        "rol": "Administrador"
    }
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )
    assert registro.status_code == 201

    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": usuario["contrasena_usuario"]
        }
    )
    assert login.status_code == 200
    return {"Authorization": f"Bearer {login.json()['access_token']}"}


@pytest.fixture
def db():

    Base.metadata.drop_all(bind=engine_test)
    Base.metadata.create_all(bind=engine_test)

    session = TestingSessionLocal()

    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine_test)


@pytest.fixture
def client(db):

    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
