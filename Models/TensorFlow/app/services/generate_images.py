import tensorflow as tf
import os
import matplotlib.pyplot as plt
import cv2
import base64
import numpy as np

def make_gradcam_heatmap(img_array, model, conv_layer_name, pred_index=None):
    # Create a model that maps the input image to the activations of the conv layer
    # as well as the output predictions
    grad_model = tf.keras.models.Model(inputs=model.inputs, outputs=[model.get_layer(conv_layer_name).output, model.output])

    # Record operations for automatic differentiation to compute gradients later
    with tf.GradientTape() as tape:
        # Cast the input image to float32 in case it's not
        img_array = tf.cast(img_array, tf.float32)
        tape.watch(img_array)
        # Compute the model's output (including the output of the conv layer)
        conv_layer_output, preds = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(preds[0])
        # Use the gradient of the output neuron (for the predicted class or specified class)
        # relative to the conv layer output to compute the gradients
        class_channel = preds[:, pred_index]

    # Compute gradients towards the class channel
    grads = tape.gradient(class_channel, conv_layer_output)

    # Pooling and normalization of gradients
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_layer_output = conv_layer_output[0]

    # Weight the channels by the gradients and then sum them
    heatmap = tf.matmul(conv_layer_output, pooled_grads[..., tf.newaxis])
    heatmap = tf.squeeze(heatmap)

    # For visualization, make sure the heatmap is in a [0, 1] range
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()

def make_feature_maps(preprocessed_image, model, layer_name, output_dir, layer_names, max_feature_maps=16):
    intermediate_layer_model = tf.keras.Model(inputs=model.input, outputs=model.get_layer(layer_name).output)
    intermediate_output = intermediate_layer_model(preprocessed_image)
    num_feature_maps = intermediate_output.shape[-1]
    num_feature_maps_to_visualize = min(num_feature_maps, max_feature_maps)
    
    if num_feature_maps_to_visualize >= 16:
        nrows, ncols = 4, 4
        fig, axes = plt.subplots(nrows=nrows, ncols=ncols, figsize=(20, 20))
        axes = axes.flatten()
        
        for i in range(num_feature_maps_to_visualize):
            ax = axes[i]
            feature_map = intermediate_output[0, :, :, i]
            ax.imshow(feature_map, cmap='viridis')
            ax.set_title(f'Feature Map {i+1}')
            ax.axis('off')

        file_name = f"{str(layer_names.index(layer_name) + 1).zfill(3) + layer_name}.jpg"
        output_path = os.path.join(output_dir, file_name)
        plt.savefig(output_path, format='jpeg')
        plt.close(fig)
    else:
        return
    
    return output_path


def make_preprocess_image(original_image_path, preprocessed_image, output_dir):
    original_image = cv2.imread(original_image_path)
    preprocessed_image_np = preprocessed_image.numpy().squeeze()
    
    fig, ax = plt.subplots(1, 2, figsize=(10, 5))
    ax[0].imshow(cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB))
    ax[0].set_title('Original Image')
    ax[0].axis('off')
    
    ax[1].imshow((preprocessed_image_np * 0.5) + 0.5)  # Assuming preprocessing includes normalization
    ax[1].axis('off')
    # Save the figure
    print (output_dir)
    print ('saving')
    plt.savefig(output_dir, format='jpeg')
    print ('saved')
    plt.close(fig)  # Close the figure to free memory

def preprocess_image_steps(base64_image_str):
# Decode the image from base64
    image_bytes = base64.b64decode(base64_image_str)
    # Decode image to tensor and resize
    image_tensor = tf.image.decode_image(image_bytes, channels=3)
    resized_image_tensor = tf.image.resize(image_tensor, (224, 224))
    # Normalize
    preprocessed_image_tensor = tf.keras.applications.mobilenet_v2.preprocess_input(resized_image_tensor)
    # Add batch dimension
    final_image_tensor = tf.expand_dims(preprocessed_image_tensor, 0)

    # Convert tensors to numpy for visualization
    original_np = image_tensor.numpy()
    resized_np = resized_image_tensor.numpy()
    preprocessed_np = (preprocessed_image_tensor.numpy())  # Undo normalization for visualization

    return original_np, resized_np, preprocessed_np

def save_image(image_np, output_path):
    fig, ax = plt.subplots(figsize=(5, 5))
    ax.imshow(image_np)
    ax.axis('off')  # Remove axes and borders
    plt.savefig(output_path, format='jpeg', bbox_inches='tight', pad_inches=0)
    plt.close(fig)

def make_preprocess_images(base64_image_str, output_dir):
    original_np, resized_np, preprocessed_np = preprocess_image_steps(base64_image_str)
    
    original_file_name = 'original_image.jpg'
    resized_file_name = 'resized_image.jpg'
    preprocessed_file_name = 'preprocessed_image.jpg'
    # Adjust these lines to change the format or naming convention
    original_output_path = os.path.join(output_dir, original_file_name)
    resized_output_path = os.path.join(output_dir, resized_file_name)
    preprocessed_output_path = os.path.join(output_dir, preprocessed_file_name)
    
    # Save the images
    save_image(cv2.cvtColor(original_np.astype(np.uint8), cv2.COLOR_BGR2RGB), original_output_path)
    save_image(cv2.cvtColor(resized_np.astype(np.uint8), cv2.COLOR_BGR2RGB), resized_output_path)
    save_image(preprocessed_np, preprocessed_output_path)

    return [original_file_name, resized_file_name, preprocessed_file_name]