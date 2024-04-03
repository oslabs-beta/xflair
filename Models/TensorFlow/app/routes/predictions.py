import os
from flask import Blueprint, request, jsonify
import time

from app.services.generate_predictions import generate_predictions


dir = os.path.dirname(__file__)

predictions = Blueprint('predictions', __name__)

@predictions.route('/predictions/<model_name>', methods=['POST'])
def upload_predictions(model_name):
    start_time = time.time()
    data = request.get_json()
    base64_image = data['data']

    model_module = __import__(f"models.{model_name}.model", fromlist=["get_model"])
    model = model_module.get_model()

    predictions = generate_predictions(model, base64_image)

    end_time = time.time()

    total_time = end_time - start_time

    print(f"Predictions: {predictions}")
    print(f"Total time taken: {total_time}")

    return jsonify({
                    'predictions': predictions,
                    'time': total_time
                    })

