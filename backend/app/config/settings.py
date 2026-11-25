
import os

from dotenv import load_dotenv


load_dotenv()


# =========================================================
# BASE DE DATOS
# =========================================================

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("Falta la variable DATABASE_URL")


# =========================================================
# JWT
# =========================================================

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("Falta la variable SECRET_KEY")


# =========================================================
# CORREO ELECTRÓNICO (SMTP)
# =========================================================

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)

SMTP_USE_TLS = os.getenv(
    "SMTP_USE_TLS", "true"
).lower() == "true"

SMTP_USE_SSL = os.getenv(
    "SMTP_USE_SSL", "false"
).lower() == "true"
