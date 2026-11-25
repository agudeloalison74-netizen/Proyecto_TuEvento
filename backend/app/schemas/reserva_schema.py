from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ReservaBase(BaseModel):
    id_usuario: int
    id_servicio: int
    fecha_hora: datetime
    estado: str
    precio_total: Decimal
    tipo_evento: str | None = None
    cantidad_personas: int | None = Field(default=None, ge=1)
    mensaje: str | None = None


class ReservaCreate(ReservaBase):
    estado: Literal["PENDIENTE"] = "PENDIENTE"


class ReservaEstadoUpdate(BaseModel):
    estado: Literal["ACEPTADA", "RECHAZADA"]


class ReservaResponse(ReservaBase):
    id_reserva: int

    model_config = ConfigDict(from_attributes=True)


class ReservaDetalleResponse(ReservaResponse):
    nombre_servicio: str
    descripcion_servicio: str
    nombre_empresa: str
    id_resena: int | None = None
    calificacion: int | None = None
    nombre_cliente: str | None = None
    correo_cliente: str | None = None
