from sqlalchemy import Column, Integer, String, Text, ForeignKey

from app.config.database import Base


class Muestra(Base):

    __tablename__ = "muestra"

    id_muestra = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    descripcion_muestra = Column(
        Text,
        nullable=True
    )

    url = Column(
        String,
        nullable=True
    )

    id_servicio = Column(
        Integer,
        ForeignKey("servicio.id_servicio"),
        nullable=False
    )