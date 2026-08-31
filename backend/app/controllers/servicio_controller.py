from sqlalchemy.orm import Session

from app.models.servicio import Servicio
from app.models.empresa import Empresa

from app.schemas.servicio_schema import ServicioCreate


def obtener_servicios(db: Session):

    return db.query(Servicio).all()


def obtener_servicio(
    db: Session,
    id_servicio: int
):

    return db.query(Servicio).filter(
        Servicio.id_servicio == id_servicio
    ).first()


def crear_servicio(
    db: Session,
    servicio: ServicioCreate
):

    empresa = db.query(Empresa).filter(
        Empresa.id_empresa == servicio.id_empresa
    ).first()

    if not empresa:
        return None, "La empresa indicada no existe"

    nuevo_servicio = Servicio(
        nombre_servicio=servicio.nombre_servicio,
        descripcion_servicio=servicio.descripcion_servicio,
        precio_referencia=servicio.precio_referencia,
        id_empresa=servicio.id_empresa
    )

    db.add(nuevo_servicio)
    db.commit()
    db.refresh(nuevo_servicio)

    return nuevo_servicio, None

def eliminar_servicio(
    db: Session,
    id_servicio: int
):
    servicio = (
        db.query(Servicio)
        .filter(
            Servicio.id_servicio == id_servicio
        )
        .first()
    )

    if not servicio:
        return None

    db.delete(servicio)
    db.commit()

    return servicio