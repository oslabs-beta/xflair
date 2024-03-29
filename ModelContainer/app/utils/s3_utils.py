import boto3
from botocore.exceptions import ClientError, NoCredentialsError, BotoCoreError
import logging
import time

def create_s3_client():
    """Create an S3 client."""
    return boto3.client('s3')

def upload_file(file_path, bucket_name, object_name):
    s3_client = create_s3_client()
    try:
        s3_client.upload_file(file_path, bucket_name, object_name)
    except ClientError as e:
        print(f"Error uploading file to S3: {e}")
        raise

def download_file(bucket_name, object_name, file_path):
    """Download a file from an S3 bucket."""
    s3_client = create_s3_client()
    try:
        s3_client.download_file(bucket_name, object_name, file_path)
        print(f"File {object_name} downloaded from {bucket_name} to {file_path}")
    except ClientError as e:
        print(f"Error downloading file from S3: {e}")
        raise

def list_objects_in_bucket(bucket_name, prefix=""):
    """List objects in an S3 bucket."""
    s3_client = create_s3_client()
    try:
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        objects = response.get("Contents", [])
        return [obj["Key"] for obj in objects]
    except ClientError as e:
        print(f"Error listing objects in bucket {bucket_name}: {e}")
        raise

def delete_object_from_bucket(bucket_name, object_name):
    """Delete an object from an S3 bucket."""
    s3_client = create_s3_client()
    try:
        s3_client.delete_object(Bucket=bucket_name, Key=object_name)
        print(f"Object {object_name} deleted from {bucket_name}")
    except ClientError as e:
        print(f"Error deleting object from bucket {bucket_name}: {e}")
        raise