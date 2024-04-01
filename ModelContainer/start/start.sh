#!/bin/bash

# Navigate to the directory containing the model container files
cd /model_container

# Download the weights by running the get_weights.py script
echo "Downloading MobileNetV2 weights..."
python start/get_weights.py

# Start TensorBoard in the background
echo "Starting TensorBoard..."
tensorboard --logdir=./model/logs --bind_all --port=6006 &

# Start Gunicorn with your Flask application
echo "Starting Gunicorn..."
exec gunicorn --workers=9 --timeout 120 --bind 0.0.0.0:5000 server:app