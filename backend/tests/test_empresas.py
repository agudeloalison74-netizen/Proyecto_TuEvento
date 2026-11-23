
from tests.test_autenticacion import datos_usuario

from app.models.departamento import Departamento
from app.models.ciudad import Ciudad


def preparar_datos_empresa(client, db):
    # Registrar un usuario de prueba
    usuario = datos_usuario()

    respuesta = client.post(
        "/api/v1/usuarios/auth/registro",
        json=usuario
    )

    assert respuesta.status_code == 201

    id_usuario = respuesta.json()["id_usuario"]

    # Crear departamento
    departamento = Departamento(
        id_departamento=1,
        nombre_departamento="Cundinamarca"
    )

    db.add(departamento)
    db.commit()

    # Crear ciudad
    ciudad = Ciudad(
        id_ciudad=1,
        nombre_ciudad="Bogota",
        id_departamento=1
    )

    db.add(ciudad)
    db.commit()

    return {
        "id_empresa": "900123456",
        "nombre_empresa": "Eventos Prueba",
        "descripcion_empresa": "Empresa de prueba",
        "contacto_empresa": "3001234567",
        "direccion_empresa": "Calle 10",
        "id_ciudad": 1,
        "id_usuario": id_usuario
    }


# CP-EMP-01: Listar empresas
def test_listar_empresas(client):
    respuesta = client.get("/api/v1/empresas/")

    assert respuesta.status_code == 200
    assert respuesta.json() == []


# CP-EMP-02: Registrar empresa
def test_registrar_empresa_exitoso(client, db):
    empresa = preparar_datos_empresa(client, db)

    respuesta = client.post(
        "/api/v1/empresas/",
        json=empresa
    )

    assert respuesta.status_code == 201
    assert respuesta.json()["nombre_empresa"] == "Eventos Prueba"


# CP-EMP-03: Buscar empresa existente
def test_buscar_empresa_existente(client, db):
    empresa = preparar_datos_empresa(client, db)

    client.post("/api/v1/empresas/", json=empresa)

    respuesta = client.get(
        f"/api/v1/empresas/{empresa['id_empresa']}"
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["id_empresa"] == empresa["id_empresa"]


# CP-EMP-04: Buscar empresa inexistente
def test_buscar_empresa_inexistente(client):
    respuesta = client.get("/api/v1/empresas/999999999")

    assert respuesta.status_code == 404


# CP-EMP-05: Registrar empresa con NIT duplicado
def test_registrar_empresa_nit_duplicado(client, db):
    empresa = preparar_datos_empresa(client, db)

    primera = client.post("/api/v1/empresas/", json=empresa)
    segunda = client.post("/api/v1/empresas/", json=empresa)

    assert primera.status_code == 201
    assert segunda.status_code == 400


# CP-EMP-06: Registrar empresa con ciudad inexistente
def test_registrar_empresa_ciudad_inexistente(client, db):
    empresa = preparar_datos_empresa(client, db)
    empresa["id_ciudad"] = 999

    respuesta = client.post(
        "/api/v1/empresas/",
        json=empresa
    )

    assert respuesta.status_code == 400
    assert respuesta.json()["detail"] == "La ciudad indicada no existe"


# CP-EMP-07: Registrar empresa con usuario inexistente
def test_registrar_empresa_usuario_inexistente(client, db):
    empresa = preparar_datos_empresa(client, db)
    empresa["id_usuario"] = 999

    respuesta = client.post(
        "/api/v1/empresas/",
        json=empresa
    )

    assert respuesta.status_code == 400
    assert respuesta.json()["detail"] == "El usuario indicado no existe"


# CP-EMP-08: Eliminar empresa existente
def test_eliminar_empresa_existente(client, db):
    empresa = preparar_datos_empresa(client, db)

    client.post("/api/v1/empresas/", json=empresa)

    respuesta = client.delete(
        f"/api/v1/empresas/{empresa['id_empresa']}"
    )

    assert respuesta.status_code == 204

    busqueda = client.get(
        f"/api/v1/empresas/{empresa['id_empresa']}"
    )

    assert busqueda.status_code == 404


# CP-EMP-09: Eliminar empresa inexistente
def test_eliminar_empresa_inexistente(client):
    respuesta = client.delete("/api/v1/empresas/999999999")

    assert respuesta.status_code == 404
