from pydantic import BaseModel, ConfigDict


class EventoBase(BaseModel):
    nombre_evento: str
    descripcion_evento: str | None = None
    id_empresa: str
    id_categoria: int


class EventoCreate(EventoBase):
    pass


class EventoResponse(EventoBase):
    id_evento: int

    model_config = ConfigDict(from_attributes=True)