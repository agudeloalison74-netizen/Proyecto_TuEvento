
from tests.test_empresas import preparar_datos_empresa

from app.models.categoria import Categoria


def preparar_datos_evento(client, db):
    # Crear una empresa de prueba
    empresa = preparar_datos_empresa(client, db)

    respuesta = client.post(
        "/api/v1/empresas/",
        json=empresa
    )

    assert respuesta.status_code == 201

    # Crear categoría de prueba
    categoria = Categoria(
        id_categoria=1,
        nombre_categoria="Cumpleaños",
        descripcion_categoria="Eventos de cumpleaños"
    )

    db.add(categoria)
    db.commit()

    return {
        "nombre_evento": "Cumpleaños de prueba",
        "descripcion_evento": "Celebración de prueba",
        "id_empresa": empresa["id_empresa"],
        "id_categoria": 1
    }


# CP-EVE-01: Listar eventos
def test_listar_eventos(client):
    respuesta = client.get("/api/v1/eventos/")

    assert respuesta.status_code == 200
    assert respuesta.json() == []


# CP-EVE-02: Registrar evento exitosamente
def test_registrar_evento_exitoso(client, db):
    evento = preparar_datos_evento(client, db)

    respuesta = client.post(
        "/api/v1/eventos/",
        json=evento
    )

    assert respuesta.status_code == 201
    assert respuesta.json()["nombre_evento"] == "Cumpleaños de prueba"


# CP-EVE-03: Buscar evento existente
def test_buscar_evento_existente(client, db):
    evento = preparar_datos_evento(client, db)

    registro = client.post(
        "/api/v1/eventos/",
        json=evento
    )

    id_evento = registro.json()["id_evento"]

    respuesta = client.get(
        f"/api/v1/eventos/{id_evento}"
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["id_evento"] == id_evento


# CP-EVE-04: Buscar evento inexistente
def test_buscar_evento_inexistente(client):
    respuesta = client.get("/api/v1/eventos/9999")

    assert respuesta.status_code == 404


# CP-EVE-05: Registrar evento con empresa inexistente
def test_registrar_evento_empresa_inexistente(client, db):
    evento = preparar_datos_evento(client, db)
    evento["id_empresa"] = "999999999"

    respuesta = client.post(
        "/api/v1/eventos/",
        json=evento
    )

    assert respuesta.status_code == 400
    assert respuesta.json()["detail"] == "La empresa indicada no existe"


# CP-EVE-06: Registrar evento con categoría inexistente
def test_registrar_evento_categoria_inexistente(client, db):
    evento = preparar_datos_evento(client, db)
    evento["id_categoria"] = 999

    respuesta = client.post(
        "/api/v1/eventos/",
        json=evento
    )

    assert respuesta.status_code == 400
    assert respuesta.json()["detail"] == "La categoría indicada no existe"


# CP-EVE-07: Eliminar evento existente
def test_eliminar_evento_existente(client, db):
    evento = preparar_datos_evento(client, db)

    registro = client.post(
        "/api/v1/eventos/",
        json=evento
    )

    id_evento = registro.json()["id_evento"]

    respuesta = client.delete(
        f"/api/v1/eventos/{id_evento}"
    )

    assert respuesta.status_code == 204

    busqueda = client.get(
        f"/api/v1/eventos/{id_evento}"
    )

    assert busqueda.status_code == 404


# CP-EVE-08: Eliminar evento inexistente
def test_eliminar_evento_inexistente(client):
    respuesta = client.delete("/api/v1/eventos/9999")

    assert respuesta.status_code == 404
