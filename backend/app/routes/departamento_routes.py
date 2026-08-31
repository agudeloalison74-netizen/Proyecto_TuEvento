from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.departamento_controller import (
    obtener_departamentos,
    obtener_departamento,
    crear_departamento,
    eliminar_departamento
)

from app.schemas.departamento_schema import (
    DepartamentoCreate,
    DepartamentoResponse
)


router = APIRouter(
    prefix="/departamentos",
    tags=["Departamentos"]
)


@router.get(
    "/",
    response_model=list[DepartamentoResponse]
)
def listar_departamentos(
    db: Session = Depends(get_db)
):

    return obtener_departamentos(db)


@router.get(
    "/{id_departamento}",
    response_model=DepartamentoResponse
)
def buscar_departamento(
    id_departamento: int,
    db: Session = Depends(get_db)
):

    departamento = obtener_departamento(
        db,
        id_departamento
    )

    if not departamento:

        raise HTTPException(
            status_code=404,
            detail="Departamento no encontrado"
        )

    return departamento


@router.post(
    "/",
    response_model=DepartamentoResponse,
    status_code=201
)
def registrar_departamento(
    departamento: DepartamentoCreate,
    db: Session = Depends(get_db)
):

    return crear_departamento(
        db,
        departamento
    )

@router.delete(
    "/{id_departamento}",
    status_code=204
)
def eliminar_departamento_route(
    id_departamento: int,
    db: Session = Depends(get_db)
):
    departamento = eliminar_departamento(
        db,
        id_departamento
    )

    if not departamento:
        raise HTTPException(
            status_code=404,
            detail="Departamento no encontrado"
        )