from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.muestra_controller import (
    obtener_muestras,
    obtener_muestra,
    crear_muestra,
    eliminar_muestra
)

from app.schemas.muestra_schema import (
    MuestraCreate,
    MuestraResponse
)


router = APIRouter(
    prefix="/muestras",
    tags=["Muestras"]
)


@router.get(
    "/",
    response_model=list[MuestraResponse]
)
def listar_muestras(
    db: Session = Depends(get_db)
):

    return obtener_muestras(db)


@router.get(
    "/{id_muestra}",
    response_model=MuestraResponse
)
def buscar_muestra(
    id_muestra: int,
    db: Session = Depends(get_db)
):

    muestra = obtener_muestra(
        db,
        id_muestra
    )

    if not muestra:

        raise HTTPException(
            status_code=404,
            detail="Muestra no encontrada"
        )

    return muestra


@router.post(
    "/",
    response_model=MuestraResponse,
    status_code=201
)
def registrar_muestra(
    muestra: MuestraCreate,
    db: Session = Depends(get_db)
):

    nueva_muestra, error = crear_muestra(
        db,
        muestra
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_muestra

@router.delete(
    "/{id_muestra}",
    status_code=204
)
def eliminar_muestra_route(
    id_muestra: int,
    db: Session = Depends(get_db)
):
    muestra = eliminar_muestra(
        db,
        id_muestra
    )

    if not muestra:
        raise HTTPException(
            status_code=404,
            detail="Muestra no encontrada"
        )