from sqlalchemy.orm import Session

from app.models.servicio_reserva import ServicioReserva
from app.models.reserva import Reserva
from app.models.evento import Evento
from app.models.servicio import Servicio

from app.schemas.servicio_reserva_schema import ServicioReservaCreate


def obtener_servicios_reservas(db: Session):

    return db.query(ServicioReserva).all()


def crear_servicio_reserva(
    db: Session,
    relacion: ServicioReservaCreate
):

    reserva = db.query(Reserva).filter(
        Reserva.id_reserva == relacion.id_reserva
    ).first()

    if not reserva:

        return None, "La reserva no existe"


    evento = db.query(Evento).filter(
        Evento.id_evento == relacion.id_evento
    ).first()

    if not evento:

        return None, "El evento no existe"


    servicio = db.query(Servicio).filter(
        Servicio.id_servicio == relacion.id_servicio
    ).first()

    if not servicio:

        return None, "El servicio no existe"


    existente = db.query(ServicioReserva).filter(
        ServicioReserva.id_reserva == relacion.id_reserva,
        ServicioReserva.id_evento == relacion.id_evento,
        ServicioReserva.id_servicio == relacion.id_servicio
    ).first()

    if existente:

        return None, "La relación ya existe"


    nueva_relacion = ServicioReserva(
        id_reserva=relacion.id_reserva,
        id_evento=relacion.id_evento,
        id_servicio=relacion.id_servicio
    )

    db.add(nueva_relacion)
    db.commit()
    db.refresh(nueva_relacion)

    return nueva_relacion, None

def eliminar_servicio_reserva(
    db: Session,
    id_reserva: int,
    id_evento: int,
    id_servicio: int
):
    relacion = (
        db.query(ServicioReserva)
        .filter(
            ServicioReserva.id_reserva == id_reserva,
            ServicioReserva.id_evento == id_evento,
            ServicioReserva.id_servicio == id_servicio
        )
        .first()
    )

    if not relacion:
        return None

    db.delete(relacion)
    db.commit()

    return relacion