from flask import Blueprint, request, jsonify
import tensorflow as tf
import cv2
import os
import numpy as np

from app.services.generate_images import make_gradcam_heatmap
from model.mobile_net import get_model, get_layer_names
from app.utils.image_utils import preprocess_image
from app.services.generate_predictions import generate_predictions
from app.utils.s3_utils import upload_file


dir = os.path.dirname(__file__)

heatmaps = Blueprint('heatmaps', __name__)

@heatmaps.route('/heatmap', methods=['POST'])

def upload_heatmaps():
    data = request.get_json()
    base64_image = data['data']
    image_path = data['filePath']


    model = get_model()
    layer_names = get_layer_names()
    preprocessed_image = preprocess_image(base64_image)
    pred_index = generate_predictions(model, base64_image)['predicted_class']

    visuals_dir = os.path.join(dir, "../visuals/")
    heatmaps_dir = os.path.join(visuals_dir, "heatmaps/")
    os.makedirs(visuals_dir, exist_ok=True)
    os.makedirs(heatmaps_dir, exist_ok=True)

    for layer_name in layer_names:
        heatmap = make_gradcam_heatmap(preprocessed_image, model, layer_name, pred_index)
        if heatmap is None:  # Skip layers that don't generate a heatmap
            continue
        img = tf.squeeze(preprocessed_image)
        img = (img * 0.5) + 0.5  # Un-normalize
        heatmap_resized = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
        heatmap_resized = np.uint8(255 * heatmap_resized)
        heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
        superimposed_img = heatmap_colored * 0.4 + np.uint8(img * 255)
        # Save the superimposed image
        file_name = str(layer_names.index(layer_name) + 1).zfill(3) + layer_name
        output_path = os.path.join(heatmaps_dir, f"{file_name}.jpg")

        cv2.imwrite(output_path, superimposed_img)

        bucket_name = os.getenv('AWS_S3_BUCKET_NAME')

        upload_file(output_path, bucket_name, f"heatmaps/{file_name}.jpg")
