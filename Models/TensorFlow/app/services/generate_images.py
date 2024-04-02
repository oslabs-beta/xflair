import tensorflow as tf
import os
import matplotlib.pyplot as plt
import cv2

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
    ax[1].set_title('Preprocessed Image')
    ax[1].axis('off')
    file_name = 'input_images_comparison.png'
    file_path = os.path.join(output_dir, file_name)
    print(file_name)
    # Save the figure
    plt.savefig(file_path)
    plt.close(fig)  # Close the figure to free memory