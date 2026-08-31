from sqlalchemy import Column, String, Text, Integer, ForeignKey

from app.config.database import Base


class Empresa(Base):

    __tablename__ = "empresa"

    id_empresa = Column(
        String,
        primary_key=True
    )

    nombre_empresa = Column(
        String,
        nullable=False
    )

    descripcion_empresa = Column(
        Text,
        nullable=True
    )

    contacto_empresa = Column(
        String,
        nullable=True
    )

    direccion_empresa = Column(
        String,
        nullable=True
    )

    id_ciudad = Column(
        Integer,
        ForeignKey("ciudad.id_ciudad"),
        nullable=False
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        nullable=False
    )