from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.servicio_evento_controller import (
    obtener_servicios_eventos,
    crear_servicio_evento,
    eliminar_servicio_evento
)

from app.schemas.servicio_evento_schema import (
    ServicioEventoCreate,
    ServicioEventoResponse
)


router = APIRouter(
    prefix="/servicio-evento",
    tags=["Servicio - Evento"]
)


@router.get(
    "/",
    response_model=list[ServicioEventoResponse]
)
def listar_servicios_eventos(
    db: Session = Depends(get_db)
):

    return obtener_servicios_eventos(db)


@router.post(
    "/",
    response_model=ServicioEventoResponse,
    status_code=201
)
def registrar_servicio_evento(
    relacion: ServicioEventoCreate,
    db: Session = Depends(get_db)
):

    nueva_relacion, error = crear_servicio_evento(
        db,
        relacion
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_relacion

@router.delete(
    "/{id_servicio}/{id_evento}",
    status_code=204
)
def eliminar_servicio_evento_route(
    id_servicio: int,
    id_evento: int,
    db: Session = Depends(get_db)
):
    relacion = eliminar_servicio_evento(
        db,
        id_servicio,
        id_evento
    )

    if not relacion:
        raise HTTPException(
            status_code=404,
            detail="Relación servicio-evento no encontrada"
        )