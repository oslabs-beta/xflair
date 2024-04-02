import numpy as np
import tensorflow as tf
from app.utils.image_utils import preprocess_image


def generate_predictions(model, base64_image):
    preprocessed_image = preprocess_image(base64_image)

    # Make predictions using the provided model
    predictions = model.predict(preprocessed_image)
    predicted_class = np.argmax(predictions[0]).item()  # Convert to Python int for JSON serialization

    # Get the top 5 predictions and their probabilities
    top_5 = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]

    # Return a dictionary that's directly serializable to JSON
    return {
        "predicted_class": predicted_class,
        "top_5": top_5,
        "preprocessed_image": preprocessed_image
    }