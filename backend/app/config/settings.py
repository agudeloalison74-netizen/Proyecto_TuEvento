import os

from dotenv import load_dotenv


load_dotenv()


# =========================================================
# BASE DE DATOS
# =========================================================

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)


if not DATABASE_URL:

    raise ValueError(
        "Falta la variable DATABASE_URL"
    )


# =========================================================
# JWT
# =========================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)


if not SECRET_KEY:

    raise ValueError(
        "Falta la variable SECRET_KEY"
    )