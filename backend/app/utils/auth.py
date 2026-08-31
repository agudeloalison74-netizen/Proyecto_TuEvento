from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.usuario import Usuario
from app.utils.security import decode_access_token


# =========================================================
# ESQUEMA DE AUTENTICACIÓN
# =========================================================

security = HTTPBearer()


# =========================================================
# OBTENER USUARIO AUTENTICADO
# =========================================================

def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),

    db: Session = Depends(get_db)

):

    token = credentials.credentials


    # -----------------------------------------------------
    # DECODIFICAR TOKEN
    # -----------------------------------------------------

    payload = decode_access_token(token)


    if not payload:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )


    # -----------------------------------------------------
    # OBTENER ID DEL USUARIO
    # -----------------------------------------------------

    user_id = payload.get("sub")


    if not user_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )


    # -----------------------------------------------------
    # BUSCAR USUARIO
    # -----------------------------------------------------

    usuario = (
        db.query(Usuario)
        .filter(
            Usuario.id_usuario == int(user_id)
        )
        .first()
    )


    if not usuario:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado"
        )


    return usuario