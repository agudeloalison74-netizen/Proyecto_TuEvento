from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


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


class UsuarioPerfilUpdate(BaseModel):
    nombre_usuario: str = Field(min_length=1, max_length=100)
    apellido_usuario: str = Field(min_length=1, max_length=100)
    telefono_usuario: str = Field(min_length=1, max_length=30)

    @field_validator(
        "nombre_usuario",
        "apellido_usuario",
        "telefono_usuario"
    )
    @classmethod
    def validar_valor_no_vacio(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Este campo no puede estar vacío.")
        return value
