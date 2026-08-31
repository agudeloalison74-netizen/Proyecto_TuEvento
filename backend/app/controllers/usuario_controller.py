from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.usuario import Usuario

from app.schemas.usuario_schema import UsuarioCreate

from app.schemas.auth_schema import (
    RegistroRequest,
    LoginRequest
)

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)


# =========================================================
# OBTENER TODOS LOS USUARIOS
# =========================================================

def obtener_usuarios(
    db: Session
):

    return (
        db.query(Usuario)
        .all()
    )


# =========================================================
# OBTENER USUARIO POR ID
# =========================================================

def obtener_usuario(
    db: Session,
    id_usuario: int
):

    return (
        db.query(Usuario)
        .filter(
            Usuario.id_usuario == id_usuario
        )
        .first()
    )


# =========================================================
# CREAR USUARIO
# =========================================================

def crear_usuario(
    db: Session,
    usuario: UsuarioCreate
):

    # -----------------------------------------------------
    # VERIFICAR SI EL CORREO YA EXISTE
    # -----------------------------------------------------

    usuario_existente = (
        db.query(Usuario)
        .filter(
            Usuario.correo_usuario
            == usuario.correo_usuario
        )
        .first()
    )

    if usuario_existente:

        return None


    # -----------------------------------------------------
    # CREAR USUARIO
    # -----------------------------------------------------

    nuevo_usuario = Usuario(

        nombre_usuario=usuario.nombre_usuario,

        apellido_usuario=usuario.apellido_usuario,

        correo_usuario=usuario.correo_usuario,

        telefono_usuario=usuario.telefono_usuario,

        contrasena_usuario=hash_password(
            usuario.contrasena_usuario
        ),

        rol=usuario.rol
    )


    # -----------------------------------------------------
    # GUARDAR
    # -----------------------------------------------------

    db.add(nuevo_usuario)

    db.commit()

    db.refresh(nuevo_usuario)


    return nuevo_usuario


# =========================================================
# REGISTRO
# =========================================================

def registrar_usuario(
    db: Session,
    datos: RegistroRequest
):

    # -----------------------------------------------------
    # VERIFICAR SI EL CORREO YA EXISTE
    # -----------------------------------------------------

    usuario_existente = (
        db.query(Usuario)
        .filter(
            Usuario.correo_usuario
            == datos.correo_usuario
        )
        .first()
    )

    if usuario_existente:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )


    # -----------------------------------------------------
    # CREAR USUARIO
    # -----------------------------------------------------

    nuevo_usuario = Usuario(

        nombre_usuario=datos.nombre_usuario,

        apellido_usuario=datos.apellido_usuario,

        correo_usuario=datos.correo_usuario,

        telefono_usuario=datos.telefono_usuario,

        contrasena_usuario=hash_password(
            datos.contrasena_usuario
        ),

        rol=datos.rol
    )


    # -----------------------------------------------------
    # GUARDAR EN BASE DE DATOS
    # -----------------------------------------------------

    db.add(nuevo_usuario)

    db.commit()

    db.refresh(nuevo_usuario)


    return nuevo_usuario


# =========================================================
# LOGIN
# =========================================================

def autenticar_usuario(
    db: Session,
    datos: LoginRequest
):

    # -----------------------------------------------------
    # BUSCAR USUARIO POR CORREO
    # -----------------------------------------------------

    usuario = (
        db.query(Usuario)
        .filter(
            Usuario.correo_usuario
            == datos.correo_usuario
        )
        .first()
    )


    # -----------------------------------------------------
    # VALIDAR USUARIO
    # -----------------------------------------------------

    if not usuario:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )


    # -----------------------------------------------------
    # VALIDAR CONTRASEÑA
    # -----------------------------------------------------

    if not usuario.contrasena_usuario:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El usuario no tiene una contraseña configurada"
        )


    if not verify_password(
        datos.contrasena_usuario,
        usuario.contrasena_usuario
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )


    # -----------------------------------------------------
    # CREAR TOKEN JWT
    # -----------------------------------------------------

    access_token = create_access_token(

        data={
            "sub": str(usuario.id_usuario),

            "rol": usuario.rol,

            "correo": usuario.correo_usuario
        }
    )


    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

def eliminar_usuario(
    db: Session,
    id_usuario: int
):
    usuario = (
        db.query(Usuario)
        .filter(Usuario.id_usuario == id_usuario)
        .first()
    )

    if not usuario:
        return None

    db.delete(usuario)
    db.commit()

    return usuario