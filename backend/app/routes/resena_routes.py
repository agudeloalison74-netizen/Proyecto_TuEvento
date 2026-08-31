from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.resena_controller import (
    obtener_resenas,
    obtener_resena,
    crear_resena,
    eliminar_resena
)

from app.schemas.resena_schema import (
    ResenaCreate,
    ResenaResponse
)


router = APIRouter(
    prefix="/resenas",
    tags=["Reseñas"]
)


@router.get(
    "/",
    response_model=list[ResenaResponse]
)
def listar_resenas(
    db: Session = Depends(get_db)
):

    return obtener_resenas(db)


@router.get(
    "/{id_resena}",
    response_model=ResenaResponse
)
def buscar_resena(
    id_resena: int,
    db: Session = Depends(get_db)
):

    resena = obtener_resena(
        db,
        id_resena
    )

    if not resena:

        raise HTTPException(
            status_code=404,
            detail="Reseña no encontrada"
        )

    return resena


@router.post(
    "/",
    response_model=ResenaResponse,
    status_code=201
)
def registrar_resena(
    resena: ResenaCreate,
    db: Session = Depends(get_db)
):

    nueva_resena, error = crear_resena(
        db,
        resena
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_resena

@router.delete(
    "/{id_resena}",
    status_code=204
)
def eliminar_resena_route(
    id_resena: int,
    db: Session = Depends(get_db)
):
    resena = eliminar_resena(
        db,
        id_resena
    )

    if not resena:
        raise HTTPException(
            status_code=404,
            detail="Reseña no encontrada"
        )