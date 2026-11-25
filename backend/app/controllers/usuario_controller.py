import hashlib
import hmac
import logging
import secrets
import smtplib
import time

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.usuario import Usuario
from app.models.recuperacion_contrasena import RecuperacionContrasena

from app.schemas.usuario_schema import UsuarioCreate, UsuarioPerfilUpdate

from app.schemas.auth_schema import (
    RegistroRequest,
    LoginRequest,
    RecuperarContrasenaRequest,
    RestablecerContrasenaRequest,
    CambioContrasenaRequest
)

from app.config.settings import SECRET_KEY

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.utils.email import enviar_correo


logger = logging.getLogger(__name__)
CODIGO_RECUPERACION_VIDA_SEGUNDOS = 600
MAX_INTENTOS_CODIGO = 5
ESPERA_ENTRE_CODIGOS_SEGUNDOS = 60


def _hash_codigo(correo: str, codigo: str) -> str:
    mensaje = f"{correo.lower()}:{codigo}".encode("utf-8")
    return hmac.new(
        SECRET_KEY.encode("utf-8"),
        mensaje,
        hashlib.sha256
    ).hexdigest()


def solicitar_recuperacion_contrasena(
    db: Session,
    datos: RecuperarContrasenaRequest
):
    correo = str(datos.correo_usuario)
    usuario = (
        db.query(Usuario)
        .filter(Usuario.correo_usuario == correo)
        .first()
    )

    if usuario:
        recuperacion = (
            db.query(RecuperacionContrasena)
            .filter(
                RecuperacionContrasena.correo_usuario == correo
            )
            .first()
        )
        ahora = time.time()

        if (
            recuperacion
            and recuperacion.expira_en
            - CODIGO_RECUPERACION_VIDA_SEGUNDOS
            + ESPERA_ENTRE_CODIGOS_SEGUNDOS
            > ahora
        ):
            return {
                "mensaje": (
                    "Si el correo está registrado, recibirás un código "
                    "de verificación."
                )
            }

        codigo = f"{secrets.randbelow(1_000_000):06d}"

        if recuperacion:
            recuperacion.codigo_hash = _hash_codigo(correo, codigo)
            recuperacion.expira_en = (
                ahora + CODIGO_RECUPERACION_VIDA_SEGUNDOS
            )
            recuperacion.intentos = 0
        else:
            recuperacion = RecuperacionContrasena(
                correo_usuario=correo,
                codigo_hash=_hash_codigo(correo, codigo),
                expira_en=(
                    ahora + CODIGO_RECUPERACION_VIDA_SEGUNDOS
                ),
                intentos=0
            )
            db.add(recuperacion)

        db.commit()

        try:
            enviar_correo(
                correo,
                "Código para recuperar tu contraseña - TuEvento",
                (
                    f"Tu código de verificación es: {codigo}\n\n"
                    "Este código vence en 10 minutos y solo puede usarse "
                    "una vez. Si no solicitaste este cambio, ignora este "
                    "mensaje."
                )
            )
        except RuntimeError as error:
            logger.exception(
                "No fue posible enviar el código de recuperación a %s",
                correo
            )
            db.delete(recuperacion)
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=(
                    "El correo de recuperación no está configurado "
                    "correctamente en el servidor."
                )
            ) from error
        except (smtplib.SMTPException, OSError) as error:
            logger.exception(
                "No fue posible enviar el código de recuperación a %s",
                correo
            )
            db.delete(recuperacion)
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="No fue posible enviar el correo. Intenta más tarde."
            ) from error

    return {
        "mensaje": (
            "Si el correo está registrado, recibirás un código "
            "de verificación."
        )
    }


def restablecer_contrasena(
    db: Session,
    datos: RestablecerContrasenaRequest
):
    correo = str(datos.correo_usuario)

    recuperacion = (
        db.query(RecuperacionContrasena)
        .filter(
            RecuperacionContrasena.correo_usuario == correo
        )
        .first()
    )

    if not recuperacion:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    if recuperacion.expira_en <= time.time():
        db.delete(recuperacion)
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    codigo_correcto = hmac.compare_digest(
        recuperacion.codigo_hash,
        _hash_codigo(correo, datos.codigo)
    )

    if not codigo_correcto:
        recuperacion.intentos += 1

        if recuperacion.intentos >= MAX_INTENTOS_CODIGO:
            db.delete(recuperacion)

        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    usuario = (
        db.query(Usuario)
        .filter(Usuario.correo_usuario == correo)
        .first()
    )

    if not usuario:
        db.delete(recuperacion)
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    usuario.contrasena_usuario = hash_password(
        datos.contrasena_nueva
    )

    # El código se elimina para que no pueda volver a usarse.
    db.delete(recuperacion)
    db.commit()

    return {
        "mensaje": "La contraseña se cambió correctamente."
    }

def verificar_codigo_recuperacion(
    db: Session,
    correo_usuario: str,
    codigo: str
):
    correo = str(correo_usuario)
    recuperacion = (
        db.query(RecuperacionContrasena)
        .filter(RecuperacionContrasena.correo_usuario == correo)
        .first()
    )

    if not recuperacion:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    if recuperacion.expira_en <= time.time():
        db.delete(recuperacion)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    codigo_correcto = hmac.compare_digest(
        recuperacion.codigo_hash,
        _hash_codigo(correo, codigo)
    )

    if not codigo_correcto:
        recuperacion.intentos += 1
        if recuperacion.intentos >= MAX_INTENTOS_CODIGO:
            db.delete(recuperacion)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    usuario = (
        db.query(Usuario)
        .filter(Usuario.correo_usuario == correo)
        .first()
    )
    if not usuario:
        db.delete(recuperacion)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código no es válido o ya venció."
        )

    contrasena_temporal = secrets.token_urlsafe(10)
    usuario.contrasena_usuario = hash_password(contrasena_temporal)
    db.delete(recuperacion)
    db.commit()

    enviar_correo(
        correo,
        "Nueva contraseña temporal - TuEvento",
        f"Tu nueva contraseña temporal es: {contrasena_temporal}"
    )

    return {"mensaje": "Código verificado y contraseña temporal enviada."}

def cambiar_contrasena(
    db: Session,
    id_usuario: int,
    datos: CambioContrasenaRequest
):
    usuario = (
        db.query(Usuario)
        .filter(Usuario.id_usuario == id_usuario)
        .first()
    )

    if not usuario or not usuario.contrasena_usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la cuenta."
        )

    if not verify_password(
        datos.contrasena_actual,
        usuario.contrasena_usuario
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña actual es incorrecta."
        )

    if datos.contrasena_actual == datos.contrasena_nueva:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña debe ser diferente."
        )

    usuario.contrasena_usuario = hash_password(datos.contrasena_nueva)
    db.commit()

    return {"mensaje": "La contraseña se actualizó correctamente."}


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


def actualizar_perfil_usuario(
    db: Session,
    id_usuario: int,
    datos: UsuarioPerfilUpdate
):
    usuario = obtener_usuario(db, id_usuario)

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    usuario.nombre_usuario = datos.nombre_usuario.strip()
    usuario.apellido_usuario = datos.apellido_usuario.strip()
    usuario.telefono_usuario = datos.telefono_usuario.strip()
    db.commit()
    db.refresh(usuario)

    return usuario


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
