import tensorflow as tf

def get_model():
    return tf.keras.applications.MobileNetV2(weights='imagenet')

model = get_model()