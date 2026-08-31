from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.reserva_controller import (
    obtener_reservas,
    obtener_reserva,
    crear_reserva,
    eliminar_reserva
)

from app.schemas.reserva_schema import (
    ReservaCreate,
    ReservaResponse
)


router = APIRouter(
    prefix="/reservas",
    tags=["Reservas"]
)


@router.get(
    "/",
    response_model=list[ReservaResponse]
)
def listar_reservas(
    db: Session = Depends(get_db)
):

    return obtener_reservas(db)


@router.get(
    "/{id_reserva}",
    response_model=ReservaResponse
)
def buscar_reserva(
    id_reserva: int,
    db: Session = Depends(get_db)
):

    reserva = obtener_reserva(
        db,
        id_reserva
    )

    if not reserva:

        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )

    return reserva


@router.post(
    "/",
    response_model=ReservaResponse,
    status_code=201
)
def registrar_reserva(
    reserva: ReservaCreate,
    db: Session = Depends(get_db)
):

    nueva_reserva, error = crear_reserva(
        db,
        reserva
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_reserva

@router.delete(
    "/{id_reserva}",
    status_code=204
)
def eliminar_reserva_route(
    id_reserva: int,
    db: Session = Depends(get_db)
):
    reserva = eliminar_reserva(
        db,
        id_reserva
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )