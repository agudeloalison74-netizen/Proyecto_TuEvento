from pydantic import BaseModel, ConfigDict


class ServicioEventoBase(BaseModel):
    id_servicio: int
    id_evento: int


class ServicioEventoCreate(ServicioEventoBase):
    pass


class ServicioEventoResponse(ServicioEventoBase):

    model_config = ConfigDict(from_attributes=True)