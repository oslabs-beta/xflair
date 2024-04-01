import tensorflow as tf
import numpy as np
import os
from datetime import datetime

from app.services.generate_images import make_gradcam_heatmap
from app.utils.image_utils import preprocess_image

dir = os.path.dirname(__file__)

def log_model_architecture(model, writer, log_dir):
    # Ensure profiler_outdir is specified in trace_on to enable profiler
    with writer.as_default():
        tf.summary.trace_on(graph=True, profiler=False, profiler_outdir=log_dir)
        dummy_input = tf.zeros([1, 224, 224, 3])
        _ = model(dummy_input)
        # Now pass only the name to trace_export, since profiler_outdir was already specified
        tf.summary.trace_export(name="model_trace", step=0)

def model_summary(model, log_dir):
    tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, write_graph=True)

    # Dummy data for running the model
    dummy_data = tf.random.normal(shape=(1, 224, 224, 3))

    # Run the model on the dummy data to trigger graph creation
    model.predict(dummy_data)

    # Create a file writer for TensorBoard summaries
    file_writer = tf.summary.create_file_writer(tensorboard_callback.log_dir)

    # Write the model architecture to TensorBoard
    with file_writer.as_default():
        tf.summary.graph(model.call.get_concrete_function().graph)

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

# Assuming this function is called within a request handler or similar context
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