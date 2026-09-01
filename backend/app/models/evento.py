from sqlalchemy import Column, Integer, String, Text, ForeignKey

from app.config.database import Base


class Evento(Base):

    __tablename__ = "evento"

    id_evento = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_evento = Column(
        String,
        nullable=False
    )

    descripcion_evento = Column(
        Text,
        nullable=True
    )

    id_empresa = Column(
      String,
      ForeignKey("empresa.id_empresa"),
      nullable=False
    )
 
    id_categoria = Column(
        Integer,
        ForeignKey("categoria.id_categoria"),
        nullable=False
    )