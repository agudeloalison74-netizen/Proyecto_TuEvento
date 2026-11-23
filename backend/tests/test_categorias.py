
# CP-CAT-01: Listar categorías
def test_listar_categorias(client):
    respuesta = client.get("/api/v1/categorias/")

    assert respuesta.status_code == 200
    assert respuesta.json() == []


# CP-CAT-02: Registrar categoría
def test_registrar_categoria(client):
    categoria = {
        "nombre_categoria": "Bodas",
        "descripcion_categoria": "Organización de bodas"
    }

    respuesta = client.post(
        "/api/v1/categorias/",
        json=categoria
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["nombre_categoria"] == "Bodas"


# CP-CAT-03: Buscar categoría existente
def test_buscar_categoria_existente(client):
    categoria = {
        "nombre_categoria": "Cumpleaños",
        "descripcion_categoria": "Eventos de cumpleaños"
    }

    registro = client.post(
        "/api/v1/categorias/",
        json=categoria
    )

    id_categoria = registro.json()["id_categoria"]

    respuesta = client.get(
        f"/api/v1/categorias/{id_categoria}"
    )

    assert respuesta.status_code == 200
    assert respuesta.json()["nombre_categoria"] == "Cumpleaños"


# CP-CAT-04: Eliminar categoría existente
def test_eliminar_categoria_existente(client):
    categoria = {
        "nombre_categoria": "Graduaciones",
        "descripcion_categoria": "Eventos de graduación"
    }

    registro = client.post(
        "/api/v1/categorias/",
        json=categoria
    )

    id_categoria = registro.json()["id_categoria"]

    respuesta = client.delete(
        f"/api/v1/categorias/{id_categoria}"
    )

    assert respuesta.status_code == 204

    busqueda = client.get(
        f"/api/v1/categorias/{id_categoria}"
    )

    assert busqueda.status_code == 404
