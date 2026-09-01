from sqlalchemy import Column, Integer, Date, Text, ForeignKey

from app.config.database import Base


class Resena(Base):

    __tablename__ = "resena"

    id_resena = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    fecha_resena = Column(
        Date,
        nullable=False
    )

    descripcion_resena = Column(
        Text,
        nullable=True
    )

    id_reserva = Column(
        Integer,
        ForeignKey("reserva.id_reserva"),
        nullable=False
    )