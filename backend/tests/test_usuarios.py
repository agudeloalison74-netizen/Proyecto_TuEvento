
from tests.test_autenticacion import datos_usuario
from tests.conftest import admin_headers


# CP-USU-01: Buscar usuario existente
def test_buscar_usuario_existente(client):

    usuario = datos_usuario()

    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    assert registro.status_code == 201

    id_usuario = registro.json()["id_usuario"]

    respuesta = client.get(
        f"/api/v1/usuarios/{id_usuario}"
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["correo_usuario"] == usuario["correo_usuario"]


# CP-USU-02: Buscar usuario inexistente
def test_buscar_usuario_inexistente(client):

    respuesta = client.get("/api/v1/usuarios/9999")

    assert respuesta.status_code == 404


# CP-USU-03: Crear usuario exitosamente
def test_crear_usuario_exitoso(client):

    usuario = datos_usuario()

    respuesta = client.post(
        "/api/v1/usuarios/",
        json=usuario
    )

    assert respuesta.status_code == 201
    assert respuesta.json()["correo_usuario"] == usuario["correo_usuario"]


# CP-USU-04: Crear usuario con correo duplicado
def test_crear_usuario_correo_duplicado(client):

    usuario = datos_usuario()

    primera_respuesta = client.post(
        "/api/v1/usuarios/",
        json=usuario
    )

    segunda_respuesta = client.post(
        "/api/v1/usuarios/",
        json=usuario
    )

    assert primera_respuesta.status_code == 201
    assert segunda_respuesta.status_code == 400


# CP-USU-05: Eliminar usuario existente
def test_eliminar_usuario_existente(client):

    usuario = datos_usuario()

    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    id_usuario = registro.json()["id_usuario"]

    respuesta = client.delete(
        f"/api/v1/usuarios/{id_usuario}",
        headers=admin_headers(client)
    )

    assert respuesta.status_code == 204

    busqueda = client.get(
        f"/api/v1/usuarios/{id_usuario}"
    )

    assert busqueda.status_code == 404


# CP-USU-06: Eliminar usuario inexistente
def test_eliminar_usuario_inexistente(client):

    respuesta = client.delete(
        "/api/v1/usuarios/9999",
        headers=admin_headers(client)
    )

    assert respuesta.status_code == 404


def test_listar_usuarios_requiere_rol_administrador(client):
    usuario = datos_usuario()
    client.post("/api/v1/usuarios/auth/registro", json=usuario)
    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": usuario["contrasena_usuario"]
        }
    )
    headers = {"Authorization": f"Bearer {login.json()['access_token']}"}

    assert client.get("/api/v1/usuarios/").status_code == 401
    assert client.get("/api/v1/usuarios/", headers=headers).status_code == 403
    assert client.get(
        "/api/v1/usuarios/",
        headers=admin_headers(client)
    ).status_code == 200


def test_administrador_puede_actualizar_usuario(client):
    usuario = datos_usuario()
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    respuesta = client.put(
        f"/api/v1/usuarios/{registro.json()['id_usuario']}",
        headers=admin_headers(client),
        json={
            "nombre_usuario": "Camila",
            "apellido_usuario": "Guerrero",
            "telefono_usuario": "3007654321"
        }
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["nombre_usuario"] == "Camila"
    assert respuesta.json()["apellido_usuario"] == "Guerrero"


def test_usuario_no_administrador_no_puede_actualizar_otro_usuario(client):
    usuario = datos_usuario()
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )
    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": usuario["contrasena_usuario"]
        }
    )

    respuesta = client.put(
        f"/api/v1/usuarios/{registro.json()['id_usuario']}",
        headers={"Authorization": f"Bearer {login.json()['access_token']}"},
        json={
            "nombre_usuario": "Camila",
            "apellido_usuario": "Guerrero",
            "telefono_usuario": "3007654321"
        }
    )

    assert respuesta.status_code == 403


def test_actualizar_mi_perfil_requiere_sesion_y_guarda_datos(client):
    usuario = datos_usuario()
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
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    perfil = client.get(
        "/api/v1/usuarios/me",
        headers=headers
    )
    assert perfil.status_code == 200
    assert perfil.json()["correo_usuario"] == usuario["correo_usuario"]

    actualizado = client.put(
        "/api/v1/usuarios/me",
        headers=headers,
        json={
            "nombre_usuario": "Laura Maria",
            "apellido_usuario": "Gomez Ruiz",
            "telefono_usuario": "3009998877"
        }
    )
    assert actualizado.status_code == 200
    assert actualizado.json()["nombre_usuario"] == "Laura Maria"
    assert actualizado.json()["apellido_usuario"] == "Gomez Ruiz"
    assert actualizado.json()["telefono_usuario"] == "3009998877"
    assert actualizado.json()["correo_usuario"] == usuario["correo_usuario"]


def test_actualizar_mi_perfil_rechaza_nombre_vacio(client):
    usuario = datos_usuario()
    client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )
    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": usuario["contrasena_usuario"]
        }
    )

    respuesta = client.put(
        "/api/v1/usuarios/me",
        headers={
            "Authorization": f"Bearer {login.json()['access_token']}"
        },
        json={
            "nombre_usuario": " ",
            "apellido_usuario": "Gomez",
            "telefono_usuario": "3001234567"
        }
    )

    assert respuesta.status_code == 422
