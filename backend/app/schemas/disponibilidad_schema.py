from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DisponibilidadBase(BaseModel):
    fecha_hora: datetime
    estado: str
    id_servicio: int | None = None


class DisponibilidadCreate(DisponibilidadBase):
    pass


class DisponibilidadResponse(DisponibilidadBase):
    id_disponibilidad: int

    model_config = ConfigDict(from_attributes=True)