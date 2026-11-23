import re


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


def test_recuperacion_envia_codigo_y_contrasena_temporal(
    client,
    monkeypatch
):
    usuario = datos_usuario()
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )
    assert registro.status_code == 201

    correos = []
    monkeypatch.setattr(
        "app.controllers.usuario_controller.enviar_correo",
        lambda destinatario, asunto, cuerpo: correos.append(
            (destinatario, asunto, cuerpo)
        )
    )

    solicitud = client.post(
        "/api/v1/usuarios/auth/recuperar-contrasena",
        json={"correo_usuario": usuario["correo_usuario"]}
    )
    assert solicitud.status_code == 200
    assert correos[0][0] == usuario["correo_usuario"]

    codigo = re.search(r"\b\d{6}\b", correos[0][2]).group()
    codigo_incorrecto = (
        ("0" if codigo[0] != "0" else "1") + codigo[1:]
    )

    verificacion_incorrecta = client.post(
        "/api/v1/usuarios/auth/verificar-codigo",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "codigo": codigo_incorrecto
        }
    )
    assert verificacion_incorrecta.status_code == 400

    verificacion = client.post(
        "/api/v1/usuarios/auth/verificar-codigo",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "codigo": codigo
        }
    )
    assert verificacion.status_code == 200
    assert len(correos) == 2

    contrasena_temporal = re.search(
        r"Tu nueva contraseña temporal es: (.+)",
        correos[1][2]
    ).group(1)
    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": contrasena_temporal
        }
    )
    assert login.status_code == 200

    cambio = client.put(
        "/api/v1/usuarios/me/contrasena",
        headers={
            "Authorization": f"Bearer {login.json()['access_token']}"
        },
        json={
            "contrasena_actual": contrasena_temporal,
            "contrasena_nueva": "NuevaClave#2026"
        }
    )
    assert cambio.status_code == 200

    login_con_temporal = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": contrasena_temporal
        }
    )
    assert login_con_temporal.status_code == 401

    login_con_nueva = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "contrasena_usuario": "NuevaClave#2026"
        }
    )
    assert login_con_nueva.status_code == 200

    codigo_reutilizado = client.post(
        "/api/v1/usuarios/auth/verificar-codigo",
        json={
            "correo_usuario": usuario["correo_usuario"],
            "codigo": codigo
        }
    )
    assert codigo_reutilizado.status_code == 400


def test_recuperacion_reporta_correo_sin_configurar(
    client,
    monkeypatch
):
    usuario = datos_usuario()
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )
    assert registro.status_code == 201

    def correo_sin_configurar(*_args):
        raise RuntimeError("Configuración SMTP faltante")

    monkeypatch.setattr(
        "app.controllers.usuario_controller.enviar_correo",
        correo_sin_configurar
    )

    respuesta = client.post(
        "/api/v1/usuarios/auth/recuperar-contrasena",
        json={"correo_usuario": usuario["correo_usuario"]}
    )

    assert respuesta.status_code == 503
    assert "correo de recuperación no está configurado" in (
        respuesta.json()["detail"]
    )
