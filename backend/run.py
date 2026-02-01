<<<<<<< HEAD
from app import create_app
from app.socket import socketio
import os
from dotenv import load_dotenv
load_dotenv()

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n🚀 Starting backend on http://127.0.0.1:{port}\n")

    socketio.run(
        app,
        host="0.0.0.0",
        port=port,
        debug=True
    )
=======
# run.py
"""
Main entry point for the Telemedicine Flask backend.
Connects to Supabase Postgres via SQLAlchemy and starts the Flask server.
"""

from app import create_app
from flask import jsonify
import os

app = create_app()

# Optional: a simple health check route
@app.route("/")
def home():
    return jsonify({
        "message": "University Telemedicine API is running ✅",
        "docs": "Check /api/* routes for available endpoints"
    })


if __name__ == "__main__":
    # Host and port can be changed if deploying
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_DEBUG", "1") == "1"

    # Run Flask dev server
    print(f"\n🚀 Starting Telemedicine backend on http://127.0.0.1:{port}\n")
    print("Connected to Supabase Postgres (check logs if connection fails).")

    app.run(host="0.0.0.0", port=port, debug=debug_mode)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
