from locust import HttpUser, between, task


class UsuarioTuEvento(HttpUser):
    wait_time = between(1, 2)

    @task(3)
    def listar_categorias(self):
        self.client.get("/api/v1/categorias/", name="/api/v1/categorias/")

    @task(2)
    def listar_empresas(self):
        self.client.get("/api/v1/empresas/", name="/api/v1/empresas/")

    @task(1)
    def listar_eventos(self):
        self.client.get("/api/v1/eventos/", name="/api/v1/eventos/")