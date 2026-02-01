<<<<<<< HEAD
from flask import Flask, jsonify
from flask_cors import CORS
from app.database.db import db
from app.config import Config
from app.socket import init_socket, socketio

=======
# main.py placeholder
# app/main.py
"""
Main application entry point for the Telemedicine backend.
This file initializes the Flask app and registers all blueprints.
"""

from flask import Flask, jsonify
from app.database.db import db
from app.config import Config

# Import all route blueprints
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
from app.routes.auth_routes import auth_bp
from app.routes.ai_routes import ai_bp
from app.routes.doctor_routes import doctor_bp
from app.routes.image_routes import image_bp
from app.routes.places_routes import places_bp


def create_app():
<<<<<<< HEAD
    app = Flask(__name__)
    app.config.from_object(Config)

    # ✅ Enable CORS FIRST
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True
    )

    # Init DB
    db.init_app(app)

    # Init Socket.IO
    init_socket(app)

    # ✅ Register blueprints WITH PREFIX
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(ai_bp, url_prefix="/api/ai")
    app.register_blueprint(doctor_bp, url_prefix="/api/doctor")
    app.register_blueprint(image_bp, url_prefix="/api/image")
    app.register_blueprint(places_bp, url_prefix="/api/places")

    @app.route("/")
    def home():
        return jsonify({
            "message": "University Telemedicine API is running ✅"
        })

    return app
=======
    """
    Factory function to create and configure the Flask app.
    This is imported by run.py or gunicorn when deploying.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize database (Supabase Postgres)
    db.init_app(app)

    # Register all API blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(places_bp)

    # Create database tables on startup (if not already created)
    with app.app_context():
        db.create_all()

    # Optional: simple health check route
    @app.route("/")
    def home():
        return jsonify({
            "message": "University Telemedicine API is running ✅",
            "database": "Connected to Supabase Postgres",
            "docs": "/api/* routes available"
        })

    return app


# Allow running directly for development (like python app/main.py)
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
