from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey

from app.config.database import Base


class Servicio(Base):

    __tablename__ = "servicio"

    id_servicio = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_servicio = Column(
        String,
        nullable=False
    )

    descripcion_servicio = Column(
        Text,
        nullable=False
    )

    precio_referencia = Column(
        Numeric,
        nullable=True
    )

    id_empresa = Column(
      String,
      ForeignKey("empresa.id_empresa"),
      nullable=False
    )