from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.empresa_controller import (
    obtener_empresas,
    obtener_empresa,
    crear_empresa,
    eliminar_empresa
)

from app.schemas.empresa_schema import (
    EmpresaCreate,
    EmpresaResponse
)


router = APIRouter(
    prefix="/empresas",
    tags=["Empresas"]
)


@router.get(
    "/",
    response_model=list[EmpresaResponse]
)
def listar_empresas(
    db: Session = Depends(get_db)
):

    return obtener_empresas(db)


@router.get(
    "/{id_empresa}",
    response_model=EmpresaResponse
)
def buscar_empresa(
    id_empresa: str,
    db: Session = Depends(get_db)
):

    empresa = obtener_empresa(
        db,
        id_empresa
    )

    if not empresa:

        raise HTTPException(
            status_code=404,
            detail="Empresa no encontrada"
        )

    return empresa


@router.post(
    "/",
    response_model=EmpresaResponse,
    status_code=201
)
def registrar_empresa(
    empresa: EmpresaCreate,
    db: Session = Depends(get_db)
):

    nueva_empresa, error = crear_empresa(
        db,
        empresa
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_empresa

@router.delete(
    "/{id_empresa}",
    status_code=204
)
def eliminar_empresa_route(
    id_empresa: str,
    db: Session = Depends(get_db)
):
    empresa = eliminar_empresa(
        db,
        id_empresa
    )

    if not empresa:
        raise HTTPException(
            status_code=404,
            detail="Empresa no encontrada"
        )