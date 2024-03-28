import os
from flask import Blueprint, request, jsonify

from app.utils.image_utils import preprocess_image
from app.services.generate_images import make_preprocess_image

dir = os.path.dirname(__file__)

preprocess = Blueprint('preprocess', __name__)

@preprocess.route('/preprocess', methods=['POST'])
def upload_preprocess():
    data = request.get_json()
    base64_image = data['image']
    image_path = data['image_path']

    preprocessed_image = make_preprocess_image(base64_image)

    return jsonify({'preprocessed_image': preprocessed_image})