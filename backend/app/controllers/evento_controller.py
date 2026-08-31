from sqlalchemy.orm import Session

from app.models.evento import Evento
from app.models.empresa import Empresa
from app.models.categoria import Categoria

from app.schemas.evento_schema import EventoCreate


def obtener_eventos(db: Session):

    return db.query(Evento).all()


def obtener_evento(
    db: Session,
    id_evento: int
):

    return db.query(Evento).filter(
        Evento.id_evento == id_evento
    ).first()


def crear_evento(
    db: Session,
    evento: EventoCreate
):

    empresa = db.query(Empresa).filter(
        Empresa.id_empresa == evento.id_empresa
    ).first()

    if not empresa:
        return None, "La empresa indicada no existe"


    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == evento.id_categoria
    ).first()

    if not categoria:
        return None, "La categoría indicada no existe"


    nuevo_evento = Evento(
        nombre_evento=evento.nombre_evento,
        descripcion_evento=evento.descripcion_evento,
        id_empresa=evento.id_empresa,
        id_categoria=evento.id_categoria
    )

    db.add(nuevo_evento)
    db.commit()
    db.refresh(nuevo_evento)

    return nuevo_evento, None

def eliminar_evento(
    db: Session,
    id_evento: int
):
    evento = (
        db.query(Evento)
        .filter(
            Evento.id_evento == id_evento
        )
        .first()
    )

    if not evento:
        return None

    db.delete(evento)
    db.commit()

    return evento