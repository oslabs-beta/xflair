from flask import Flask
from app.routes import routes_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(routes_bp)
    return app

# Path: app/routes.py
