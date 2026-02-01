from flask import Blueprint, request, jsonify
<<<<<<< HEAD
import logging

from app.utils.security import decode_access_token
from app.services.ai_service import (
    chat_with_ai,
    get_disease_info,
)
from app.services.otc_service import find_best_matches

logger = logging.getLogger(__name__)

ai_bp = Blueprint("ai", __name__, url_prefix="/api/ai")

# ==========================================================
# 🔐 AUTH HELPERS (JWT ONLY — NO DATABASE HIT)
# ==========================================================

def _get_authenticated_student():
    """
    Verify JWT token only.
    No DB calls. Lightweight and fast.

    Returns:
      (payload_dict, error_response)
    """
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return None, (jsonify({"error": "Authorization header missing."}), 401)
=======

from app.utils.security import decode_access_token
from app.services.ai_service import chat_with_ai, get_disease_info
from app.services.otc_service import find_best_matches

ai_bp = Blueprint("ai", __name__, url_prefix="/api/ai")


# -------------------- Auth helper (JWT only, no DB) -------------------- #
def _get_authenticated_student():
    """
    Read and verify JWT, but do NOT hit the database.

    Returns:
      (student_payload, error_response)

    student_payload is just the decoded JWT dict. We only use it
    to confirm role = 'student'.
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None, (jsonify({"error": "Authorization header missing or invalid."}), 401)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    token = auth_header.split(" ", 1)[1].strip()

    try:
        payload = decode_access_token(token)
    except Exception as e:
<<<<<<< HEAD
        logger.warning("JWT decode failed: %s", e)
        payload = None

    if not payload:
        return None, (jsonify({"error": "Invalid or expired token."}), 401)

    if payload.get("role") != "student":
        return None, (jsonify({"error": "Only students can access this endpoint."}), 403)
=======
        print("JWT decode exception:", e)
        payload = None

    # 🔴 Handle None BEFORE calling .get()
    if not payload:
        print("JWT invalid or expired, payload:", payload)
        return None, (jsonify({"error": "Invalid or expired token."}), 401)

    print("JWT decoded OK:", payload)

    if payload.get("role") != "student":
        return None, (jsonify({"error": "Only students can use this endpoint."}), 403)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    return payload, None


def _build_student_context_from_jwt(payload: dict) -> dict:
    """
<<<<<<< HEAD
    Build minimal context for Gemini prompts.
=======
    Convert minimal JWT payload into the context expected by chat_with_ai.

    Right now JWT only has: sub, role
    So we fall back to generic values for other fields.
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    """
    return {
        "id": payload.get("sub"),
        "role": payload.get("role"),
<<<<<<< HEAD
        "name": payload.get("name", "Student"),
        "level": payload.get("level", "UG"),
        "branch": payload.get("branch", ""),
        "year": payload.get("year"),
        "department": payload.get("department"),
        "hostel": payload.get("hostel"),
    }


# ==========================================================
# 💊 OTC + LLM COMBINED LOGIC
# ==========================================================

def _build_otc_block(symptom_text: str, age=None, top_k: int = 3) -> dict:
    """
    Generate structured OTC suggestions + Gemini explanation.
    """

    symptom_text = (symptom_text or "").strip()

=======
        # If later you add more to JWT (name, level, branch, year),
        # you can pass them through here.
        "name": "Student",
        "level": "UG",
        "branch": "",
        "year": None,
        "department": None,
        "hostel": None,
    }


def _build_otc_block(symptom_text: str, age=None, top_k: int = 3) -> dict:
    """
    Use the OTC engine + LLM to produce structured suggestions.

    Returns a dict like:
    {
      "symptoms": "...",
      "matches": [...],
      "disclaimer": "..."
    }

    If no matches, "matches" will be [] and disclaimer will explicitly say that
    no common OTC pattern was detected.
    """
    symptom_text = (symptom_text or "").strip()
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    if not symptom_text:
        return {
            "symptoms": "",
            "matches": [],
            "disclaimer": (
<<<<<<< HEAD
                "This is not a diagnosis. Always consult a qualified doctor "
                "before taking any medicine."
=======
                "This is not a diagnosis. Always consult a qualified doctor before "
                "taking any medicine."
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            ),
        }

    try:
<<<<<<< HEAD
        matches = find_best_matches(symptom_text, top_k=top_k)
    except Exception as e:
        logger.exception("OTC engine failure")
=======
        # If your implementation later supports age, wire it in here:
        # matches = find_best_matches(symptom_text, age=age, top_k=top_k)
        matches = find_best_matches(symptom_text, top_k=top_k)
    except Exception as e:
        print("find_best_matches error:", e)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        return {
            "symptoms": symptom_text,
            "matches": [],
            "disclaimer": (
                "OTC suggestion service is temporarily unavailable. "
<<<<<<< HEAD
                "Please consult a doctor."
            ),
        }

=======
                "Please consult a doctor for advice."
            ),
        }

    # If nothing matched, be explicit so it doesn't look like "you are fine".
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    if not matches:
        return {
            "symptoms": symptom_text,
            "matches": [],
            "disclaimer": (
<<<<<<< HEAD
                "No common OTC patterns detected. "
                "This does NOT mean you are fine. "
                "Consult a doctor if symptoms persist or worsen."
            ),
        }

    enriched_matches = []

    for cond in matches:
        disease_name = cond.get("name", "")

        try:
            explanation = get_disease_info(disease_name)
        except Exception as e:
            logger.warning("Disease explanation failed: %s", e)
            explanation = {}

        enriched_matches.append(
=======
                "No common OTC patterns were detected from your description. "
                "This does NOT mean you are fine. If you feel unwell or worried, "
                "please consult a qualified doctor or visit the campus health center."
            ),
        }

    result_matches = []
    for cond in matches or []:
        disease_name = cond.get("name", "")
        try:
            expl = get_disease_info(disease_name) or {}
        except Exception as e:
            print("get_disease_info error:", e)
            expl = {}

        result_matches.append(
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            {
                "slug": cond.get("slug"),
                "name": disease_name,
                "score_note": cond.get("score_note") or cond.get("score"),
                "recommended_otc_medicines": cond.get("recommended_otc_medicines", []),
                "precautions": cond.get("precautions", []),
                "when_to_see_doctor": cond.get("when_to_see_doctor", []),
<<<<<<< HEAD
                "llm_explanation": explanation.get("explanation"),
            }
        )

    return {
        "symptoms": symptom_text,
        "matches": enriched_matches,
        "disclaimer": (
            "This is NOT a diagnosis. OTC suggestions are generic and "
            "may not suit everyone. Always consult a qualified doctor, "
            "especially for severe or persistent symptoms."
        ),
    }


# ==========================================================
# 🤖 MAIN GEMINI CHAT ENDPOINT
# ==========================================================
=======
                "llm_explanation": expl.get("explanation"),
            }
        )

    otc_block = {
        "symptoms": symptom_text,
        "matches": result_matches,
        "disclaimer": (
            "This is not a diagnosis. OTC suggestions are generic, "
            "may not suit everyone, and must never replace a consultation "
            "with a qualified doctor. For severe or persistent symptoms, "
            "visit the campus health center or a hospital."
        ),
    }
    return otc_block


# -------------------- Unified AI chat endpoint -------------------- #
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

@ai_bp.route("/chat", methods=["POST"])
def ai_chat():
    """
