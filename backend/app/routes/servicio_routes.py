from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.servicio_controller import (
    obtener_servicios,
    obtener_servicio,
    crear_servicio,
    eliminar_servicio
)

from app.schemas.servicio_schema import (
    ServicioCreate,
    ServicioResponse
)


router = APIRouter(
    prefix="/servicios",
    tags=["Servicios"]
)


@router.get(
    "/",
    response_model=list[ServicioResponse]
)
def listar_servicios(
    db: Session = Depends(get_db)
):

    return obtener_servicios(db)


@router.get(
    "/{id_servicio}",
    response_model=ServicioResponse
)
def buscar_servicio(
    id_servicio: int,
    db: Session = Depends(get_db)
):

    servicio = obtener_servicio(
        db,
        id_servicio
    )

    if not servicio:

        raise HTTPException(
            status_code=404,
            detail="Servicio no encontrado"
        )

    return servicio


@router.post(
    "/",
    response_model=ServicioResponse,
    status_code=201
)
def registrar_servicio(
    servicio: ServicioCreate,
    db: Session = Depends(get_db)
):

    nuevo_servicio, error = crear_servicio(
        db,
        servicio
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nuevo_servicio

@router.delete(
    "/{id_servicio}",
    status_code=204
)
def eliminar_servicio_route(
    id_servicio: int,
    db: Session = Depends(get_db)
):
    servicio = eliminar_servicio(
        db,
        id_servicio
    )

    if not servicio:
        raise HTTPException(
            status_code=404,
            detail="Servicio no encontrado"
        )