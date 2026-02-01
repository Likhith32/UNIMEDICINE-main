from datetime import datetime
<<<<<<< HEAD
from flask import Blueprint, request, jsonify

from app.socket import socketio
from app.database.db import db

from app.models.user import User
from app.models.doctor import Doctor
from app.models.consultation import Consultation
from app.models.message import Message

from app.utils.security import decode_access_token

doctor_bp = Blueprint("doctor", __name__)
# Registered with url_prefix="/api/doctor"

# ======================================================
# AUTH HELPERS
# ======================================================

def _get_current_identity():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None, None, (jsonify({"error": "Authorization header missing"}), 401)

    token = auth_header.split(" ", 1)[1]
=======

from flask import Blueprint, request, jsonify

from app.database.db import db
from app.models.user import User            # ✅ your student model
from app.models.doctor import Doctor        # ✅ your doctor model
from app.models.consultation import Consultation, Message
from app.utils.security import decode_access_token

doctor_bp = Blueprint("doctor", __name__)



# --------- Helpers --------- #
def _get_current_identity():
    """
    Read JWT and return (role, obj, error_response)
    role: "student" or "doctor"
    obj:  User or Doctor instance
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None, None, (jsonify({"error": "Authorization header missing or invalid."}), 401)

    token = auth_header.split(" ", 1)[1].strip()
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    try:
        payload = decode_access_token(token)
    except Exception:
<<<<<<< HEAD
        return None, None, (jsonify({"error": "Invalid or expired token"}), 401)
=======
        return None, None, (jsonify({"error": "Invalid or expired token."}), 401)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    role = payload.get("role")
    user_id = payload.get("sub")

    if role == "student":
        user = User.query.get(user_id)
        if not user:
<<<<<<< HEAD
            return None, None, (jsonify({"error": "Student not found"}), 404)
        return "student", user, None

    if role == "doctor":
        doctor = Doctor.query.get(user_id)
        if not doctor:
            return None, None, (jsonify({"error": "Doctor not found"}), 404)
        return "doctor", doctor, None

    return None, None, (jsonify({"error": "Invalid role"}), 400)


def _consultation_visible_to(consultation, role, identity):
    if role == "student":
        return consultation.student_id == identity.id
    return consultation.doctor_id == identity.id


# ======================================================
# DOCTORS LIST
# ======================================================

@doctor_bp.route("/doctors", methods=["GET"])
def list_doctors():
    doctors = Doctor.query.filter_by(is_active=True).order_by(Doctor.name.asc()).all()

    return jsonify([
        {
            "id": d.id,
            "name": d.name,
            "specialization": d.specialization,
        }
        for d in doctors
    ]), 200


# ======================================================
# CONSULTATIONS
# ======================================================

@doctor_bp.route("/consultations", methods=["POST"])
def start_or_get_consultation():
    role, identity, error = _get_current_identity()
    if error:
        return error

    if role != "student":
        return jsonify({"error": "Only students can start consultations"}), 403

    doctor_id = (request.get_json() or {}).get("doctor_id")
    if not doctor_id:
        return jsonify({"error": "doctor_id is required"}), 400

    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

=======
            return None, None, (jsonify({"error": "Student not found."}), 404)
        return "student", user, None

    elif role == "doctor":
        doctor = Doctor.query.get(user_id)
        if not doctor:
            return None, None, (jsonify({"error": "Doctor not found."}), 404)
        return "doctor", doctor, None

    else:
        return None, None, (jsonify({"error": "Unknown role in token."}), 400)


def _consultation_visible_to(consultation, role, identity_obj):
    """
    Check if the consultation belongs to this student or doctor.
    """
    if role == "student":
        return consultation.student_id == identity_obj.id
    if role == "doctor":
        return consultation.doctor_id == identity_obj.id
    return False


# --------- Routes --------- #

@doctor_bp.route("/consultations", methods=["POST"])
def start_or_get_consultation():
    """
    Student starts or reopens a consultation with a doctor.
    - Only students allowed.
    - If an open consultation already exists, return that.

    Request JSON:
    { "doctor_id": 1 }

    Response:
    {
      "id": 5,
      "status": "open",
      "student_id": ...,
      "doctor_id": ...
    }
    """
    role, identity, error_response = _get_current_identity()
    if error_response:
        return error_response

    if role != "student":
        return jsonify({"error": "Only students can start consultations."}), 403

    data = request.get_json() or {}
    doctor_id = data.get("doctor_id")

    if not doctor_id:
        return jsonify({"error": "doctor_id is required."}), 400

    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({"error": "Doctor not found."}), 404

    # Check for existing open consultation
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    existing = Consultation.query.filter_by(
        student_id=identity.id,
        doctor_id=doctor.id,
        status="open",
    ).first()

<<<<<<< HEAD
    if existing:
        return jsonify({
            "id": existing.id,
            "created": False
        }), 200

    consultation = Consultation(
        student_id=identity.id,
        doctor_id=doctor.id,
        status="open",
        created_at=datetime.utcnow(),
    )

    db.session.add(consultation)
    db.session.commit()

    return jsonify({
        "id": consultation.id,
        "created": True
    }), 201
=======
    cons = existing
    created = False

    if not cons:
        cons = Consultation(
            student_id=identity.id,
            doctor_id=doctor.id,
            status="open",
            created_at=datetime.utcnow(),
            closed_at=None,
        )
        db.session.add(cons)
        db.session.commit()
        created = True

    return jsonify(
        {
            "id": cons.id,
            "student_id": cons.student_id,
            "doctor_id": cons.doctor_id,
            "status": cons.status,
            "created": created,
        }
    ), 201 if created else 200
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213


@doctor_bp.route("/consultations", methods=["GET"])
def list_consultations():
<<<<<<< HEAD
    role, identity, error = _get_current_identity()
    if error:
        return error

    query = Consultation.query
    if role == "student":
        query = query.filter_by(student_id=identity.id)
    else:
        query = query.filter_by(doctor_id=identity.id)

    consultations = query.order_by(Consultation.created_at.desc()).all()

    return jsonify([
        {
            "id": c.id,
            "student_id": c.student_id,
            "doctor_id": c.doctor_id,
            "status": c.status,
            "created_at": c.created_at.isoformat(),
        }
        for c in consultations
    ]), 200


# ======================================================
# MESSAGES
# ======================================================

@doctor_bp.route("/consultations/<int:consultation_id>/messages", methods=["GET"])
def get_messages(consultation_id):
    role, identity, error = _get_current_identity()
    if error:
        return error

    consultation = Consultation.query.get(consultation_id)
    if not consultation:
        return jsonify({"error": "Consultation not found"}), 404

    if not _consultation_visible_to(consultation, role, identity):
        return jsonify({"error": "Not allowed"}), 403

    messages = Message.query.filter_by(
        consultation_id=consultation.id
    ).order_by(Message.created_at.asc()).all()

    return jsonify([
        {
            "id": m.id,
            "sender_type": m.sender_role,
            "sender_id": m.sender_id,
            "content": m.content,
            "created_at": m.created_at.isoformat(),
        }
        for m in messages
    ]), 200
=======
    """
    List consultations for the current user.
    - If student: list their consultations with doctors.
    - If doctor: list consultations assigned to them.

    Optional query: ?status=open|closed
    """
    role, identity, error_response = _get_current_identity()
    if error_response:
        return error_response

    status = request.args.get("status")
    query = Consultation.query

    if role == "student":
        query = query.filter_by(student_id=identity.id)
    elif role == "doctor":
        query = query.filter_by(doctor_id=identity.id)
    else:
        return jsonify({"error": "Unknown role."}), 400

    if status in ("open", "closed"):
        query = query.filter_by(status=status)

    consultations = query.order_by(Consultation.created_at.desc()).all()

    result = []
    for c in consultations:
        result.append(
            {
                "id": c.id,
                "student_id": c.student_id,
                "doctor_id": c.doctor_id,
                "status": c.status,
                "created_at": c.created_at.isoformat() if c.created_at else None,
                "closed_at": c.closed_at.isoformat() if c.closed_at else None,
            }
        )

    return jsonify(result), 200


@doctor_bp.route("/consultations/<int:consultation_id>/messages", methods=["GET"])
def get_messages(consultation_id):
    """
    Get messages for a consultation.
    - Only student or doctor involved can see.
    """
    role, identity, error_response = _get_current_identity()
    if error_response:
        return error_response

    consultation = Consultation.query.get(consultation_id)
    if not consultation:
        return jsonify({"error": "Consultation not found."}), 404

    if not _consultation_visible_to(consultation, role, identity):
        return jsonify({"error": "Not allowed to view this consultation."}), 403

    messages = (
        Message.query.filter_by(consultation_id=consultation.id)
        .order_by(Message.created_at.asc())
        .all()
    )

    result = []
    for m in messages:
        result.append(
            {
                "id": m.id,
                "sender_type": m.sender_type,  # "student" or "doctor"
                "sender_id": m.sender_id,
                "content": m.content,
                "created_at": m.created_at.isoformat() if m.created_at else None,
            }
        )

    return jsonify(result), 200
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213


@doctor_bp.route("/consultations/<int:consultation_id>/messages", methods=["POST"])
def send_message(consultation_id):
<<<<<<< HEAD
    role, identity, error = _get_current_identity()
    if error:
        return error

    consultation = Consultation.query.get(consultation_id)
    if not consultation or consultation.status != "open":
        return jsonify({"error": "Consultation unavailable"}), 400

    if not _consultation_visible_to(consultation, role, identity):
        return jsonify({"error": "Not allowed"}), 403

    content = (request.get_json() or {}).get("content", "").strip()
    if not content:
        return jsonify({"error": "Message content required"}), 400

    message = Message(
        consultation_id=consultation.id,
        sender_role=role,
=======
    """
    Send a message in a consultation.
    - Student or doctor can send.

    Request JSON:
    { "content": "Hello doctor..." }
    """
    role, identity, error_response = _get_current_identity()
    if error_response:
        return error_response

    consultation = Consultation.query.get(consultation_id)
    if not consultation:
        return jsonify({"error": "Consultation not found."}), 404

    if consultation.status != "open":
        return jsonify({"error": "Consultation is closed."}), 400

    if not _consultation_visible_to(consultation, role, identity):
        return jsonify({"error": "Not allowed to send messages in this consultation."}), 403

    data = request.get_json() or {}
    content = (data.get("content") or "").strip()
    if not content:
        return jsonify({"error": "Content is required."}), 400

    message = Message(
        consultation_id=consultation.id,
        sender_type=role,          # "student" or "doctor"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        sender_id=identity.id,
        content=content,
        created_at=datetime.utcnow(),
    )

    db.session.add(message)
    db.session.commit()

<<<<<<< HEAD
    # ✅ REAL-TIME EMIT (NO broadcast)
    socketio.emit(
        "new_message",
        {
            "id": message.id,
            "consultation_id": consultation.id,
            "sender_type": message.sender_role,
            "sender_id": message.sender_id,
            "content": message.content,
            "created_at": message.created_at.isoformat(),
        },
        room=f"consultation_{consultation.id}"
    )

    return jsonify({
        "id": message.id,
        "sender_type": message.sender_role,
        "sender_id": message.sender_id,
        "content": message.content,
        "created_at": message.created_at.isoformat(),
    }), 201


# ======================================================
# CLOSE CONSULTATION
# ======================================================

@doctor_bp.route("/consultations/<int:consultation_id>/close", methods=["PATCH"])
def close_consultation(consultation_id):
    role, identity, error = _get_current_identity()
    if error:
        return error

    consultation = Consultation.query.get(consultation_id)
    if not consultation:
        return jsonify({"error": "Consultation not found"}), 404

    if role != "doctor" or consultation.doctor_id != identity.id:
        return jsonify({"error": "Only doctor can close consultation"}), 403
=======
    return jsonify(
        {
            "id": message.id,
            "sender_type": message.sender_type,
            "sender_id": message.sender_id,
            "content": message.content,
            "created_at": message.created_at.isoformat() if message.created_at else None,
        }
    ), 201


@doctor_bp.route("/consultations/<int:consultation_id>/close", methods=["PATCH"])
def close_consultation(consultation_id):
    """
    Close a consultation.
    - Only the doctor involved can close it.
    """
    role, identity, error_response = _get_current_identity()
    if error_response:
        return error_response

    consultation = Consultation.query.get(consultation_id)
    if not consultation:
        return jsonify({"error": "Consultation not found."}), 404

    if role != "doctor" or consultation.doctor_id != identity.id:
        return jsonify({"error": "Only the assigned doctor can close this consultation."}), 403

    if consultation.status == "closed":
        return jsonify({"message": "Consultation already closed."}), 200
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    consultation.status = "closed"
    consultation.closed_at = datetime.utcnow()
    db.session.commit()

<<<<<<< HEAD
    return jsonify({"message": "Consultation closed"}), 200
=======
    return jsonify({"message": "Consultation closed successfully."}), 200
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
