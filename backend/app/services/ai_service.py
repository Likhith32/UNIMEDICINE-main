"""
<<<<<<< HEAD
AI service layer using Google Gemini (FREE TIER).

Supports:
- Symptom chat (text-based)
- Disease info
- Explanation for image-based predictions

Model: Gemini 2.5 Flash-Lite
SAFE for online deployment.
"""

import os
import textwrap
import logging
import google.generativeai as genai

logger = logging.getLogger(__name__)

# ---------------------- GEMINI CONFIG ---------------------- #

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")

if not GEMINI_API_KEY:
    logger.warning("⚠️ GEMINI_API_KEY is not set")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    model_name=GEMINI_MODEL,
    generation_config={
        "temperature": 0.3,
        "max_output_tokens": 600,
    }
)

# ---------------------- PUBLIC FUNCTIONS ---------------------- #

def chat_with_ai(user_context: dict, message: str) -> str:
    """
    Symptom-based medical chat
=======
AI service layer.

Now supports:
- Symptom chat (text-based)
- Disease info by name
- Explanation for image-based predictions

LLM integration is done via a simple HTTP POST to a local or remote LLM
endpoint (e.g., Ollama running LLaMA3). You can swap this with any LLM provider
by changing _call_llm().
"""

import textwrap
import logging
import os
import requests

logger = logging.getLogger(__name__)

# -------- LLM CONFIG --------
# For example, using Ollama (https://ollama.com/) running locally:
#   ollama run llama3
# Endpoint usually: http://localhost:11434/api/chat
LLM_API_URL = os.getenv("LLM_API_URL", "http://localhost:11434/api/chat")
LLM_MODEL = os.getenv("LLM_MODEL", "llama3")  # set according to your model name


# ---------------------- Public functions ---------------------- #

def chat_with_ai(user_context: dict, message: str) -> str:
    """
    Main function used by /api/ai/chat (symptom chat).
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    """

    student_name = user_context.get("name", "Student")
    level = user_context.get("level", "UG")
    branch = user_context.get("branch") or user_context.get("department") or ""
    year = user_context.get("year")

<<<<<<< HEAD
    profile_parts = [f"{level} student"]
    if branch:
        profile_parts.append(branch)
    if year:
        profile_parts.append(f"Year {year}")

    student_profile = ", ".join(profile_parts)

    system_prompt = textwrap.dedent("""
        You are a SAFE AI medical assistant for university students.

        RULES (NON-NEGOTIABLE):
        - DO NOT give a final diagnosis
        - DO NOT prescribe medicines or brands
        - Suggest only general self-care
        - Clearly list red-flag symptoms
        - Always advise consulting a doctor
        - Use simple language and bullet points
    """)

    prompt = f"""
    {system_prompt}

    Student Profile: {student_profile}
    Name: {student_name}

    Symptoms described:
    "{message}"

    Respond with:
    1. Possible common causes
    2. Safe self-care tips
    3. Warning signs to see a doctor
    4. Clear disclaimer (not a diagnosis)
    """

    return _call_gemini(prompt)
=======
    student_profile_parts = [f"{level} student"]
    if branch:
        student_profile_parts.append(branch)
    if year:
        student_profile_parts.append(f"Year {year}")
    student_profile = ", ".join(map(str, student_profile_parts))

    system_instructions = textwrap.dedent(
        """
        You are an AI medical assistant for university students.
        Your job is to:
        - Help them understand POSSIBLE common conditions based on their symptoms.
        - Suggest simple self-care steps where appropriate.
        - Clearly highlight red-flag symptoms when they should see a doctor or go to hospital immediately.
        - NEVER give a final medical diagnosis.
        - NEVER guarantee that a particular medicine will cure them.
        - AVOID naming specific medicines or brands; if you must, keep them very generic
          (like "paracetamol") and remind them to consult a doctor.
        - ALWAYS tell them to consult a real doctor before taking any medicine or making decisions.
        - Use simple language, short paragraphs, and bullet points where it helps.
        """
    ).strip()

    prompt = f"""
    {system_instructions}

    Student profile: {student_profile}
    Name: {student_name}

    Student message / symptoms:
    "{message}"

    Now, respond with:
    1. A short explanation of what it MIGHT be (possible common causes).
    2. Simple self-care tips they can try safely.
    3. Warning signs when they must see a doctor or hospital.
    4. A final reminder that this is not a diagnosis and they must consult a doctor.
    """

    logger.info("Calling AI model for student_id=%s", user_context.get("id"))
    reply = _call_llm(prompt)
    return reply
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213


