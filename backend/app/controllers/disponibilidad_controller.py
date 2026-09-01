from sqlalchemy.orm import Session

from app.models.disponibilidad import Disponibilidad
from app.models.servicio import Servicio

from app.schemas.disponibilidad_schema import DisponibilidadCreate


def obtener_disponibilidades(db: Session):

    return db.query(Disponibilidad).all()


def obtener_disponibilidad(
    db: Session,
    id_disponibilidad: int
):

    return db.query(Disponibilidad).filter(
        Disponibilidad.id_disponibilidad == id_disponibilidad
    ).first()


def crear_disponibilidad(
    db: Session,
    disponibilidad: DisponibilidadCreate
):

    if disponibilidad.id_servicio is not None:

        servicio = db.query(Servicio).filter(
            Servicio.id_servicio == disponibilidad.id_servicio
        ).first()

        if not servicio:

            return None, "El servicio indicado no existe"


    nueva_disponibilidad = Disponibilidad(
        fecha_hora=disponibilidad.fecha_hora,
        estado=disponibilidad.estado,
        id_servicio=disponibilidad.id_servicio
    )

    db.add(nueva_disponibilidad)
    db.commit()
    db.refresh(nueva_disponibilidad)

    return nueva_disponibilidad, None

def eliminar_disponibilidad(
    db: Session,
    id_disponibilidad: int
):
    disponibilidad = (
        db.query(Disponibilidad)
        .filter(
            Disponibilidad.id_disponibilidad
            == id_disponibilidad
        )
        .first()
    )

    if not disponibilidad:
        return None

    db.delete(disponibilidad)
    db.commit()

    return disponibilidad