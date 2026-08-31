from sqlalchemy.orm import Session

from app.models.empresa import Empresa
from app.models.ciudad import Ciudad
from app.models.usuario import Usuario

from app.schemas.empresa_schema import EmpresaCreate


def obtener_empresas(db: Session):

    return db.query(Empresa).all()


def obtener_empresa(
    db: Session,
    id_empresa: str
):

    return db.query(Empresa).filter(
        Empresa.id_empresa == id_empresa
    ).first()


def crear_empresa(
    db: Session,
    empresa: EmpresaCreate
):

    ciudad = db.query(Ciudad).filter(
        Ciudad.id_ciudad == empresa.id_ciudad
    ).first()

    if not ciudad:

        return None, "La ciudad indicada no existe"


    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == empresa.id_usuario
    ).first()

    if not usuario:

        return None, "El usuario indicado no existe"


    empresa_existente = db.query(Empresa).filter(
        Empresa.id_empresa == empresa.id_empresa
    ).first()

    if empresa_existente:

        return None, "El NIT de la empresa ya está registrado"


    nueva_empresa = Empresa(

        id_empresa=empresa.id_empresa,

        nombre_empresa=empresa.nombre_empresa,

        descripcion_empresa=empresa.descripcion_empresa,

        contacto_empresa=empresa.contacto_empresa,

        direccion_empresa=empresa.direccion_empresa,

        id_ciudad=empresa.id_ciudad,

        id_usuario=empresa.id_usuario
    )

    db.add(nueva_empresa)

    db.commit()

    db.refresh(nueva_empresa)

    return nueva_empresa, None

def eliminar_empresa(
    db: Session,
    id_empresa: str
):
    empresa = (
        db.query(Empresa)
        .filter(
            Empresa.id_empresa == id_empresa
        )
        .first()
    )

    if not empresa:
        return None

    db.delete(empresa)
    db.commit()

    return empresa