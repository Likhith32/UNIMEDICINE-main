<<<<<<< HEAD
from datetime import datetime
from app.database.db import db
=======
# app/models/user.py

from datetime import datetime
from app import db   # or: from app.database.db import db
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
<<<<<<< HEAD
    level = db.Column(db.String(10), nullable=False)  # UG / PG
    branch = db.Column(db.String(100))
    year = db.Column(db.Integer)
    department = db.Column(db.String(100))
=======
    level = db.Column(db.String(10), nullable=False)         # UG or PG
    branch = db.Column(db.String(100), nullable=True)        # UG only
    year = db.Column(db.Integer, nullable=True)              # UG only
    department = db.Column(db.String(100), nullable=True)    # PG only
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    hostel = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    consultations = db.relationship(
        "Consultation",
        back_populates="student",
<<<<<<< HEAD
        cascade="all, delete-orphan"
    )

    push_subscriptions = db.relationship(
        "PushSubscription",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.name}>"
=======
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<User {self.name} ({self.level})>"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
