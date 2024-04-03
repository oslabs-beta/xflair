#!/bin/bash

# Navigate to the directory containing the model container files
cd /TensorFlow

# Download the weights by running the get_weights.py script
echo "Downloading MobileNetV2 weights..."
python start/get_weights.py

# Start Gunicorn with your Flask application
echo "Starting Gunicorn..."
exec gunicorn --workers=9 --timeout 120 --bind 0.0.0.0:5000 server:app