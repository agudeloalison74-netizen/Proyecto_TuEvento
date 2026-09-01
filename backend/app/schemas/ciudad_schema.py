from pydantic import BaseModel, ConfigDict


class CiudadBase(BaseModel):
    nombre_ciudad: str
    id_departamento: int


class CiudadCreate(CiudadBase):
    pass


class CiudadResponse(CiudadBase):
    id_ciudad: int

    model_config = ConfigDict(from_attributes=True)