from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.categoria import Categoria
from app.schemas.categoria_schema import CategoriaCreate


# =========================================================
# OBTENER TODAS LAS CATEGORÍAS
# =========================================================

def obtener_categorias(
    db: Session
):

    return (
        db.query(Categoria)
        .all()
    )


# =========================================================
# OBTENER UNA CATEGORÍA
# =========================================================

def obtener_categoria(
    db: Session,
    id_categoria: int
):

    return (
        db.query(Categoria)
        .filter(
            Categoria.id_categoria == id_categoria
        )
        .first()
    )


# =========================================================
# CREAR CATEGORÍA
# =========================================================

def crear_categoria(
    db: Session,
    categoria: CategoriaCreate
):

    nueva_categoria = Categoria(
        nombre_categoria=categoria.nombre_categoria,
        descripcion_categoria=categoria.descripcion_categoria
    )

    db.add(nueva_categoria)

    db.commit()

    db.refresh(nueva_categoria)

    return nueva_categoria


# =========================================================
# ELIMINAR CATEGORÍA
# =========================================================

def eliminar_categoria(
    db: Session,
    id_categoria: int
):

    categoria = (
        db.query(Categoria)
        .filter(
            Categoria.id_categoria == id_categoria
        )
        .first()
    )

    if not categoria:
        return None

    db.delete(categoria)

    db.commit()

    return categoria