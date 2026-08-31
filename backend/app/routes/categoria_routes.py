from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.categoria_controller import (
    obtener_categorias,
    obtener_categoria,
    crear_categoria,
    eliminar_categoria
)
from app.schemas.categoria_schema import (
    CategoriaCreate,
    CategoriaResponse
)


router = APIRouter(
    prefix="/categorias",
    tags=["Categorías"]
)


@router.get(
    "/",
    response_model=list[CategoriaResponse]
)
def listar_categorias(
    db: Session = Depends(get_db)
):

    return obtener_categorias(db)


@router.get(
    "/{id_categoria}",
    response_model=CategoriaResponse
)
def buscar_categoria(
    id_categoria: int,
    db: Session = Depends(get_db)
):

    return obtener_categoria(
        db,
        id_categoria
    )


@router.post(
    "/",
    response_model=CategoriaResponse
)
def registrar_categoria(
    categoria: CategoriaCreate,
    db: Session = Depends(get_db)
):

    return crear_categoria(
        db,
        categoria
    )

# =========================================================
# ELIMINAR CATEGORÍA
# =========================================================

@router.delete(
    "/{id_categoria}",
    status_code=204
)
def eliminar_categoria_route(
    id_categoria: int,
    db: Session = Depends(get_db)
):

    categoria = eliminar_categoria(
        db,
        id_categoria
    )

    if not categoria:

        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )