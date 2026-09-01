from sqlalchemy.orm import Session

from app.models.muestra import Muestra
from app.models.servicio import Servicio

from app.schemas.muestra_schema import MuestraCreate


def obtener_muestras(db: Session):

    return db.query(Muestra).all()


def obtener_muestra(
    db: Session,
    id_muestra: int
):

    return db.query(Muestra).filter(
        Muestra.id_muestra == id_muestra
    ).first()


def crear_muestra(
    db: Session,
    muestra: MuestraCreate
):

    servicio = db.query(Servicio).filter(
        Servicio.id_servicio == muestra.id_servicio
    ).first()

    if not servicio:

        return None, "El servicio indicado no existe"


    nueva_muestra = Muestra(
        descripcion_muestra=muestra.descripcion_muestra,
        url=muestra.url,
        id_servicio=muestra.id_servicio
    )

    db.add(nueva_muestra)
    db.commit()
    db.refresh(nueva_muestra)

    return nueva_muestra, None

def eliminar_muestra(
    db: Session,
    id_muestra: int
):
    muestra = (
        db.query(Muestra)
        .filter(
            Muestra.id_muestra == id_muestra
        )
        .first()
    )

    if not muestra:
        return None

    db.delete(muestra)
    db.commit()

    return muestra