def get_disease_info(disease_name: str) -> dict:
    """
<<<<<<< HEAD
    AI explanation of disease
    """

    disease = disease_name.strip().title()

    prompt = f"""
    Explain the condition: {disease}

    Include:
    - Short description (max 3 lines)
    - Common symptoms
    - Simple self-care steps
    - When to see a doctor
    - Clear disclaimer (not a diagnosis)
    """

    explanation = _call_gemini(prompt)

    return {
        "name": disease,
        "explanation": explanation,
        "note": "This is general information, not a medical diagnosis."
    }


def explain_image_prediction(predicted_condition: str, confidence: float) -> str:
    """
    Explains ML image model output
    """

    prompt = f"""
    Image model detected:
    - Possible condition: {predicted_condition}
    - Confidence: {confidence:.2f}

    Explain in simple terms:
    - What it might be
    - Common symptoms
    - Safe self-care tips
    - When to see a doctor
    - Strong disclaimer (not a diagnosis)
    """

    return _call_gemini(prompt)

# ---------------------- INTERNAL HELPER ---------------------- #

def _call_gemini(prompt: str) -> str:
    print("🔥 USING GEMINI 🔥")

    if not GEMINI_API_KEY:
        return "AI service not configured."

    try:
        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        logger.exception("❌ Gemini API error")
        return "AI service temporarily unavailable."
=======
    Provides AI-generated information about a disease/condition name.

    Used by:
    - /api/ai/disease-info
    - image_service (for explaining predicted_condition from an image)
    """

    disease_name_clean = disease_name.strip().title()

    prompt = f"""
    You are an AI medical assistant for university students.

    Explain the condition: {disease_name_clean}

    Respond with:
    - A short description (max 3 lines).
    - A bullet list of common symptoms.
    - A bullet list of simple self-care steps (safe, general).
    - A bullet list of 'when to see a doctor / hospital'.
    - A final reminder that this is NOT a diagnosis.
    """

    logger.info("Generating disease info via LLM for %s", disease_name_clean)
    raw_text = _call_llm(prompt)

    # For simplicity, we just return the whole raw_text as "explanation".
    # If you want, you can parse bullets into lists later.
    info = {
        "name": disease_name_clean,
        "explanation": raw_text,
        "note": (
            f"This is general information about {disease_name_clean}. "
            "It is NOT a confirmed diagnosis. Please consult a qualified doctor "
            "for proper evaluation and treatment."
        ),
    }

    return info


def explain_image_prediction(predicted_condition: str, confidence: float) -> str:
    """
    Use LLM to explain a prediction from the image model
    in simple terms.

    Called from image_service.analyze_image().
    """

    prompt = f"""
    You are an AI medical assistant for university students.

    An image-based model analyzed a skin-related photo and output:
    - Predicted condition: {predicted_condition}
    - Confidence (0 to 1): {confidence:.2f}

    Please explain to the student in simple language:
    1. What this condition MIGHT be (high-level explanation).
    2. Common symptoms for this kind of issue.
    3. Simple, safe self-care tips they can try.
    4. Warning signs when they must see a real doctor or hospital urgently.
    5. A clear reminder that this is not a diagnosis and the model can be wrong.

    Keep the answer concise but clear, using short paragraphs and bullet points.
    """

    logger.info(
        "Explaining image prediction via LLM: %s (confidence=%.2f)",
        predicted_condition,
        confidence,
    )
    return _call_llm(prompt)


# ---------------------- Internal LLM helper ---------------------- #
def _call_llm(prompt: str) -> str:
    """
    Generic LLM caller using Ollama's /api/chat.
    """
    try:
        logger.info("LLM_API_URL=%s, LLM_MODEL=%s", LLM_API_URL, LLM_MODEL)

        payload = {
            "model": LLM_MODEL,
            "messages": [
                {"role": "system", "content": "You are a helpful medical assistant."},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
        }

        resp = requests.post(LLM_API_URL, json=payload, timeout=60)
        logger.info("LLM HTTP status: %s", resp.status_code)
        resp.raise_for_status()

        data = resp.json()
        logger.info("LLM raw response: %s", data)

        # Ollama non-streaming chat:
        # {
        #   "model": "llama3",
        #   "created_at": "...",
        #   "message": {"role": "assistant", "content": "..."},
        #   "done": true,
        #   ...
        # }
        msg = data.get("message")
        if isinstance(msg, dict) and "content" in msg:
            return msg["content"].strip()

        # Fallback if provider uses unexpected structure
        return str(data)

    except Exception as e:
        # Log internal details, but DO NOT leak them to user.
        logger.error("LLM call failed: %s", e)
        return (
            "Sorry, the AI assistant is currently unavailable. "
            "Please try again later or consult a real doctor or campus health center "
            "for advice."
        )
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
