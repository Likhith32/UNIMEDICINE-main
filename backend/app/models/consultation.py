<<<<<<< HEAD
from datetime import datetime
from sqlalchemy import Enum
from app.database.db import db

=======
# app/models/consultation.py

from datetime import datetime
from app.database.db import db


>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
class Consultation(db.Model):
    __tablename__ = "consultations"

    id = db.Column(db.Integer, primary_key=True)

<<<<<<< HEAD
    student_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("doctors.id"),
        nullable=False
    )

    status = db.Column(
        Enum("open", "closed", "cancelled", name="consultation_status"),
        default="open",
        nullable=False
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ THIS WAS MISSING (CRITICAL)
    student = db.relationship(
        "User",
        back_populates="consultations"
    )

    # ✅ THIS WAS MISSING (CRITICAL)
    doctor = db.relationship(
        "Doctor",
        back_populates="consultations"
    )

    messages = db.relationship(
        "Message",
        back_populates="consultation",
        cascade="all, delete-orphan"
    )
=======
    # Foreign keys
    student_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)

    status = db.Column(db.String(20), default="open")  # "open" or "closed"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    closed_at = db.Column(db.DateTime, nullable=True)

    # Relationships (back_populates must match in User & Doctor models)
    student = db.relationship("User", back_populates="consultations")
    doctor = db.relationship("Doctor", back_populates="consultations")
    messages = db.relationship(
        "Message",
        back_populates="consultation",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<Consultation student_id={self.student_id} doctor_id={self.doctor_id} status={self.status}>"



class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)

    consultation_id = db.Column(
        db.Integer,
        db.ForeignKey("consultations.id"),
        nullable=False,
    )

    sender_type = db.Column(db.String(20), nullable=False)  # "student" | "doctor" | "ai"
    sender_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship back to Consultation
    consultation = db.relationship("Consultation", back_populates="messages")

    def __repr__(self):
        return f"<Message id={self.id} sender_type={self.sender_type}>"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
