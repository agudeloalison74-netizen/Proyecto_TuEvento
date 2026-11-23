
def test_inicio_api(client):

    respuesta = client.get("/")

    assert respuesta.status_code == 200

    datos = respuesta.json()

    assert datos["status"] is True
    assert datos["mensaje"] == "API TuEvento funcionando"
    assert datos["code"] == 200
