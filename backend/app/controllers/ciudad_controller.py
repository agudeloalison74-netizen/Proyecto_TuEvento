from sqlalchemy.orm import Session

from app.models.ciudad import Ciudad
from app.models.departamento import Departamento

from app.schemas.ciudad_schema import CiudadCreate


def obtener_ciudades(db: Session):

    return db.query(Ciudad).all()


def obtener_ciudad(
    db: Session,
    id_ciudad: int
):

    return db.query(Ciudad).filter(
        Ciudad.id_ciudad == id_ciudad
    ).first()


def crear_ciudad(
    db: Session,
    ciudad: CiudadCreate
):

    departamento = db.query(Departamento).filter(
        Departamento.id_departamento == ciudad.id_departamento
    ).first()

    if not departamento:

        return None

    nueva_ciudad = Ciudad(
        nombre_ciudad=ciudad.nombre_ciudad,
        id_departamento=ciudad.id_departamento
    )

    db.add(nueva_ciudad)
    db.commit()
    db.refresh(nueva_ciudad)

    return nueva_ciudad

def eliminar_ciudad(
    db: Session,
    id_ciudad: int
):
    ciudad = (
        db.query(Ciudad)
        .filter(
            Ciudad.id_ciudad == id_ciudad
        )
        .first()
    )

    if not ciudad:
        return None

    db.delete(ciudad)
    db.commit()

    return ciudad