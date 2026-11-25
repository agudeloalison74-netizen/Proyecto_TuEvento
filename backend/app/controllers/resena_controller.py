from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.empresa import Empresa
from app.models.resena import Resena
from app.models.reserva import Reserva
from app.models.servicio import Servicio
from app.models.usuario import Usuario

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


def _consulta_resenas_detalladas(db: Session):
    return (
        db.query(Resena, Reserva, Servicio, Empresa, Usuario)
        .join(Reserva, Reserva.id_reserva == Resena.id_reserva)
        .join(Servicio, Servicio.id_servicio == Reserva.id_servicio)
        .join(Empresa, Empresa.id_empresa == Servicio.id_empresa)
        .join(Usuario, Usuario.id_usuario == Reserva.id_usuario)
    )


def _detalle_resena(
    resena: Resena,
    reserva: Reserva,
    servicio: Servicio,
    empresa: Empresa,
    usuario: Usuario
) -> dict:
    return {
        "id_resena": resena.id_resena,
        "fecha_resena": resena.fecha_resena,
        "descripcion_resena": resena.descripcion_resena,
        "id_reserva": reserva.id_reserva,
        "calificacion": resena.calificacion,
        "respuesta_empresa": resena.respuesta_empresa,
        "id_servicio": servicio.id_servicio,
        "nombre_servicio": servicio.nombre_servicio,
        "nombre_empresa": empresa.nombre_empresa,
        "id_usuario": usuario.id_usuario,
        "nombre_cliente": (
            f"{usuario.nombre_usuario} {usuario.apellido_usuario}"
        ),
        "fecha_hora": reserva.fecha_hora,
        "estado": reserva.estado
    }


def obtener_resenas_cliente(
    db: Session,
    id_usuario: int
) -> list[dict]:
    filas = (
        _consulta_resenas_detalladas(db)
        .filter(Reserva.id_usuario == id_usuario)
        .order_by(Resena.fecha_resena.desc(), Resena.id_resena.desc())
        .all()
    )
    return [
        _detalle_resena(resena, reserva, servicio, empresa, usuario)
        for resena, reserva, servicio, empresa, usuario in filas
    ]


def obtener_resenas_empresa(
    db: Session,
    id_usuario: int
) -> list[dict]:
    filas = (
        _consulta_resenas_detalladas(db)
        .filter(Empresa.id_usuario == id_usuario)
        .order_by(Resena.fecha_resena.desc(), Resena.id_resena.desc())
        .all()
    )
    return [
        _detalle_resena(resena, reserva, servicio, empresa, usuario)
        for resena, reserva, servicio, empresa, usuario in filas
    ]


def crear_resena(
    db: Session,
    resena: ResenaCreate,
    id_usuario: int
):

    reserva = db.query(Reserva).filter(
        Reserva.id_reserva == resena.id_reserva
    ).first()

    if not reserva:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la solicitud asociada al comentario."
        )

    if reserva.id_usuario != id_usuario:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo puedes comentar tus propios servicios."
        )

    ahora = (
        datetime.now(reserva.fecha_hora.tzinfo)
        if reserva.fecha_hora.tzinfo
        else datetime.now()
    )
    if (
        reserva.estado.upper() not in {"ACEPTADA", "CONFIRMADA", "REALIZADA"}
        or reserva.fecha_hora > ahora
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Podrás comentar y puntuar el servicio cuando se haya realizado."
        )

    resena_existente = db.query(Resena).filter(
        Resena.id_reserva == reserva.id_reserva
    ).first()
    if resena_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya enviaste un comentario para este servicio."
        )

    nueva_resena = Resena(
        fecha_resena=resena.fecha_resena,
        descripcion_resena=resena.descripcion_resena,
        id_reserva=resena.id_reserva,
        calificacion=resena.calificacion
    )

    db.add(nueva_resena)
    db.commit()
    db.refresh(nueva_resena)

    return nueva_resena


def responder_resena(
    db: Session,
    id_resena: int,
    id_usuario_empresa: int,
    respuesta: str
) -> dict:
    fila = (
        _consulta_resenas_detalladas(db)
        .filter(
            Resena.id_resena == id_resena,
            Empresa.id_usuario == id_usuario_empresa
        )
        .first()
    )
    if not fila:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró el comentario para los servicios de tu empresa."
        )

    resena = fila[0]
    resena.respuesta_empresa = respuesta
    db.commit()
    db.refresh(resena)

    return _detalle_resena(*fila)


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
