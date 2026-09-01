from sqlalchemy import Column, Integer, String, ForeignKey

from app.config.database import Base


class Ciudad(Base):

    __tablename__ = "ciudad"

    id_ciudad = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_ciudad = Column(
        String,
        nullable=False
    )

    id_departamento = Column(
        Integer,
        ForeignKey("departamento.id_departamento"),
        nullable=False
    )