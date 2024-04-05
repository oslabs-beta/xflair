import os
import numpy as np
from PIL import Image
from flask import Blueprint, request, jsonify

from app.utils.image_utils import preprocess_image
from app.services.generate_images import make_feature_maps
from app.utils.image_utils import add_progress_bar
from app.utils.s3_utils import upload_file

dir = os.path.dirname(__file__)
featuremaps = Blueprint('featuremaps', __name__)

@featuremaps.route('/featuremaps/<model_name>', methods=['POST'])
def upload_featuremaps(model_name):
    data = request.get_json()
    base64_image = data['data']

    model_module = __import__(f"models.{model_name}.model", fromlist=["get_model"])
    model = model_module.get_model()
    layer_names_module = __import__(f"models.{model_name}.model", fromlist=["get_all_layer_names"])
    layer_names = layer_names_module.get_layer_names()

    preprocessed_image = preprocess_image(base64_image)

    visuals_dir = os.path.join(dir, "../visuals/")
    featuremaps_dir = os.path.join(visuals_dir, "featuremaps/")
    featuremapspb_dir = os.path.join(featuremaps_dir, "progressbars/")
    os.makedirs(visuals_dir, exist_ok=True)
    os.makedirs(featuremaps_dir, exist_ok=True)
    os.makedirs(featuremapspb_dir, exist_ok=True) 

    links = []
    progressbar_links = []

    bucket_name = os.getenv('AWS_S3_BUCKET_NAME')
    if not bucket_name:
        return jsonify({"error": "Server configuration error. AWS S3 Bucket name is missing."}), 500

    for layer_name in layer_names:
        output_path = make_feature_maps(preprocessed_image, model, layer_name, featuremaps_dir, layer_names)
        if output_path is None: 
            continue
        
        file_name = os.path.splitext(os.path.basename(output_path))[0]
        upload_file(output_path, bucket_name, f"featuremaps/{os.path.basename(output_path)}")
        links.append(f"https://{bucket_name}.s3.amazonaws.com/featuremaps/{file_name}.jpg")

        img_with_progress = Image.open(output_path)
        img_array = np.array(img_with_progress)
        current_index = layer_names.index(layer_name)
        total_layers = len(layer_names)
        img_with_progress_bar = add_progress_bar(img_array, current_index, total_layers, width = 20)

        # Resize and save the final image with the progress bar
        final_img = Image.fromarray(img_with_progress_bar)
        final_img_resized = final_img.resize((500, 500), Image.Resampling.LANCZOS)  # Resizing the final image
        output_path_pb = os.path.join(featuremapspb_dir, file_name)
        final_img_resized.save(output_path_pb, format='JPEG', quality=85)  # Saving the resized final image

        upload_file(output_path_pb, bucket_name, f"featuremaps/progressbars/{os.path.basename(output_path_pb)}.jpg")
        progressbar_links.append(f"https://{bucket_name}.s3.amazonaws.com/featuremaps/progressbars/{file_name}.jpg")

    return jsonify({'featuremaps': links, 'progressbars': progressbar_links})



