from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.utils.security import (
    get_admin_user,
    get_cliente_user,
    get_empresa_user
)

from app.controllers.resena_controller import (
    obtener_resenas,
    obtener_resena,
    obtener_resenas_cliente,
    obtener_resenas_empresa,
    crear_resena,
    responder_resena,
    eliminar_resena
)

from app.schemas.resena_schema import (
    ResenaCreate,
    ResenaDetalleResponse,
    ResenaResponse,
    ResenaRespuestaUpdate
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
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):

    return obtener_resenas(db)


def _id_usuario_actual(usuario_actual: dict) -> int:
    try:
        return int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error


@router.get(
    "/mis-resenas",
    response_model=list[ResenaDetalleResponse]
)
def listar_mis_resenas(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_cliente_user)
):
    return obtener_resenas_cliente(
        db,
        _id_usuario_actual(usuario_actual)
    )


@router.get(
    "/empresa",
    response_model=list[ResenaDetalleResponse]
)
def listar_resenas_empresa(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_empresa_user)
):
    return obtener_resenas_empresa(
        db,
        _id_usuario_actual(usuario_actual)
    )


@router.get(
    "/{id_resena}",
    response_model=ResenaResponse
)
def buscar_resena(
    id_resena: int,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
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
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_cliente_user)
):
    return crear_resena(
        db,
        resena,
        _id_usuario_actual(usuario_actual)
    )


@router.put(
    "/{id_resena}/respuesta",
    response_model=ResenaDetalleResponse
)
def actualizar_respuesta_resena(
    id_resena: int,
    datos: ResenaRespuestaUpdate,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_empresa_user)
):
    return responder_resena(
        db,
        id_resena,
        _id_usuario_actual(usuario_actual),
        datos.respuesta_empresa
    )


@router.delete(
    "/{id_resena}",
    status_code=204
)
def eliminar_resena_route(
    id_resena: int,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
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
