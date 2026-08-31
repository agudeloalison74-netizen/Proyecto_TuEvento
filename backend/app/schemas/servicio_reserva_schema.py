from pydantic import BaseModel, ConfigDict


class ServicioReservaBase(BaseModel):
    id_reserva: int
    id_evento: int
    id_servicio: int


class ServicioReservaCreate(ServicioReservaBase):
    pass


class ServicioReservaResponse(ServicioReservaBase):

    model_config = ConfigDict(from_attributes=True)