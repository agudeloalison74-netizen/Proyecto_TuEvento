from sqlalchemy.orm import Session

from app.models.reserva import Reserva
from app.models.usuario import Usuario

from app.schemas.reserva_schema import ReservaCreate


def obtener_reservas(db: Session):

    return db.query(Reserva).all()


def obtener_reserva(
    db: Session,
    id_reserva: int
):

    return db.query(Reserva).filter(
        Reserva.id_reserva == id_reserva
    ).first()


def crear_reserva(
    db: Session,
    reserva: ReservaCreate
):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == reserva.id_usuario
    ).first()

    if not usuario:

        return None, "El usuario indicado no existe"


    nueva_reserva = Reserva(
        id_usuario=reserva.id_usuario,
        fecha_hora=reserva.fecha_hora,
        estado=reserva.estado,
        precio_total=reserva.precio_total
    )

    db.add(nueva_reserva)
    db.commit()
    db.refresh(nueva_reserva)

    return nueva_reserva, None

def eliminar_reserva(
    db: Session,
    id_reserva: int
):
    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id_reserva == id_reserva
        )
        .first()
    )

    if not reserva:
        return None

    db.delete(reserva)
    db.commit()

    return reserva