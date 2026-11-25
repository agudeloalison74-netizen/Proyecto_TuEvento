from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text
)

from app.config.database import Base


class Reserva(Base):

    __tablename__ = "reserva"

    id_reserva = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        nullable=False
    )

    id_servicio = Column(
        Integer,
        ForeignKey("servicio.id_servicio"),
        nullable=False
    )

    fecha_hora = Column(
        DateTime,
        nullable=False
    )

    tipo_evento = Column(
        String(100),
        nullable=True
    )

    cantidad_personas = Column(
        Integer,
        nullable=True
    )

    mensaje = Column(
        Text,
        nullable=True
    )

    estado = Column(
        String,
        nullable=False
    )

    precio_total = Column(
        Numeric,
        nullable=False
    )