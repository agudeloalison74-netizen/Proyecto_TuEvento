from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ServicioBase(BaseModel):
    nombre_servicio: str
    descripcion_servicio: str
    precio_referencia: Decimal | None = None
    id_empresa: str


class ServicioCreate(ServicioBase):
    pass


class ServicioResponse(ServicioBase):
    id_servicio: int

    model_config = ConfigDict(from_attributes=True)