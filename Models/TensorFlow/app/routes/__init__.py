
from flask import Blueprint

# Create a blueprint for the routes
routes_bp = Blueprint('routes', __name__)


# Import the routes
from app.routes import featuremaps, heatmaps, preprocess, predictions

# Register the routes

routes_bp.register_blueprint(featuremaps.featuremaps)
routes_bp.register_blueprint(heatmaps.heatmaps)
routes_bp.register_blueprint(preprocess.preprocess)
routes_bp.register_blueprint(predictions.predictions)


