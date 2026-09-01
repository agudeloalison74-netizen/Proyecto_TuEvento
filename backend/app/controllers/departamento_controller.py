from sqlalchemy.orm import Session

from app.models.departamento import Departamento
from app.schemas.departamento_schema import DepartamentoCreate


def obtener_departamentos(db: Session):

    return db.query(Departamento).all()


def obtener_departamento(
    db: Session,
    id_departamento: int
):

    return db.query(Departamento).filter(
        Departamento.id_departamento == id_departamento
    ).first()


def crear_departamento(
    db: Session,
    departamento: DepartamentoCreate
):

    nuevo_departamento = Departamento(
        nombre_departamento=departamento.nombre_departamento
    )

    db.add(nuevo_departamento)
    db.commit()
    db.refresh(nuevo_departamento)

    return nuevo_departamento

def eliminar_departamento(
    db: Session,
    id_departamento: int
):
    departamento = (
        db.query(Departamento)
        .filter(
            Departamento.id_departamento == id_departamento
        )
        .first()
    )

    if not departamento:
        return None

    db.delete(departamento)
    db.commit()

    return departamento