# app/config.py

import os
from dotenv import load_dotenv
<<<<<<< HEAD
from sqlalchemy.pool import NullPool   # 👈 IMPORTANT

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")

if os.path.exists(ENV_PATH):
=======

# Load environment variables from .env
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")
if os.path.exists(ENV_PATH):
    # 👇 IMPORTANT: allow .env to override system env vars
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    load_dotenv(ENV_PATH, override=True)


class Config:
    raw_db_url = os.getenv("DATABASE_URL", "")
    if raw_db_url.startswith("postgres://"):
        raw_db_url = raw_db_url.replace("postgres://", "postgresql://", 1)

<<<<<<< HEAD
=======
    # 🔍 DEBUG (optional while testing)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    print(
        "Using DB URL:",
        "postgresql://***:***@" + raw_db_url.split("@", 1)[1] if raw_db_url else "MISSING"
    )

    SQLALCHEMY_DATABASE_URI = raw_db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False

<<<<<<< HEAD
    # ✅ FIX: Disable SQLAlchemy pool (Supabase Pooler handles it)
    SQLALCHEMY_ENGINE_OPTIONS = {
        "poolclass": NullPool,      # 🔥 THIS LINE FIXES THE ERROR
        "connect_args": {
            "sslmode": "require",
        },
=======
    # 🚀 More robust DB handling for Supabase / remote Postgres
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "sslmode": "require",   # ensure SSL for Supabase
        },
        "pool_pre_ping": True,      # test connection before using it, auto-reconnect if dead
        "pool_recycle": 300,        # recycle connections every 5 minutes
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    }

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-this")
