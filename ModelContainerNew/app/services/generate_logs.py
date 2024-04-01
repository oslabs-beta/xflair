import tensorflow as tf
import numpy as np
import os
from datetime import datetime
from app.services.generate_images import make_gradcam_heatmap
from app.utils.image_utils import preprocess_image

dir = os.path.dirname(__file__)

def log_model_architecture(model, writer, log_dir):
    tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, write_graph=True)
    # Dummy data for running the model
    dummy_data = tf.random.normal(shape=(1, 224, 224, 3))
    
    # Wrap the model call with tf.function
    @tf.function
    def model_call(inputs):
        return model(inputs)
    
    # Get the concrete function from the wrapped model call
    concrete_func = model_call.get_concrete_function(dummy_data)
    
    # Create a file writer for TensorBoard summaries
    # Write the model architecture to TensorBoard
    with writer.as_default():
        tf.summary.graph(concrete_func.graph)

# def model_summary(model, log_dir):
#     tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, write_graph=True)
#     # Dummy data for running the model
#     dummy_data = tf.random.normal(shape=(1, 224, 224, 3))
    
#     # Wrap the model call with tf.function
#     @tf.function
#     def model_call(inputs):
#         return model(inputs)
    
#     # Get the concrete function from the wrapped model call
#     concrete_func = model_call.get_concrete_function(dummy_data)
    
#     # Create a file writer for TensorBoard summaries
#     file_writer = tf.summary.create_file_writer(tensorboard_callback.log_dir)
#     # Write the model architecture to TensorBoard
#     with file_writer.as_default():
#         tf.summary.graph(concrete_func.graph)

def log_comprehensive_information(model, preprocessed_image, layer_names, writer, log_dir):
    # Generate predictions
    preds = model.predict(preprocessed_image)
    top_5 = tf.keras.applications.mobilenet_v2.decode_predictions(preds, top=5)[0]

    with writer.as_default():
        # Log input image
        tf.summary.image("Input Image", preprocessed_image, step=0)
        # Log top 5 predictions
        for _, label, prob in top_5:  # Replaced imagenet_id with _
            tf.summary.scalar(f"Top 5 Predictions/{label}", prob, step=0)
        # Generate and log Grad-CAM heatmaps
        for layer_name in layer_names:
            heatmap = make_gradcam_heatmap(preprocessed_image, model, layer_name)
            if heatmap is not None:
                heatmap = np.uint8(255 * heatmap)
                heatmap_image = np.expand_dims(np.repeat(heatmap[:, :, np.newaxis], 3, axis=2), axis=0)
                tf.summary.image(f"Grad-CAM/{layer_name}", heatmap_image, step=0)

def handle_tensorboard_logging(model, base64_image, layer_names):
    preprocessed_image = preprocess_image(base64_image)
    current_time = datetime.now().strftime("%Y%m%d-%H%M%S")
    log_dir = os.path.join(dir, f"../../model/logs/{current_time}")
    os.makedirs(log_dir, exist_ok=True)
    writer = tf.summary.create_file_writer(log_dir)
    # Perform comprehensive logging
    log_comprehensive_information(model, preprocessed_image, layer_names, writer, log_dir)
    # Perform model architecture logging
    log_model_architecture(model, writer, log_dir)
    writer.flush()  # Flush the writer once after all logging activities are complete
    writer.close()
    return log_dir