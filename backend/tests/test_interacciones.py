from datetime import datetime, timedelta
from decimal import Decimal

from app.models.ciudad import Ciudad
from app.models.departamento import Departamento
from app.models.empresa import Empresa
from app.models.reserva import Reserva
from app.models.servicio import Servicio


def crear_usuario_y_headers(client, correo, rol):
    datos = {
        "nombre_usuario": "Usuario",
        "apellido_usuario": "Prueba",
        "correo_usuario": correo,
        "telefono_usuario": "3001234567",
        "contrasena_usuario": "Prueba#2026",
        "rol": rol
    }
    registro = client.post(
        "/api/v1/usuarios/auth/registro",
        json=datos
    )
    assert registro.status_code == 201

    login = client.post(
        "/api/v1/usuarios/auth/login",
        json={
            "correo_usuario": correo,
            "contrasena_usuario": datos["contrasena_usuario"]
        }
    )
    assert login.status_code == 200
    return (
        registro.json()["id_usuario"],
        {"Authorization": f"Bearer {login.json()['access_token']}"}
    )


def crear_empresa_con_servicio(db, id_usuario, nit="900123456", id_servicio=1):
    db.add(Departamento(
        id_departamento=1,
        nombre_departamento="Cundinamarca"
    ))
    db.commit()
    db.add(Ciudad(
        id_ciudad=1,
        nombre_ciudad="Bogota",
        id_departamento=1
    ))
    db.commit()
    db.add(Empresa(
        id_empresa=nit,
        nombre_empresa="Eventos Prueba",
        descripcion_empresa="Servicios para eventos",
        contacto_empresa="3007654321",
        direccion_empresa="Calle 10",
        id_ciudad=1,
        id_usuario=id_usuario
    ))
    db.commit()
    db.add(Servicio(
        id_servicio=id_servicio,
        nombre_servicio="Decoración",
        descripcion_servicio="Decoración para eventos",
        precio_referencia=Decimal("250000"),
        id_empresa=nit
    ))
    db.commit()


def crear_reserva(db, id_usuario, id_servicio=1, estado="PENDIENTE", fecha=None):
    reserva = Reserva(
        id_usuario=id_usuario,
        id_servicio=id_servicio,
        fecha_hora=fecha or datetime.now() + timedelta(days=4),
        estado=estado,
        precio_total=Decimal("250000"),
        tipo_evento="Cumpleaños",
        cantidad_personas=30,
        mensaje="Preferimos decoración lavanda."
    )
    db.add(reserva)
    db.commit()
    db.refresh(reserva)
    return reserva


def test_cliente_y_empresa_consultan_y_responden_solicitudes(client, db):
    id_cliente, headers_cliente = crear_usuario_y_headers(
        client,
        "cliente-interacciones@test.com",
        "cliente"
    )
    _, headers_otro_cliente = crear_usuario_y_headers(
        client,
        "cliente-ajeno-interacciones@test.com",
        "cliente"
    )
    id_empresa_usuario, headers_empresa = crear_usuario_y_headers(
        client,
        "empresa-interacciones@test.com",
        "empresa"
    )
    crear_empresa_con_servicio(db, id_empresa_usuario)
    id_otra_empresa_usuario, headers_otra_empresa = crear_usuario_y_headers(
        client,
        "empresa-ajena-interacciones@test.com",
        "empresa"
    )
    db.add(Empresa(
        id_empresa="900123457",
        nombre_empresa="Otra empresa",
        descripcion_empresa="Otra empresa de eventos",
        contacto_empresa="3000000000",
        direccion_empresa="Carrera 10",
        id_ciudad=1,
        id_usuario=id_otra_empresa_usuario
    ))
    db.commit()
    reserva = crear_reserva(db, id_cliente)

    historial = client.get(
        "/api/v1/reservas/mis-reservas",
        headers=headers_cliente
    )
    assert historial.status_code == 200
    assert historial.json()[0]["id_reserva"] == reserva.id_reserva
    assert historial.json()[0]["nombre_servicio"] == "Decoración"
    assert historial.json()[0]["tipo_evento"] == "Cumpleaños"
    historial_ajeno = client.get(
        "/api/v1/reservas/mis-reservas",
        headers=headers_otro_cliente
    )
    assert historial_ajeno.json() == []

    solicitudes = client.get(
        "/api/v1/reservas/solicitudes-empresa",
        headers=headers_empresa
    )
    assert solicitudes.status_code == 200
    assert solicitudes.json()[0]["correo_cliente"] == "cliente-interacciones@test.com"
    assert solicitudes.json()[0]["mensaje"] == "Preferimos decoración lavanda."
    solicitudes_otra_empresa = client.get(
        "/api/v1/reservas/solicitudes-empresa",
        headers=headers_otra_empresa
    )
    assert solicitudes_otra_empresa.json() == []

    ajena_no_autorizada = client.patch(
        f"/api/v1/reservas/{reserva.id_reserva}/estado",
        headers=headers_otra_empresa,
        json={"estado": "ACEPTADA"}
    )
    assert ajena_no_autorizada.status_code == 404

    actualizada = client.patch(
        f"/api/v1/reservas/{reserva.id_reserva}/estado",
        headers=headers_empresa,
        json={"estado": "ACEPTADA"}
    )
    assert actualizada.status_code == 200
    assert actualizada.json()["estado"] == "ACEPTADA"

    repetida = client.patch(
        f"/api/v1/reservas/{reserva.id_reserva}/estado",
        headers=headers_empresa,
        json={"estado": "RECHAZADA"}
    )
    assert repetida.status_code == 409


