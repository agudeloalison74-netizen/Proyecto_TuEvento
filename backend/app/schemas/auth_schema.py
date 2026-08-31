from pydantic import BaseModel, EmailStr


# =========================================================
# REGISTRO
# =========================================================

class RegistroRequest(BaseModel):

    nombre_usuario: str

    apellido_usuario: str

    correo_usuario: EmailStr

    telefono_usuario: str

    contrasena_usuario: str

    rol: str


# =========================================================
# LOGIN
# =========================================================

class LoginRequest(BaseModel):

    correo_usuario: EmailStr

    contrasena_usuario: str


# =========================================================
# RESPUESTA LOGIN
# =========================================================

class TokenResponse(BaseModel):

    access_token: str

    token_type: str


# =========================================================
# RESPUESTA USUARIO AUTENTICADO
# =========================================================

class UsuarioAuthResponse(BaseModel):

    id_usuario: int

    nombre_usuario: str

    apellido_usuario: str

    correo_usuario: EmailStr

    telefono_usuario: str

    rol: str