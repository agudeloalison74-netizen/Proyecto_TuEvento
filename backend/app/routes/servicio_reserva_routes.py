from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.servicio_reserva_controller import (
    obtener_servicios_reservas,
    crear_servicio_reserva,
    eliminar_servicio_reserva
)

from app.schemas.servicio_reserva_schema import (
    ServicioReservaCreate,
    ServicioReservaResponse
)


router = APIRouter(
    prefix="/servicio-reserva",
    tags=["Servicio - Reserva"]
)


@router.get(
    "/",
    response_model=list[ServicioReservaResponse]
)
def listar_servicios_reservas(
    db: Session = Depends(get_db)
):

    return obtener_servicios_reservas(db)


@router.post(
    "/",
    response_model=ServicioReservaResponse,
    status_code=201
)
def registrar_servicio_reserva(
    relacion: ServicioReservaCreate,
    db: Session = Depends(get_db)
):

    nueva_relacion, error = crear_servicio_reserva(
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
    "/{id_reserva}/{id_evento}/{id_servicio}",
    status_code=204
)
def eliminar_servicio_reserva_route(
    id_reserva: int,
    id_evento: int,
    id_servicio: int,
    db: Session = Depends(get_db)
):
    relacion = eliminar_servicio_reserva(
        db,
        id_reserva,
        id_evento,
        id_servicio
    )

    if not relacion:
        raise HTTPException(
            status_code=404,
            detail="Relación servicio-reserva no encontrada"
        )