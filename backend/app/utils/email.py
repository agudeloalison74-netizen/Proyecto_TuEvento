
import smtplib
from email.message import EmailMessage

from app.config.settings import (
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM,
    SMTP_USE_TLS,
    SMTP_USE_SSL
)


def enviar_correo(
    destinatario: str,
    asunto: str,
    mensaje: str
) -> None:

    if not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError(
            "Falta configurar el usuario o la contraseña SMTP"
        )

    if not SMTP_FROM:
        raise RuntimeError(
            "Falta configurar el correo remitente"
        )

    if SMTP_USE_TLS and SMTP_USE_SSL:
        raise RuntimeError(
            "No se puede activar TLS y SSL al mismo tiempo"
        )

    correo = EmailMessage()
    correo["Subject"] = asunto
    correo["From"] = SMTP_FROM
    correo["To"] = destinatario
    correo.set_content(mensaje)

    if SMTP_USE_SSL:
        with smtplib.SMTP_SSL(
            SMTP_HOST,
            SMTP_PORT,
            timeout=20
        ) as servidor:
            servidor.login(SMTP_USER, SMTP_PASSWORD)
            servidor.send_message(correo)

    else:
        with smtplib.SMTP(
            SMTP_HOST,
            SMTP_PORT,
            timeout=20
        ) as servidor:

            if SMTP_USE_TLS:
                servidor.starttls()

            servidor.login(SMTP_USER, SMTP_PASSWORD)
            servidor.send_message(correo)
