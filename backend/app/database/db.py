<<<<<<< HEAD
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
=======
# app/database/db.py

# Re-export the single global db instance defined in app/__init__.py
from app import db
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
