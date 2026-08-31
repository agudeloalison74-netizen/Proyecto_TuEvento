from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.evento_controller import (
    obtener_eventos,
    obtener_evento,
    crear_evento,
    eliminar_evento
)

from app.schemas.evento_schema import (
    EventoCreate,
    EventoResponse
)


router = APIRouter(
    prefix="/eventos",
    tags=["Eventos"]
)


@router.get(
    "/",
    response_model=list[EventoResponse]
)
def listar_eventos(
    db: Session = Depends(get_db)
):

    return obtener_eventos(db)


@router.get(
    "/{id_evento}",
    response_model=EventoResponse
)
def buscar_evento(
    id_evento: int,
    db: Session = Depends(get_db)
):

    evento = obtener_evento(
        db,
        id_evento
    )

    if not evento:

        raise HTTPException(
            status_code=404,
            detail="Evento no encontrado"
        )

    return evento


@router.post(
    "/",
    response_model=EventoResponse,
    status_code=201
)
def registrar_evento(
    evento: EventoCreate,
    db: Session = Depends(get_db)
):

    nuevo_evento, error = crear_evento(
        db,
        evento
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return nuevo_evento

@router.delete(
    "/{id_evento}",
    status_code=204
)
def eliminar_evento_route(
    id_evento: int,
    db: Session = Depends(get_db)
):
    evento = eliminar_evento(
        db,
        id_evento
    )

    if not evento:
        raise HTTPException(
            status_code=404,
            detail="Evento no encontrado"
        )