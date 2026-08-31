from sqlalchemy.orm import Session

from app.models.resena import Resena
from app.models.reserva import Reserva

from app.schemas.resena_schema import ResenaCreate


def obtener_resenas(db: Session):

    return db.query(Resena).all()


def obtener_resena(
    db: Session,
    id_resena: int
):

    return db.query(Resena).filter(
        Resena.id_resena == id_resena
    ).first()


def crear_resena(
    db: Session,
    resena: ResenaCreate
):

    reserva = db.query(Reserva).filter(
        Reserva.id_reserva == resena.id_reserva
    ).first()

    if not reserva:

        return None, "La reserva indicada no existe"


    nueva_resena = Resena(
        fecha_resena=resena.fecha_resena,
        descripcion_resena=resena.descripcion_resena,
        id_reserva=resena.id_reserva
    )

    db.add(nueva_resena)
    db.commit()
    db.refresh(nueva_resena)

    return nueva_resena, None

def eliminar_resena(
    db: Session,
    id_resena: int
):
    resena = (
        db.query(Resena)
        .filter(
            Resena.id_resena == id_resena
        )
        .first()
    )

    if not resena:
        return None

    db.delete(resena)
    db.commit()

    return resena