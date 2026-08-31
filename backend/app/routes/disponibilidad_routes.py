from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.disponibilidad_controller import (
    obtener_disponibilidades,
    obtener_disponibilidad,
    crear_disponibilidad,
    eliminar_disponibilidad
)

from app.schemas.disponibilidad_schema import (
    DisponibilidadCreate,
    DisponibilidadResponse
)


router = APIRouter(
    prefix="/disponibilidades",
    tags=["Disponibilidades"]
)


@router.get(
    "/",
    response_model=list[DisponibilidadResponse]
)
def listar_disponibilidades(
    db: Session = Depends(get_db)
):

    return obtener_disponibilidades(db)


@router.get(
    "/{id_disponibilidad}",
    response_model=DisponibilidadResponse
)
def buscar_disponibilidad(
    id_disponibilidad: int,
    db: Session = Depends(get_db)
):

    disponibilidad = obtener_disponibilidad(
        db,
        id_disponibilidad
    )

    if not disponibilidad:

        raise HTTPException(
            status_code=404,
            detail="Disponibilidad no encontrada"
        )

    return disponibilidad


@router.post(
    "/",
    response_model=DisponibilidadResponse,
    status_code=201
)
def registrar_disponibilidad(
    disponibilidad: DisponibilidadCreate,
    db: Session = Depends(get_db)
):

    nueva_disponibilidad, error = crear_disponibilidad(
        db,
        disponibilidad
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_disponibilidad

@router.delete(
    "/{id_disponibilidad}",
    status_code=204
)
def eliminar_disponibilidad_route(
    id_disponibilidad: int,
    db: Session = Depends(get_db)
):
    disponibilidad = eliminar_disponibilidad(
        db,
        id_disponibilidad
    )

    if not disponibilidad:
        raise HTTPException(
            status_code=404,
            detail="Disponibilidad no encontrada"
        )