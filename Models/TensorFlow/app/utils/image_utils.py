import base64
import tensorflow as tf
import numpy as np

def preprocess_image(base64_image_str):
    image_bytes = base64.b64decode(base64_image_str)
    image_tensor = tf.image.decode_image(image_bytes, channels=3)
    image_tensor = tf.image.resize(image_tensor, (224, 224))
    image_tensor = tf.keras.applications.mobilenet_v2.preprocess_input(image_tensor)
    image_tensor = tf.expand_dims(image_tensor, 0)
    return image_tensor

def add_progress_bar(image, current_index, total_layers, width, border_color=(255,255,255), progress_color=(50,205,50), remaining_color=(220,220,220)):

    img_height, img_width = image.shape[:2]
    progress_width = int(((current_index + 1) / total_layers) * img_width)

    # Create a progress bar image
    bar_img = np.zeros((width, img_width, 3), dtype=np.uint8)

    # Fill the progress part
    bar_img[:, :progress_width] = progress_color

    # Fill the remaining part
    bar_img[:, progress_width:] = remaining_color

    # Add a border
    bar_img[0, :] = border_color
    bar_img[-1, :] = border_color
    bar_img[:, 0] = border_color
    bar_img[:, -1] = border_color

    # Combine the progress bar with the original image
    combined_img = np.vstack((bar_img, image))

    return combined_img