def test_cliente_puede_puntuar_servicio_realizado_y_empresa_responder(client, db):
    id_cliente, headers_cliente = crear_usuario_y_headers(
        client,
        "cliente-resena@test.com",
        "cliente"
    )
    _, headers_otro_cliente = crear_usuario_y_headers(
        client,
        "cliente-ajeno-resena@test.com",
        "cliente"
    )
    id_empresa_usuario, headers_empresa = crear_usuario_y_headers(
        client,
        "empresa-resena@test.com",
        "empresa"
    )
    crear_empresa_con_servicio(db, id_empresa_usuario)
    id_otra_empresa_usuario, headers_otra_empresa = crear_usuario_y_headers(
        client,
        "empresa-ajena-resena@test.com",
        "empresa"
    )
    db.add(Empresa(
        id_empresa="900123457",
        nombre_empresa="Otra empresa",
        descripcion_empresa="Otra empresa de eventos",
        contacto_empresa="3000000000",
        direccion_empresa="Carrera 10",
        id_ciudad=1,
        id_usuario=id_otra_empresa_usuario
    ))
    db.commit()
    reserva = crear_reserva(
        db,
        id_cliente,
        estado="ACEPTADA",
        fecha=datetime.now() - timedelta(days=1)
    )

    creada = client.post(
        "/api/v1/resenas/",
        headers=headers_cliente,
        json={
            "id_reserva": reserva.id_reserva,
            "descripcion_resena": "El servicio quedó muy bien.",
            "calificacion": 5
        }
    )
    assert creada.status_code == 201
    assert creada.json()["calificacion"] == 5

    comentarios_cliente = client.get(
        "/api/v1/resenas/mis-resenas",
        headers=headers_cliente
    )
    assert comentarios_cliente.status_code == 200
    assert comentarios_cliente.json()[0]["nombre_servicio"] == "Decoración"
    comentarios_ajenos = client.get(
        "/api/v1/resenas/mis-resenas",
        headers=headers_otro_cliente
    )
    assert comentarios_ajenos.json() == []

    comentarios_empresa = client.get(
        "/api/v1/resenas/empresa",
        headers=headers_empresa
    )
    assert comentarios_empresa.status_code == 200
    assert comentarios_empresa.json()[0]["nombre_cliente"] == "Usuario Prueba"
    comentarios_otra_empresa = client.get(
        "/api/v1/resenas/empresa",
        headers=headers_otra_empresa
    )
    assert comentarios_otra_empresa.json() == []

    respuesta_no_autorizada = client.put(
        f"/api/v1/resenas/{creada.json()['id_resena']}/respuesta",
        headers=headers_otra_empresa,
        json={"respuesta_empresa": "Comentario ajeno."}
    )
    assert respuesta_no_autorizada.status_code == 404

    respuesta = client.put(
        f"/api/v1/resenas/{creada.json()['id_resena']}/respuesta",
        headers=headers_empresa,
        json={"respuesta_empresa": "Gracias por elegirnos."}
    )
    assert respuesta.status_code == 200
    assert respuesta.json()["respuesta_empresa"] == "Gracias por elegirnos."

    comentarios_actualizados = client.get(
        "/api/v1/resenas/mis-resenas",
        headers=headers_cliente
    )
    assert comentarios_actualizados.json()[0]["respuesta_empresa"] == "Gracias por elegirnos."


def test_resena_solo_se_permite_al_cliente_dueno_despues_del_evento(client, db):
    id_cliente, headers_cliente = crear_usuario_y_headers(
        client,
        "cliente-dueno@test.com",
        "cliente"
    )
    id_otro_cliente, headers_otro = crear_usuario_y_headers(
        client,
        "cliente-ajeno@test.com",
        "cliente"
    )
    id_empresa_usuario, _ = crear_usuario_y_headers(
        client,
        "empresa-validacion@test.com",
        "empresa"
    )
    crear_empresa_con_servicio(db, id_empresa_usuario)
    reserva = crear_reserva(db, id_cliente)

    payload = {
        "id_reserva": reserva.id_reserva,
        "descripcion_resena": "Buen servicio.",
        "calificacion": 4
    }
    ajeno = client.post(
        "/api/v1/resenas/",
        headers=headers_otro,
        json=payload
    )
    assert ajeno.status_code == 403

    pendiente = client.post(
        "/api/v1/resenas/",
        headers=headers_cliente,
        json=payload
    )
    assert pendiente.status_code == 400

    puntuacion_fuera_de_rango = client.post(
        "/api/v1/resenas/",
        headers=headers_cliente,
        json={**payload, "calificacion": 6}
    )
    assert puntuacion_fuera_de_rango.status_code == 422


def test_crear_reserva_guarda_datos_y_no_permite_suplantar_cliente(client, db):
    id_cliente, headers_cliente = crear_usuario_y_headers(
        client,
        "cliente-reserva@test.com",
        "cliente"
    )
    id_empresa_usuario, headers_empresa = crear_usuario_y_headers(
        client,
        "empresa-reserva@test.com",
        "empresa"
    )
    crear_empresa_con_servicio(db, id_empresa_usuario)
    payload = {
        "id_usuario": id_cliente,
        "id_servicio": 1,
        "fecha_hora": (datetime.now() + timedelta(days=3)).isoformat(),
        "estado": "PENDIENTE",
        "precio_total": 250000,
        "tipo_evento": "Matrimonio",
        "cantidad_personas": 80,
        "mensaje": "Ceremonia al aire libre."
    }

    creada = client.post(
        "/api/v1/reservas/",
        headers=headers_cliente,
        json=payload
    )
    assert creada.status_code == 201
    assert creada.json()["tipo_evento"] == "Matrimonio"

    suplantada = client.post(
        "/api/v1/reservas/",
        headers=headers_empresa,
        json={**payload, "id_usuario": id_empresa_usuario}
    )
    assert suplantada.status_code == 403
