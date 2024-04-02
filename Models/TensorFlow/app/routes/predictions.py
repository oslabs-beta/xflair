import os
from flask import Blueprint, request, jsonify

from app.services.generate_predictions import generate_predictions


dir = os.path.dirname(__file__)

predictions = Blueprint('predictions', __name__)

@predictions.route('/predictions/<model_name>', methods=['POST'])
def upload_predictions(model_name):
    data = request.get_json()
    base64_image = data['data']

    model_module = __import__(f"models.{model_name}.model", fromlist=["get_model"])
    model = model_module.get_model()

    predictions = generate_predictions(model, base64_image)

    return jsonify({'predictions': predictions})

