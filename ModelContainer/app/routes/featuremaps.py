import os
from flask import Blueprint, request, jsonify

from model.mobile_net import get_model, get_layer_names
from app.utils.image_utils import preprocess_image
from app.services.generate_images import make_feature_maps

dir = os.path.dirname(__file__)

featuremaps = Blueprint('featuremaps', __name__)

@featuremaps.route('/featuremaps', methods=['POST'])
def upload_featuremaps():
    data = request.get_json()
    base64_image = data['image']
    image_path = data['image_path']

    model = get_model()
    layer_names = get_layer_names()
    preprocessed_image = preprocess_image(base64_image)

    visuals_dir = os.path.join(dir, "../visuals/")
    featuremaps_dir = os.path.join(visuals_dir, "featuremaps/")
    os.makedirs(visuals_dir, exist_ok=True)
    os.makedirs(featuremaps_dir, exist_ok=True)

    for layer_name in layer_names:
        make_feature_maps(preprocessed_image, model, layer_name, featuremaps_dir, layer_names)

