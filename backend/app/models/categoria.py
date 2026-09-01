from sqlalchemy import Column, Integer, String, Text

from app.config.database import Base


class Categoria(Base):

    __tablename__ = "categoria"

    id_categoria = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_categoria = Column(
        String,
        nullable=False
    )

    descripcion_categoria = Column(
        Text,
        nullable=True
    )