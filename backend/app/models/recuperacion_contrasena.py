
from sqlalchemy import Column, Integer, String, Float

from app.config.database import Base


class RecuperacionContrasena(Base):

    __tablename__ = "recuperacion_contrasena"

    correo_usuario = Column(
        String,
        primary_key=True,
        nullable=False
    )

    codigo_hash = Column(
        String,
        nullable=False
    )

    expira_en = Column(
        Float,
        nullable=False
    )

    intentos = Column(
        Integer,
        nullable=False,
        default=0
    )