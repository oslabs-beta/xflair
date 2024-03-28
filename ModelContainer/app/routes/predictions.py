import os
from flask import Blueprint, request, jsonify

from app.utils.image_utils import preprocess_image
from app.services.generate_predictions import generate_predictions


dir = os.path.dirname(__file__)

predictions = Blueprint('predictions', __name__)

@predictions.route('/predictions', methods=['POST'])
def upload_predictions():
    data = request.get_json()
    base64_image = data['image']
    image_path = data['image_path']

    predictions = generate_predictions(base64_image)

    return jsonify({'predictions': predictions})

