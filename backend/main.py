from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.categoria_routes import router as categoria_router
from app.routes.usuario_routes import router as usuario_router
from app.routes.departamento_routes import (router as departamento_router)
from app.routes.ciudad_routes import (router as ciudad_router)
from app.routes.empresa_routes import (router as empresa_router)
from app.routes.servicio_routes import (router as servicio_router)
from app.routes.evento_routes import (router as evento_router)
from app.routes.disponibilidad_routes import (router as disponibilidad_router)
from app.routes.muestra_routes import (router as muestra_router)
from app.routes.reserva_routes import (router as reserva_router)
from app.routes.resena_routes import (router as resena_router)
from app.routes.servicio_evento_routes import (router as servicio_evento_router)
from app.routes.servicio_reserva_routes import (router as servicio_reserva_router)


from app.config.database import engine


# =========================================================
# PRUEBA DE CONEXIÓN A BASE DE DATOS
# =========================================================

try:

    with engine.connect() as connection:

        connection.execute(
            text("SELECT 1")
        )

    print("Conexion exitosa a PostgreSQL")

except Exception as error:

    print(
        f"Error de conexion: {error}"
    )


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="TuEvento API",
    description="API para gestión de eventos",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
       "http://localhost:3000",
       "http://127.0.0.1:3000",
       "http://localhost:3001",
       "http://127.0.0.1:3001",
       "http://localhost:5173",
       "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(
    categoria_router,
    prefix="/api/v1"
)

app.include_router(
    usuario_router,
    prefix="/api/v1"
)

app.include_router(
    departamento_router,
    prefix="/api/v1"
)

app.include_router(
    ciudad_router,
    prefix="/api/v1"
)

app.include_router(
    empresa_router,
    prefix="/api/v1"
)

app.include_router(
    servicio_router,
    prefix="/api/v1"
)

app.include_router(
    evento_router,
    prefix="/api/v1"
)

app.include_router(
    disponibilidad_router,
    prefix="/api/v1"
)

app.include_router(
    muestra_router,
    prefix="/api/v1"
)

app.include_router(
    reserva_router,
    prefix="/api/v1"
)

app.include_router(
    resena_router,
    prefix="/api/v1"
)

app.include_router(
    servicio_evento_router,
    prefix="/api/v1"
)

app.include_router(
    servicio_reserva_router,
    prefix="/api/v1"
)

# =========================================================
# RUTA PRINCIPAL
# =========================================================

@app.get("/")
def inicio():

    return {
        "status": True,
        "mensaje": "API TuEvento funcionando",
        "data": {
            "version": "v1"
        },
        "error": None,
        "code": 200
    }

from app.models.categoria import Categoria
from app.models.ciudad import Ciudad
from app.models.departamento import Departamento
from app.models.disponibilidad import Disponibilidad
from app.models.empresa import Empresa
from app.models.evento import Evento
from app.models.muestra import Muestra
from app.models.resena import Resena
from app.models.reserva import Reserva
from app.models.servicio import Servicio
from app.models.servicio_evento import ServicioEvento
from app.models.servicio_reserva import ServicioReserva
from app.models.usuario import Usuario

print("Modelos de TuEvento cargados correctamente")