from sqlalchemy import Column, Integer, String

from app.config.database import Base


class Usuario(Base):

    __tablename__ = "usuario"

    id_usuario = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_usuario = Column(
        String,
        nullable=False
    )

    apellido_usuario = Column(
        String,
        nullable=False
    )

    correo_usuario = Column(
        String,
        nullable=False
    )

    telefono_usuario = Column(
        String,
        nullable=False
    )

    contrasena_usuario = Column(
        String,
        nullable=True
    )

    rol = Column(
        String,
        nullable=False
    )