import numpy as np
import tensorflow as tf
from app.utils.image_utils import preprocess_image


def generate_predictions(model, base64_image):
    preprocessed_image = preprocess_image(base64_image)

    predictions = model.predict(preprocessed_image)
    predicted_class = np.argmax(predictions[0])
    predicted_class_name = tf.keras.applications.mobilenet_v2.decode_predictions(predictions)[0]

    top_5 = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
    class_name_probabilities = {}

    for _, class_name, probability in top_5:
        class_name_probabilities[class_name] = probability

    return [predicted_class_name, predictions[0][predicted_class], class_name_probabilities, predicted_class]