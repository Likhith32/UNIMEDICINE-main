<<<<<<< HEAD
from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.database.db import db
from app.socket import init_socket
=======
# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from app.config import Config

db = SQLAlchemy()

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

<<<<<<< HEAD
    # Init DB
    db.init_app(app)

    # Enable CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True
    )

    # Init Socket.IO
    init_socket(app)

    # Register blueprints
=======
    db.init_app(app)

    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
    )

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    from app.routes.auth_routes import auth_bp
    from app.routes.ai_routes import ai_bp
    from app.routes.image_routes import image_bp
    from app.routes.places_routes import places_bp
    from app.routes.doctor_routes import doctor_bp
<<<<<<< HEAD
=======
    from app.routes.doctors_list_routes import doctors_bp  # list of doctors
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(ai_bp, url_prefix="/api/ai")
    app.register_blueprint(image_bp, url_prefix="/api/image")
    app.register_blueprint(places_bp, url_prefix="/api/places")
<<<<<<< HEAD
    app.register_blueprint(doctor_bp, url_prefix="/api/doctor")

    # Cleanup DB session
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.session.remove()
=======
    app.register_blueprint(doctor_bp, url_prefix="/api/doctor")  # ✅ consultations/messages
    app.register_blueprint(doctors_bp, url_prefix="/api")        # ✅ /api/doctors
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    return app
