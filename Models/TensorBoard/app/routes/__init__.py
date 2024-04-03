
from flask import Blueprint

# Create a blueprint for the routes
routes_bp = Blueprint('routes', __name__)


# Import the routes
from app.routes import logs

# Register the routes

routes_bp.register_blueprint(logs.logs)


