from pydantic import BaseModel, ConfigDict, EmailStr


class UsuarioBase(BaseModel):
    nombre_usuario: str
    apellido_usuario: str
    correo_usuario: EmailStr
    telefono_usuario: str
    rol: str


class UsuarioCreate(UsuarioBase):
    contrasena_usuario: str


class UsuarioResponse(UsuarioBase):
    id_usuario: int

    model_config = ConfigDict(from_attributes=True)