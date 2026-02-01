<<<<<<< HEAD
=======
# image_routes.py placeholder
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
# app/routes/image_routes.py

import os
import uuid
from flask import Blueprint, request, jsonify, current_app

from app.models.user import User
from app.utils.security import decode_access_token
<<<<<<< HEAD
from app.services.image_service import analyze_image
=======
from app.services.image_service import analyze_image  # you'll implement this
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

image_bp = Blueprint("image", __name__, url_prefix="/api/image")


# --------- Helpers --------- #

def _get_authenticated_student():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None, (jsonify({"error": "Authorization header missing or invalid."}), 401)

    token = auth_header.split(" ", 1)[1].strip()

    try:
        payload = decode_access_token(token)
    except Exception:
        return None, (jsonify({"error": "Invalid or expired token."}), 401)

    if payload.get("role") != "student":
        return None, (jsonify({"error": "Only students can access this endpoint."}), 403)

    user_id = payload.get("sub")
    user = User.query.get(user_id)
    if not user:
        return None, (jsonify({"error": "User not found."}), 404)

    return user, None


def _allowed_file(filename):
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in {"jpg", "jpeg", "png", "bmp"}


# --------- Routes --------- #

@image_bp.route("/diagnose", methods=["POST"])
def diagnose_image():
    """
<<<<<<< HEAD
    SAFE image-based skin observation endpoint.

    - Requires student JWT
    - Accepts image under key 'image' or 'file'
    - Uses AI to describe visible features and provide general guidance
    - DOES NOT diagnose disease

    Response example:
    {
      "image_observation": "...",
=======
    Image-based disease check.
    - Requires student JWT.
    - Accepts file under key 'image' or 'file'.
    - Passes file to analyze_image() service.
    Response example:
    {
      "predicted_condition": "acne",
      "confidence": 0.82,
      "explanation": "...",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      "note": "This is not a medical diagnosis..."
    }
    """
    student, error_response = _get_authenticated_student()
    if error_response:
        return error_response

<<<<<<< HEAD
=======
    # Try reading "image" or "file"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    file = request.files.get("image") or request.files.get("file")
    if not file or file.filename == "":
        return jsonify({"error": "Image file is required (field name 'image' or 'file')."}), 400

    if not _allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type. Use jpg, jpeg, png, or bmp."}), 400

<<<<<<< HEAD
    upload_folder = os.path.join(current_app.instance_path, "uploads")
    os.makedirs(upload_folder, exist_ok=True)

=======
    # Decide where to temporarily save
    upload_folder = os.path.join(current_app.instance_path, "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    # Generate unique filename
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(upload_folder, unique_name)

<<<<<<< HEAD
    file.save(file_path)

    try:
        result = analyze_image(file_path=file_path, user_id=student.id)
    except Exception as e:
        print("Image analysis error:", e)
=======
    # Save file
    file.save(file_path)

    try:
        # analyze_image should return a dict with keys like:
        # predicted_condition, confidence, explanation
        result = analyze_image(file_path=file_path, user_id=student.id)
    except Exception as e:
        print("Image analysis error:", e)
        # Cleanup file
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        try:
            os.remove(file_path)
        except OSError:
            pass
        return jsonify({"error": "Image analysis failed. Please try again later."}), 500

<<<<<<< HEAD
=======
    # Cleanup file after analysis (optional but good)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    try:
        os.remove(file_path)
    except OSError:
        pass

<<<<<<< HEAD
    # Safety fallback (extra protection)
    if "note" not in result:
        result["note"] = (
            "This is an AI-generated visual observation only. "
            "It is NOT a medical diagnosis. Please consult a doctor."
=======
    # Add a safety note if not already present
    if "note" not in result:
        result["note"] = (
            "This is not a confirmed medical diagnosis. "
            "Please consult a qualified doctor for proper evaluation and treatment."
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        )

    return jsonify(result), 200
