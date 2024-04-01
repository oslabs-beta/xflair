import numpy as np
import tensorflow as tf
from app.utils.image_utils import preprocess_image


def generate_predictions(model, base64_image):
    preprocessed_image = preprocess_image(base64_image)

    # Make predictions using the provided model
    predictions = model.predict(preprocessed_image)
    predicted_class = np.argmax(predictions[0]).item()  # Convert to Python int for JSON serialization

    # Get the name of the predicted class
    predicted_class_name = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=1)[0][0][1]

    # Get the top 5 predictions and their probabilities
    top_5 = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
    class_name_probabilities = {}

    for _, class_name, probability in top_5:
        # Convert numpy float to Python float for JSON serialization
        class_name_probabilities[class_name] = float(probability)

    # Return a dictionary that's directly serializable to JSON
    return {
        "predicted_class_name": predicted_class_name,
        "predicted_class_probability": predictions[0][predicted_class].item(),  # Ensure this is a Python float
        "class_name_probabilities": class_name_probabilities,
        "predicted_class": predicted_class
    }