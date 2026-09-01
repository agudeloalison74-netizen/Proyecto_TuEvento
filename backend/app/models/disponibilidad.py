from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from app.config.database import Base


class Disponibilidad(Base):

    __tablename__ = "disponibilidad"

    id_disponibilidad = Column(
        Integer,
        primary_key=True,
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

    id_servicio = Column(
        Integer,
        ForeignKey("servicio.id_servicio"),
        nullable=True
    )