from sqlalchemy import (
    CheckConstraint,
    Column,
    Date,
    ForeignKey,
    Integer,
    Text
)

from app.config.database import Base


class Resena(Base):

    __tablename__ = "resena"
    __table_args__ = (
        CheckConstraint(
            "calificacion IS NULL OR calificacion BETWEEN 1 AND 5",
            name="ck_resena_calificacion_range"
        ),
    )

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

    calificacion = Column(
        Integer,
        nullable=True
    )

    respuesta_empresa = Column(
        Text,
        nullable=True
    )

    id_reserva = Column(
        Integer,
        ForeignKey("reserva.id_reserva"),
        nullable=False
    )