from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.utils.security import (
    get_admin_user,
    get_cliente_user,
    get_empresa_user
)

from app.controllers.reserva_controller import (
    obtener_reservas,
    obtener_reserva,
    crear_reserva,
    obtener_reservas_cliente,
    obtener_solicitudes_empresa,
    actualizar_estado_reserva,
    eliminar_reserva
)

from app.schemas.reserva_schema import (
    ReservaCreate,
    ReservaDetalleResponse,
    ReservaEstadoUpdate,
    ReservaResponse
)


router = APIRouter(
    prefix="/reservas",
    tags=["Reservas"]
)


@router.get(
    "/",
    response_model=list[ReservaResponse]
)
def listar_reservas(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):

    return obtener_reservas(db)


def _id_usuario_actual(usuario_actual: dict) -> int:
    try:
        return int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error


@router.get(
    "/mis-reservas",
    response_model=list[ReservaDetalleResponse]
)
def listar_mis_reservas(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_cliente_user)
):
    return obtener_reservas_cliente(
        db,
        _id_usuario_actual(usuario_actual)
    )


@router.get(
    "/solicitudes-empresa",
    response_model=list[ReservaDetalleResponse]
)
def listar_solicitudes_empresa(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_empresa_user)
):
    return obtener_solicitudes_empresa(
        db,
        _id_usuario_actual(usuario_actual)
    )


@router.get(
    "/{id_reserva}",
    response_model=ReservaResponse
)
def buscar_reserva(
    id_reserva: int,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):

    reserva = obtener_reserva(
        db,
        id_reserva
    )

    if not reserva:

        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )

    return reserva


@router.post(
    "/",
    response_model=ReservaResponse,
    status_code=201
)
def registrar_reserva(
    reserva: ReservaCreate,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_cliente_user)
):
    if reserva.id_usuario != _id_usuario_actual(usuario_actual):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No puedes crear solicitudes para otra cuenta."
        )

    nueva_reserva, error = crear_reserva(
        db,
        reserva
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nueva_reserva


@router.patch(
    "/{id_reserva}/estado",
    response_model=ReservaResponse
)
def responder_solicitud(
    id_reserva: int,
    datos: ReservaEstadoUpdate,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_empresa_user)
):
    return actualizar_estado_reserva(
        db,
        id_reserva,
        _id_usuario_actual(usuario_actual),
        datos.estado
    )


@router.delete(
    "/{id_reserva}",
    status_code=204
)
def eliminar_reserva_route(
    id_reserva: int,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):
    reserva = eliminar_reserva(
        db,
        id_reserva
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada"
        )