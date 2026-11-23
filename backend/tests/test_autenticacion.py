
def datos_usuario():
    return {
        "nombre_usuario": "Laura",
        "apellido_usuario": "Gomez",
        "correo_usuario": "laura.qa@test.com",
        "telefono_usuario": "3001234567",
        "contrasena_usuario": "Evento#2026",
        "rol": "Cliente"
    }


# CP-AUT-01: Registro exitoso
def test_registro_exitoso(client):

    respuesta = client.post(
        "/api/v1/usuarios/auth/registro",
        json=datos_usuario()
    )

    assert respuesta.status_code == 201

    datos = respuesta.json()

    assert datos["correo_usuario"] == "laura.qa@test.com"
    assert datos["nombre_usuario"] == "Laura"


# CP-AUT-02: Registro con correo duplicado
def test_registro_correo_duplicado(client):

    usuario = datos_usuario()

    primera_respuesta = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    segunda_respuesta = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    assert primera_respuesta.status_code == 201
    assert segunda_respuesta.status_code == 400


# CP-AUT-04: Inicio de sesión exitoso
def test_login_exitoso(client):

    usuario = datos_usuario()

    client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    respuesta = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": usuario["contrasena_usuario"]
        }
    )

    assert respuesta.status_code == 200

    datos = respuesta.json()

    assert "access_token" in datos
    assert datos["token_type"] == "bearer"


# CP-AUT-05: Inicio de sesión con credenciales incorrectas
def test_login_credenciales_incorrectas(client):

    respuesta = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": "inexistente@test.com",
            "contrasena_usuario": "ClaveIncorrecta123"
        }
    )

    assert respuesta.status_code == 401
