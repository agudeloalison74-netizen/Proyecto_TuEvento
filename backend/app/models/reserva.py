from sqlalchemy import Column, Integer, String, DateTime, Numeric, ForeignKey

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

    estado = Column(
        String,
        nullable=False
    )

    precio_total = Column(
        Numeric,
        nullable=False
    )