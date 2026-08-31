from sqlalchemy import Column, Integer, ForeignKey

from app.config.database import Base


class ServicioReserva(Base):

    __tablename__ = "servicio_reserva"

    id_reserva = Column(
        Integer,
        ForeignKey("reserva.id_reserva"),
        primary_key=True,
        nullable=False
    )

    id_evento = Column(
        Integer,
        ForeignKey("evento.id_evento"),
        primary_key=True,
        nullable=False
    )

    id_servicio = Column(
        Integer,
        ForeignKey("servicio.id_servicio"),
        primary_key=True,
        nullable=False
    )