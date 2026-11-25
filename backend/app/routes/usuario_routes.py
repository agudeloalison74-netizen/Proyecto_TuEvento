from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db

from pydantic import BaseModel, EmailStr

from app.controllers.usuario_controller import (
    obtener_usuarios,
    obtener_usuario,
    crear_usuario,
    registrar_usuario as registrar_usuario_controller,
    autenticar_usuario,
    eliminar_usuario,
    solicitar_recuperacion_contrasena,
    verificar_codigo_recuperacion,
    cambiar_contrasena,
    actualizar_perfil_usuario,
    restablecer_contrasena
)

from app.schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioResponse,
    UsuarioPerfilUpdate
)

from app.schemas.auth_schema import (
    RegistroRequest,
    LoginRequest,
    TokenResponse,
    RecuperarContrasenaRequest,
    CambioContrasenaRequest,
    RestablecerContrasenaRequest
)

from app.utils.security import get_admin_user, get_current_user


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

class VerificarCodigoRequest(BaseModel):
    correo_usuario: EmailStr
    codigo: str


@router.post("/auth/verificar-codigo")
def verificar_codigo_route(
    datos: VerificarCodigoRequest,
    db: Session = Depends(get_db)
):
    return verificar_codigo_recuperacion(db, str(datos.correo_usuario), datos.codigo)

# =========================================================
# LISTAR USUARIOS
# =========================================================

@router.get(
    "/",
    response_model=list[UsuarioResponse]
)
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):

    return obtener_usuarios(db)


# =========================================================
# BUSCAR USUARIO
# =========================================================

@router.get(
    "/me",
    response_model=UsuarioResponse
)
def obtener_mi_perfil(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_current_user)
):
    try:
        id_usuario = int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error

    usuario = obtener_usuario(db, id_usuario)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    return usuario


@router.put(
    "/me",
    response_model=UsuarioResponse
)
def actualizar_mi_perfil(
    datos: UsuarioPerfilUpdate,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_current_user)
):
    try:
        id_usuario = int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error

    return actualizar_perfil_usuario(db, id_usuario, datos)


@router.put(
    "/{id_usuario}",
    response_model=UsuarioResponse
)
def actualizar_usuario(
    id_usuario: int,
    datos: UsuarioPerfilUpdate,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):
    return actualizar_perfil_usuario(db, id_usuario, datos)


@router.get(
    "/{id_usuario}",
    response_model=UsuarioResponse
)
def buscar_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    usuario = obtener_usuario(
        db,
        id_usuario
    )

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return usuario


# =========================================================
# CREAR USUARIO
# =========================================================

@router.post(
    "/",
    response_model=UsuarioResponse,
    status_code=201
)
def crear_usuario_endpoint(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    nuevo_usuario = crear_usuario(
        db,
        usuario
    )

    if nuevo_usuario is None:

        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    return nuevo_usuario


# =========================================================
# REGISTRO
# =========================================================

@router.post(
    "/auth/registro",
    response_model=UsuarioResponse,
    status_code=201
)
def registro(

    datos: RegistroRequest,

    db: Session = Depends(get_db)

):

    return registrar_usuario_controller(
        db,
        datos
    )


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/auth/login",
    response_model=TokenResponse
)
def login(

    datos: LoginRequest,

    db: Session = Depends(get_db)

):

    return autenticar_usuario(
        db,
        datos
    )


@router.post("/auth/recuperar-contrasena")
def recuperar_contrasena(
    datos: RecuperarContrasenaRequest,
    db: Session = Depends(get_db)
):
    return solicitar_recuperacion_contrasena(db, datos)


@router.post("/auth/restablecer-contrasena")
def restablecer_contrasena_route(
    datos: RestablecerContrasenaRequest,
    db: Session = Depends(get_db)
):
    return restablecer_contrasena(db, datos)


@router.put("/me/contrasena")
def actualizar_contrasena(
    datos: CambioContrasenaRequest,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_current_user)
):
    try:
        id_usuario = int(usuario_actual["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no identifica una cuenta válida."
        ) from error

    return cambiar_contrasena(db, id_usuario, datos)


@router.delete(
    "/{id_usuario}",
    status_code=204
)
def eliminar_usuario_route(
    id_usuario: int,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_admin_user)
):
    if str(usuario_actual.get("sub")) == str(id_usuario):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes eliminar tu propia cuenta de administrador."
        )

    usuario = eliminar_usuario(
        db,
        id_usuario
    )

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )
