from sqlalchemy.orm import Session

from app.models.servicio_evento import ServicioEvento
from app.models.servicio import Servicio
from app.models.evento import Evento

from app.schemas.servicio_evento_schema import ServicioEventoCreate


def obtener_servicios_eventos(db: Session):

    return db.query(ServicioEvento).all()


def crear_servicio_evento(
    db: Session,
    relacion: ServicioEventoCreate
):

    servicio = db.query(Servicio).filter(
        Servicio.id_servicio == relacion.id_servicio
    ).first()

    if not servicio:

        return None, "El servicio no existe"


    evento = db.query(Evento).filter(
        Evento.id_evento == relacion.id_evento
    ).first()

    if not evento:

        return None, "El evento no existe"


    existente = db.query(ServicioEvento).filter(
        ServicioEvento.id_servicio == relacion.id_servicio,
        ServicioEvento.id_evento == relacion.id_evento
    ).first()

    if existente:

        return None, "La relación ya existe"


    nueva_relacion = ServicioEvento(
        id_servicio=relacion.id_servicio,
        id_evento=relacion.id_evento
    )

    db.add(nueva_relacion)
    db.commit()
    db.refresh(nueva_relacion)

    return nueva_relacion, None

def eliminar_servicio_evento(
    db: Session,
    id_servicio: int,
    id_evento: int
):
    relacion = (
        db.query(ServicioEvento)
        .filter(
            ServicioEvento.id_servicio == id_servicio,
            ServicioEvento.id_evento == id_evento
        )
        .first()
    )

    if not relacion:
        return None

    db.delete(relacion)
    db.commit()

    return relacion