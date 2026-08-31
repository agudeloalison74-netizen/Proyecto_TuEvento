from pydantic import BaseModel, ConfigDict


class EmpresaBase(BaseModel):

    id_empresa: str
    nombre_empresa: str
    descripcion_empresa: str | None = None
    contacto_empresa: str | None = None
    direccion_empresa: str | None = None
    id_ciudad: int
    id_usuario: int


class EmpresaCreate(EmpresaBase):
    pass


class EmpresaResponse(EmpresaBase):

    model_config = ConfigDict(
        from_attributes=True
    )