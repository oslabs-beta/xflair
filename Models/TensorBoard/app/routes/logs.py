from flask import Blueprint, request, jsonify
import os

from app.services.generate_logs import handle_tensorboard_logging

dir = os.path.dirname(__file__)
logs = Blueprint('logs', __name__)

@logs.route('/logs/<model_name>', methods=['POST'])
def tensorboard_logs(model_name):
    data = request.get_json()
    base64_image = data['data']

    # Invoke the get_model function from <model_name>/model
    model_module = __import__(f"models.{model_name}.model", fromlist=["get_model"])
    model = model_module.get_model()
    layer_names_module = __import__(f"models.{model_name}.model", fromlist=["get_all_layer_names"])
    layer_names = layer_names_module.get_all_layer_names()
    
    # Generate TensorBoard logs and obtain the log directory
    log_dir = handle_tensorboard_logging(model, base64_image, layer_names, model_name)
    # model_summary(model, log_dir)
    
    return jsonify({"message": "TensorBoard logs generated successfully.", "log_dir": log_dir})

