from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.ciudad_controller import (
    obtener_ciudades,
    obtener_ciudad,
    crear_ciudad,
    eliminar_ciudad 
)

from app.schemas.ciudad_schema import (
    CiudadCreate,
    CiudadResponse
)


router = APIRouter(
    prefix="/ciudades",
    tags=["Ciudades"]
)


@router.get(
    "/",
    response_model=list[CiudadResponse]
)
def listar_ciudades(
    db: Session = Depends(get_db)
):

    return obtener_ciudades(db)


@router.get(
    "/{id_ciudad}",
    response_model=CiudadResponse
)
def buscar_ciudad(
    id_ciudad: int,
    db: Session = Depends(get_db)
):

    ciudad = obtener_ciudad(
        db,
        id_ciudad
    )

    if not ciudad:

        raise HTTPException(
            status_code=404,
            detail="Ciudad no encontrada"
        )

    return ciudad


@router.post(
    "/",
    response_model=CiudadResponse,
    status_code=201
)
def registrar_ciudad(
    ciudad: CiudadCreate,
    db: Session = Depends(get_db)
):

    nueva_ciudad = crear_ciudad(
        db,
        ciudad
    )

    if nueva_ciudad is None:

        raise HTTPException(
            status_code=400,
            detail="El departamento indicado no existe"
        )

    return nueva_ciudad

@router.delete(
    "/{id_ciudad}",
    status_code=204
)
def eliminar_ciudad_route(
    id_ciudad: int,
    db: Session = Depends(get_db)
):
    ciudad = eliminar_ciudad(
        db,
        id_ciudad
    )

    if not ciudad:
        raise HTTPException(
            status_code=404,
            detail="Ciudad no encontrada"
        )