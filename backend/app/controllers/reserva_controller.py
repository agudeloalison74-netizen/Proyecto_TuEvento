from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.empresa import Empresa
from app.models.resena import Resena
from app.models.reserva import Reserva
from app.models.usuario import Usuario
from app.models.servicio import Servicio

from app.schemas.reserva_schema import ReservaCreate


def obtener_reservas(db: Session):

    return db.query(Reserva).all()


def _detalle_reserva(
    reserva: Reserva,
    servicio: Servicio,
    empresa: Empresa,
    resena: Resena | None,
    usuario: Usuario | None = None
) -> dict:
    return {
        "id_reserva": reserva.id_reserva,
        "id_usuario": reserva.id_usuario,
        "id_servicio": servicio.id_servicio,
        "fecha_hora": reserva.fecha_hora,
        "estado": reserva.estado,
        "precio_total": reserva.precio_total,
        "tipo_evento": reserva.tipo_evento,
        "cantidad_personas": reserva.cantidad_personas,
        "mensaje": reserva.mensaje,
        "nombre_servicio": servicio.nombre_servicio,
        "descripcion_servicio": servicio.descripcion_servicio,
        "nombre_empresa": empresa.nombre_empresa,
        "id_resena": resena.id_resena if resena else None,
        "calificacion": resena.calificacion if resena else None,
        "nombre_cliente": (
            f"{usuario.nombre_usuario} {usuario.apellido_usuario}"
            if usuario else None
        ),
        "correo_cliente": usuario.correo_usuario if usuario else None
    }


def obtener_reservas_cliente(
    db: Session,
    id_usuario: int
) -> list[dict]:
    filas = (
        db.query(Reserva, Servicio, Empresa, Resena)
        .join(Servicio, Servicio.id_servicio == Reserva.id_servicio)
        .join(Empresa, Empresa.id_empresa == Servicio.id_empresa)
        .outerjoin(Resena, Resena.id_reserva == Reserva.id_reserva)
        .filter(Reserva.id_usuario == id_usuario)
        .order_by(Reserva.fecha_hora.desc(), Reserva.id_reserva.desc())
        .all()
    )

    return [
        _detalle_reserva(reserva, servicio, empresa, resena)
        for reserva, servicio, empresa, resena in filas
    ]


def obtener_solicitudes_empresa(
    db: Session,
    id_usuario: int
) -> list[dict]:
    filas = (
        db.query(Reserva, Servicio, Empresa, Resena, Usuario)
        .join(Servicio, Servicio.id_servicio == Reserva.id_servicio)
        .join(Empresa, Empresa.id_empresa == Servicio.id_empresa)
        .join(Usuario, Usuario.id_usuario == Reserva.id_usuario)
        .outerjoin(Resena, Resena.id_reserva == Reserva.id_reserva)
        .filter(Empresa.id_usuario == id_usuario)
        .order_by(Reserva.fecha_hora.desc(), Reserva.id_reserva.desc())
        .all()
    )

    return [
        _detalle_reserva(reserva, servicio, empresa, resena, usuario)
        for reserva, servicio, empresa, resena, usuario in filas
    ]


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

    # Verificar que el usuario exista
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == reserva.id_usuario
    ).first()

    if not usuario:
        return None, "El usuario indicado no existe"

    # Verificar que el servicio exista
    servicio = db.query(Servicio).filter(
        Servicio.id_servicio == reserva.id_servicio
    ).first()

    if not servicio:
        return None, "El servicio indicado no existe"

    # Crear la reserva
    nueva_reserva = Reserva(
        id_usuario=reserva.id_usuario,
        id_servicio=reserva.id_servicio,
        fecha_hora=reserva.fecha_hora,
        estado=reserva.estado,
        precio_total=reserva.precio_total,
        tipo_evento=reserva.tipo_evento,
        cantidad_personas=reserva.cantidad_personas,
        mensaje=reserva.mensaje
    )

    db.add(nueva_reserva)
    db.commit()
    db.refresh(nueva_reserva)

    return nueva_reserva, None


def actualizar_estado_reserva(
    db: Session,
    id_reserva: int,
    id_usuario_empresa: int,
    nuevo_estado: str
) -> Reserva:
    reserva = (
        db.query(Reserva)
        .join(Servicio, Servicio.id_servicio == Reserva.id_servicio)
        .join(Empresa, Empresa.id_empresa == Servicio.id_empresa)
        .filter(
            Reserva.id_reserva == id_reserva,
            Empresa.id_usuario == id_usuario_empresa
        )
        .first()
    )

    if not reserva:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró esta solicitud para tu empresa."
        )

    if reserva.estado.upper() != "PENDIENTE":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Solo puedes responder solicitudes pendientes."
        )

    reserva.estado = nuevo_estado
    db.commit()
    db.refresh(reserva)
    return reserva


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