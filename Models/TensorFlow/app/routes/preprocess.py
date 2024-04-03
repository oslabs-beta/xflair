import os
from flask import Blueprint, request, jsonify
from botocore.exceptions import ClientError
import base64

from app.services.generate_images import make_preprocess_image
from app.utils.image_utils import preprocess_image
from app.utils.s3_utils import download_file, upload_file


dir = os.path.dirname(__file__)
preprocess = Blueprint('preprocess', __name__)

@preprocess.route('/preprocess', methods=['POST'])
def upload_preprocess():
    data = request.get_json()
    print(f"Received data: {data}")
    base64_image = data['data']
    s3_url = str(data['filePath'])  # Convert s3_url to string
    image_type = data['fileType']

    print(f"Received image from {s3_url}")
    print(f"Image type is {image_type}")
        
    # Process the base64-encoded image
    preprocessed = preprocess_image(base64_image)

    # Prepare directories and filenames
    assets_dir = os.path.join(dir, '../assets')
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
    
    print(f"Assets directory is {assets_dir}")
    
    object_name = s3_url.split('.com/')[-1]
    print(f"Object name is {object_name}")

    download_path = os.path.join(assets_dir, f'upload.{image_type}')  # Fixed string formatting
    upload_path = os.path.join(assets_dir, 'preprocess.jpg')

    s3_bucket = os.environ.get('AWS_S3_BUCKET_NAME')

    try:
    # Attempt to download the file from S3
        download_file(s3_bucket, object_name, download_path)
    except Exception as e:
    # If download fails, fallback to saving the file from base64 data
        print(f"Failed to download {object_name} from S3: {e}. Fallback to base64.")
        try:
            image_data = base64.b64decode(base64_image)
            with open(download_path, 'wb') as file:
                file.write(image_data)
        except Exception as e:
            print(f"Failed to save file from base64 data: {e}")
            return jsonify({'error': 'Failed to process image.'}), 500

    # Error handling for S3 operations
    try:
        print(f"Downloaded file from s3://{s3_bucket}/{object_name}")
        make_preprocess_image(download_path, preprocessed, upload_path)
        print(f"Preprocessed image saved to {upload_path}")
        upload_file(upload_path, s3_bucket, 'preprocess/image.jpg')
        print(f"Uploaded preprocessed image to s3://{s3_bucket}/preprocess/image.jpg")
        url = f"https://{s3_bucket}.s3.amazonaws.com/preprocess/image.jpg"
        return jsonify({'preprocessed_image': url})
    except ClientError as e:
        return jsonify({'error': str(e)}), 500