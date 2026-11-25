from datetime import date, datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ResenaBase(BaseModel):
    fecha_resena: date = Field(default_factory=date.today)
    descripcion_resena: str | None = None
    id_reserva: int


class ResenaCreate(ResenaBase):
    descripcion_resena: str = Field(min_length=1, max_length=2000)
    calificacion: Annotated[int, Field(ge=1, le=5)]

    @field_validator("descripcion_resena")
    @classmethod
    def validar_descripcion_no_vacia(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("El comentario no puede estar vacío.")
        return value


class ResenaResponse(ResenaBase):
    id_resena: int
    calificacion: int | None = None
    respuesta_empresa: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ResenaDetalleResponse(ResenaResponse):
    id_servicio: int
    nombre_servicio: str
    nombre_empresa: str
    id_usuario: int
    nombre_cliente: str
    fecha_hora: datetime
    estado: str


class ResenaRespuestaUpdate(BaseModel):
    respuesta_empresa: str = Field(min_length=1, max_length=2000)

    @field_validator("respuesta_empresa")
    @classmethod
    def validar_respuesta_no_vacia(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("La respuesta no puede estar vacía.")
        return value