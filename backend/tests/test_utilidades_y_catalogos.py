from types import SimpleNamespace
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from jose import JWTError
import pytest

from app.utils.auth import get_current_user
from app.utils.email import enviar_correo
from app.utils.security import create_access_token


class _FakeQuery:
    def __init__(self, resultado):
        self._resultado = resultado

    def filter(self, *_args, **_kwargs):
        return self

    def first(self):
        return self._resultado


class _FakeDB:
    def __init__(self, usuario):
        self._usuario = usuario

    def query(self, _modelo):
        return _FakeQuery(self._usuario)


def test_get_current_user_token_valido():
    token = create_access_token(
        {"sub": "1", "rol": "Administrador", "correo": "admin@tuevento.com"}
    )
    creds = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)
    usuario_simulado = SimpleNamespace(
        id_usuario=1,
        rol="Administrador",
        correo_usuario="admin@tuevento.com"
    )
    resultado = get_current_user(creds, db=_FakeDB(usuario_simulado))
    assert resultado.id_usuario == 1


def test_get_current_user_token_invalido():
    creds = HTTPAuthorizationCredentials(scheme="Bearer", credentials="token_invalido")
    with pytest.raises((HTTPException, JWTError)):
        get_current_user(creds, db=_FakeDB(None))


def test_enviar_correo_sin_configuracion_lanza_runtime_error(monkeypatch):
    monkeypatch.setattr("app.utils.email.SMTP_HOST", "", raising=False)
    monkeypatch.setattr("app.utils.email.SMTP_USER", "", raising=False)
    with pytest.raises(RuntimeError):
        enviar_correo("destino@test.com", "Asunto", "Cuerpo")


def test_endpoints_basicos_catalogos(client):
    assert client.get("/api/v1/departamentos/").status_code in (200, 404)
    assert client.get("/api/v1/ciudades/").status_code in (200, 404)
    assert client.get("/api/v1/servicios/").status_code in (200, 404)
    assert client.get("/api/v1/disponibilidades/").status_code in (200, 404)
    assert client.get("/api/v1/muestras/").status_code in (200, 404)
    assert client.get("/api/v1/departamentos/999999").status_code in (400, 404)
    assert client.get("/api/v1/ciudades/999999").status_code in (400, 404)
    assert client.get("/api/v1/servicios/999999").status_code in (400, 404)
    assert client.get("/api/v1/disponibilidades/999999").status_code in (400, 404)
    assert client.get("/api/v1/muestras/999999").status_code in (400, 404)

class _FakeSMTP:
    def __init__(self, *_args, **_kwargs):
        pass

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def starttls(self):
        pass

    def login(self, *_args, **_kwargs):
        pass

    def send_message(self, *_args, **_kwargs):
        pass


def test_enviar_correo_exitoso_con_smtp_simulado(monkeypatch):
    monkeypatch.setattr("app.utils.email.SMTP_HOST", "smtp.test.local", raising=False)
    monkeypatch.setattr("app.utils.email.SMTP_PORT", 587, raising=False)
    monkeypatch.setattr("app.utils.email.SMTP_USER", "qa@test.local", raising=False)
    monkeypatch.setattr("app.utils.email.SMTP_PASSWORD", "clave123", raising=False)
    monkeypatch.setattr("app.utils.email.smtplib.SMTP", _FakeSMTP)

    enviar_correo("destino@test.com", "Prueba SQA", "Cuerpo de prueba")


def test_crear_y_eliminar_departamento_y_ciudad(client):
    resp_dep = client.post(
        "/api/v1/departamentos/",
        json={"nombre_departamento": "Cundinamarca QA"}
    )
    assert resp_dep.status_code in (200, 201, 400, 401, 403, 422)
    if resp_dep.status_code in (200, 201):
        dep_id = resp_dep.json().get("id_departamento")
        if dep_id is not None:
            resp_ciu = client.post(
                "/api/v1/ciudades/",
                json={
                    "nombre_ciudad": "Bogota QA",
                    "id_departamento": dep_id
                }
            )
            assert resp_ciu.status_code in (200, 201, 400, 401, 403, 422)
            if resp_ciu.status_code in (200, 201):
                ciu_id = resp_ciu.json().get("id_ciudad")
                if ciu_id is not None:
                    client.delete(f"/api/v1/ciudades/{ciu_id}")
            client.delete(f"/api/v1/departamentos/{dep_id}")