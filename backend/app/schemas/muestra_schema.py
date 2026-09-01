from pydantic import BaseModel, ConfigDict


class MuestraBase(BaseModel):
    descripcion_muestra: str | None = None
    url: str | None = None
    id_servicio: int


class MuestraCreate(MuestraBase):
    pass


class MuestraResponse(MuestraBase):
    id_muestra: int

    model_config = ConfigDict(from_attributes=True)