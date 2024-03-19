import tensorflow as tf
import numpy as np
import cv2
import os
import base64
import sys
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# Function to generate a Grad-CAM heatmap
def make_gradcam_heatmap(img_array, model, last_conv_layer_name, pred_index=None):
    grad_model = tf.keras.models.Model([model.inputs], [model.get_layer(last_conv_layer_name).output, model.output])
    with tf.GradientTape() as tape:
        tape.watch(grad_model.variables)  # Ensure that we're watching the appropriate variables
        last_conv_layer_output, preds = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(preds[0])
        class_channel = preds[:, pred_index]

    grads = tape.gradient(class_channel, last_conv_layer_output)
    if grads is None:
        print(f"Gradients for layer '{last_conv_layer_name}' are None. Skipping this layer.")
        return None  # Return None to indicate that this layer should be skipped

    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()

# Function to preprocess the image
def preprocess_image(base64_image_str):
    image_bytes = base64.b64decode(base64_image_str)
    image_tensor = tf.image.decode_image(image_bytes, channels=3)
    image_tensor = tf.image.resize(image_tensor, (224, 224))
    image_tensor = preprocess_input(image_tensor)
    image_tensor = tf.expand_dims(image_tensor, 0)
    return image_tensor

# Load the pre-trained MobileNetV2 model
model = MobileNetV2(weights='imagenet')

# Read the base64 image string from command line argument
base64_image = sys.argv[1]  # Placeholder for actual base64 image string

preprocessed_image = preprocess_image(base64_image)
predictions = model.predict(preprocessed_image)
predicted_class = np.argmax(predictions[0])
# predicted_class = tf.keras.applications.mobilenet_v2.decode_predictions(predictions)[0][0][1]
predicted_class_name = tf.keras.applications.mobilenet_v2.decode_predictions(predictions)[0][0][1]
print(predicted_class_name)
print(predictions[0][predicted_class])

# Read the layer names from a file
layer_names_file = "/Users/charlesschubach/Development/codesmith/OSP/xflairRP/python/conv_layer_names.txt"
with open(layer_names_file, "r") as f:
    layer_names = f.read().splitlines()

output_dir = "/Users/charlesschubach/Development/codesmith/OSP/xflairRP/python/heatmaps"
print(output_dir)
os.makedirs(output_dir, exist_ok=True)

# Iterate over each layer name for Grad-CAM
for layer_name in layer_names:
    heatmap = make_gradcam_heatmap(preprocessed_image, model, layer_name, predicted_class)
    if heatmap is None:  # Skip layers that don't generate a heatmap
        continue
    img = tf.squeeze(preprocessed_image)
    img = (img * 0.5) + 0.5  # Un-normalize
    heatmap_resized = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
    heatmap_resized = np.uint8(255 * heatmap_resized)
    heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
    superimposed_img = heatmap_colored * 0.4 + np.uint8(img * 255)

    # Save the superimposed image
    output_path = os.path.join(output_dir, f"{layer_name}.jpg")
    cv2.imwrite(output_path, superimposed_img)

    # print(f"Saved heatmap for layer '{layer_name}' at '{output_path}'")