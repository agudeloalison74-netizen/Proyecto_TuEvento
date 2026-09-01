from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.usuario_controller import (
    obtener_usuarios,
    obtener_usuario,
    crear_usuario,
    registrar_usuario as registrar_usuario_controller,
    autenticar_usuario,
    eliminar_usuario
)

from app.schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioResponse
)

from app.schemas.auth_schema import (
    RegistroRequest,
    LoginRequest,
    TokenResponse
)

from app.utils.security import get_current_user


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


# =========================================================
# LISTAR USUARIOS
# =========================================================

@router.get(
    "/",
    response_model=list[UsuarioResponse]
)
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(get_current_user)
):

    return obtener_usuarios(db)


# =========================================================
# BUSCAR USUARIO
# =========================================================

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

@router.delete(
    "/{id_usuario}",
    status_code=204
)
def eliminar_usuario_route(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    usuario = eliminar_usuario(
        db,
        id_usuario
    )

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )