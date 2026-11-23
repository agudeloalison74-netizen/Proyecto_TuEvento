
from tests.test_autenticacion import datos_usuario


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
        f"/api/v1/usuarios/{id_usuario}"
    )

    assert respuesta.status_code == 204

    busqueda = client.get(
        f"/api/v1/usuarios/{id_usuario}"
    )

    assert busqueda.status_code == 404


# CP-USU-06: Eliminar usuario inexistente
def test_eliminar_usuario_inexistente(client):

    respuesta = client.delete("/api/v1/usuarios/9999")

    assert respuesta.status_code == 404
