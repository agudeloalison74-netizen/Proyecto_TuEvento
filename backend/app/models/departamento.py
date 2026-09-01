from sqlalchemy import Column, Integer, String

from app.config.database import Base


class Departamento(Base):

    __tablename__ = "departamento"

    id_departamento = Column(
        Integer,
        primary_key=True,
        nullable=False
    )

    nombre_departamento = Column(
        String,
        nullable=False
    )