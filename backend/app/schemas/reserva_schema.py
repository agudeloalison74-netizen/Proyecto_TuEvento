from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ReservaBase(BaseModel):
    id_usuario: int
    id_servicio: int
    fecha_hora: datetime
    estado: str
    precio_total: Decimal


class ReservaCreate(ReservaBase):
    pass


class ReservaResponse(ReservaBase):
    id_reserva: int

    model_config = ConfigDict(from_attributes=True)