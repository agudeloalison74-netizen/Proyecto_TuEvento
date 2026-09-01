from datetime import date

from pydantic import BaseModel, ConfigDict


class ResenaBase(BaseModel):
    fecha_resena: date
    descripcion_resena: str | None = None
    id_reserva: int


class ResenaCreate(ResenaBase):
    pass


class ResenaResponse(ResenaBase):
    id_resena: int

    model_config = ConfigDict(from_attributes=True)