from flask import Blueprint, request, jsonify
import tensorflow as tf
import cv2
import os
import numpy as np

from app.services.generate_images import make_gradcam_heatmap
from app.utils.image_utils import preprocess_image
from app.services.generate_predictions import generate_predictions
from app.utils.s3_utils import upload_file
from app.utils.image_utils import add_progress_bar


dir = os.path.dirname(__file__)
heatmaps = Blueprint('heatmaps', __name__)

@heatmaps.route('/heatmaps/<model_name>', methods=['POST'])
def upload_heatmaps(model_name):
    data = request.get_json()
    base64_image = data['data']

    model_module = __import__(f"models.{model_name}.model", fromlist=["get_model"])
    model = model_module.get_model()
    layer_names_module = __import__(f"models.{model_name}.model", fromlist=["get_all_layer_names"])
    layer_names = layer_names_module.get_layer_names()

    preprocessed_image = preprocess_image(base64_image)
    pred_index = generate_predictions(model, base64_image)['predicted_class']

    visuals_dir = os.path.join(dir, "../visuals/")
    heatmaps_dir = os.path.join(visuals_dir, "heatmaps/")
    heatmapspb_dir = os.path.join(heatmaps_dir, "progressbars/")
    os.makedirs(visuals_dir, exist_ok=True)
    os.makedirs(heatmaps_dir, exist_ok=True)
    os.makedirs(heatmapspb_dir, exist_ok=True)

    links = []
    progessbar_links = []

    for layer_name in layer_names:
        heatmap = make_gradcam_heatmap(preprocessed_image, model, layer_name, pred_index)
        if heatmap is None:
            continue

        img = tf.squeeze(preprocessed_image)
        img = (img * 0.5) + 0.5
        heatmap_resized = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
        heatmap_resized = np.uint8(255 * heatmap_resized)
        heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
        superimposed_img = heatmap_colored * 0.4 + np.uint8(img * 255)

        file_name = str(layer_names.index(layer_name) + 1).zfill(3) + layer_name
        output_path = os.path.join(heatmaps_dir, f"{file_name}.jpg")
        cv2.imwrite(output_path, superimposed_img)

        bucket_name = os.getenv('AWS_S3_BUCKET_NAME')
        upload_file(output_path, bucket_name, f"heatmaps/{file_name}.jpg")
        links.append(f"https://{bucket_name}.s3.amazonaws.com/heatmaps/{file_name}.jpg")

        output_path_pb = os.path.join(heatmapspb_dir, f"{file_name}.jpg")
        current_index = layer_names.index(layer_name)
        total_layers = len(layer_names)
        superimposed_img_with_progress = add_progress_bar(superimposed_img, current_index, total_layers, width=4)
        cv2.imwrite(output_path_pb, superimposed_img_with_progress)  # Correctly save the image with progress bar

        upload_file(output_path_pb, bucket_name, f"heatmaps/progressbars/{file_name}.jpg")
        progessbar_links.append(f"https://{bucket_name}.s3.amazonaws.com/heatmaps/progressbars/{file_name}.jpg")

    return jsonify({'heatmaps': links, 'progressbars': progessbar_links})