<<<<<<< HEAD
    Unified AI endpoint using Gemini.

    Request:
      { "message": "...", "age": 20 }

    Response:
    {
      "reply": "...",
      "otc": {...}
    }
    """

=======
    Unified AI endpoint.

    - Always returns an LLM chat reply.
    - Additionally, tries to generate OTC suggestions for symptom-style messages.

    Request JSON:
      { "message": "I have fever...", "age": 20 }

    Response JSON:
    {
      "reply": "...",      # LLM conversational answer
      "otc": {             # Structured OTC suggestions (may have matches[] empty)
        "symptoms": "...",
        "matches": [
          {
            "slug": "...",
            "name": "...",
            "score_note": "...",
            "recommended_otc_medicines": [...],
            "precautions": [...],
            "when_to_see_doctor": [...],
            "llm_explanation": "..."
          },
          ...
        ],
        "disclaimer": "..."
      }
    }
    """
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    student_payload, error_response = _get_authenticated_student()
    if error_response:
        return error_response

<<<<<<< HEAD
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    age = data.get("age")
=======
    data = request.get_json() or {}
    message = (data.get("message") or "").strip()
    age = data.get("age")  # optional age if you want to use it later in OTC logic
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    if not message:
        return jsonify({"error": "Message is required."}), 400

<<<<<<< HEAD
    student_context = _build_student_context_from_jwt(student_payload)

    # ---- Gemini chat response ----
    try:
        reply = chat_with_ai(
            user_context=student_context,
            message=message,
        )
    except Exception as e:
        logger.exception("Gemini chat failed")
        return (
            jsonify(
                {
                    "error": (
                        "AI service is currently unavailable. "
                        "Please consult a real doctor."
                    )
=======
    # 1) LLM conversational reply
    student_context = _build_student_context_from_jwt(student_payload)
    try:
        reply = chat_with_ai(user_context=student_context, message=message)
    except Exception as e:
        print("AI chat error:", e)
        return (
            jsonify(
                {
                    "error": "AI service is currently unavailable. "
                             "Please try again later or consult a real doctor."
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                }
            ),
            500,
        )

<<<<<<< HEAD
    # ---- OTC enrichment ----
    otc_block = _build_otc_block(
        symptom_text=message,
        age=age,
        top_k=3,
    )
=======
    # 2) Structured OTC suggestions based on same message text
    otc_block = _build_otc_block(symptom_text=message, age=age, top_k=3)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    return jsonify(
        {
            "reply": reply,
            "otc": otc_block,
        }
    ), 200


<<<<<<< HEAD
# ==========================================================
# 🔁 LEGACY / ALIAS ENDPOINT
# ==========================================================
=======
# -------------------- Optional: keep /symptom-otc as alias -------------------- #
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

@ai_bp.route("/symptom-otc", methods=["POST"])
def symptom_otc():
    """
<<<<<<< HEAD
    Returns OTC suggestions only.
    """

=======
    Legacy/auxiliary endpoint.

    Uses the same OTC logic as the unified /chat endpoint,
    but only returns the OTC block.

    Request JSON:
      { "symptoms": "I have fever...", "age": 20 }

    Response JSON:
      {
        "symptoms": "...",
        "matches": [...],
        "disclaimer": "..."
      }
    """
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    student_payload, error_response = _get_authenticated_student()
    if error_response:
        return error_response

<<<<<<< HEAD
    data = request.get_json(silent=True) or {}
=======
    data = request.get_json() or {}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    symptoms = (data.get("symptoms") or "").strip()
    age = data.get("age")

    if not symptoms:
        return jsonify({"error": "symptoms field is required."}), 400

<<<<<<< HEAD
    otc_block = _build_otc_block(
        symptom_text=symptoms,
        age=age,
        top_k=3,
    )

=======
    otc_block = _build_otc_block(symptom_text=symptoms, age=age, top_k=3)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    return jsonify(otc_block), 200
