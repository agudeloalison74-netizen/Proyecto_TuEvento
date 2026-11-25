from fastapi import APIRouter, Depends, HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.utils.security import get_admin_user, get_current_user

from app.controllers.empresa_controller import (
    obtener_empresas,
    obtener_empresa,
    obtener_empresa_y_servicios,
    crear_empresa,
    eliminar_empresa
)

from app.schemas.empresa_schema import (
    EmpresaCreate,
    EmpresaResponse,
    EmpresaServiciosResponse
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
    "/mis-servicios",
    response_model=EmpresaServiciosResponse
)
def listar_mis_servicios(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_current_user)
):
    if usuario_actual.get("rol", "").lower() != "empresa":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Esta ruta es exclusiva para cuentas empresariales."
        )

    try:
        id_usuario = int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error

    datos_empresa = obtener_empresa_y_servicios(db, id_usuario)
    if not datos_empresa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay una empresa asociada a esta cuenta."
        )

    return datos_empresa


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
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
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
