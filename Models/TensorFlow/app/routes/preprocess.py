import os
from flask import Blueprint, request, jsonify
from botocore.exceptions import ClientError
import base64
import glob

from app.services.generate_images import make_preprocess_image, make_preprocess_images
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
        file_names = make_preprocess_images(base64_image, assets_dir)
        # upload_file(upload_path, s3_bucket, 'preprocess/image.jpg')
        if os.path.exists(download_path):
            os.remove(download_path)
            print(f"Deleted upload.jpg from {assets_dir}")

        file_list = glob.glob(os.path.join(assets_dir, '*'))
        # Loop through each file and upload it to S3
        for file_path in file_list:
            try:
                # Get the filename from the file path
                filename = os.path.basename(file_path)
                
                # Upload the file to S3
                upload_file(file_path, s3_bucket, f'preprocess/{filename}')
                
                print(f"Uploaded {filename} to s3://{s3_bucket}/preprocess/{filename}")
            except ClientError as e:
                print(f"Failed to upload {filename} to S3: {e}")

        print(f"Uploaded preprocessed image to s3://{s3_bucket}/preprocess/image.jpg")
        object_names = [f"preprocess/{file_name}" for file_name in file_names]
        return jsonify({'preprocessed_images': object_names})
    except ClientError as e:
        return jsonify({'error': str(e)}), 500