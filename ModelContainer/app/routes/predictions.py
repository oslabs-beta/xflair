import os
from flask import Blueprint, request, jsonify

from app.utils.image_utils import preprocess_image
from app.services.generate_predictions import generate_predictions
from model.mobile_net import get_model


dir = os.path.dirname(__file__)

model = get_model()

predictions = Blueprint('predictions', __name__)

@predictions.route('/predictions', methods=['POST'])
def upload_predictions():
    data = request.get_json()
    base64_image = data['data']
    image_path = data['filePath']

    predictions = generate_predictions(model, base64_image)

    return jsonify({'predictions': predictions})

