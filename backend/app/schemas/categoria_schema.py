from pydantic import BaseModel, ConfigDict


class CategoriaBase(BaseModel):
    nombre_categoria: str
    descripcion_categoria: str | None = None


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaResponse(CategoriaBase):
    id_categoria: int

    model_config = ConfigDict(from_attributes=True)