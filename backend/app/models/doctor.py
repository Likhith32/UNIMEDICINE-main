<<<<<<< HEAD
=======
# doctor.py placeholder
# app/models/doctor.py

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
from datetime import datetime
from app.database.db import db


class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
<<<<<<< HEAD
    specialization = db.Column(db.String(120))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

=======
    specialization = db.Column(db.String(120), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    consultations = db.relationship(
        "Consultation",
        back_populates="doctor",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
<<<<<<< HEAD
        return f"<Doctor {self.name}>"
=======
        return f"<Doctor {self.name} ({self.specialization})>"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
