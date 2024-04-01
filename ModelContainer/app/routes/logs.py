from flask import Blueprint, request, jsonify
import os

from model.mobile_net import get_model, get_all_layer_names
from app.services.generate_logs import handle_tensorboard_logging

dir = os.path.dirname(__file__)
logs = Blueprint('logs', __name__)

@logs.route('/logs', methods=['POST'])
def tensorboard_logs():
    data = request.get_json()
    base64_image = data['data']
    model = get_model()
    layer_names = get_all_layer_names()
    
    # Generate TensorBoard logs and obtain the log directory
    log_dir = handle_tensorboard_logging(model, base64_image, layer_names)
    
    return jsonify({"message": "TensorBoard logs generated successfully.", "log_dir": log_dir})

