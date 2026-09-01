from pydantic import BaseModel, ConfigDict


class DepartamentoBase(BaseModel):
    nombre_departamento: str


class DepartamentoCreate(DepartamentoBase):
    pass


class DepartamentoResponse(DepartamentoBase):
    id_departamento: int

    model_config = ConfigDict(from_attributes=True)