import tensorflow as tf
import os

dir = os.path.dirname(__file__)

def get_model():
    return tf.keras.applications.MobileNetV2(weights='imagenet')

def get_layer_names():
    layer_names_file = os.path.join(dir, 'conv_layers', 'conv_layer_names.txt')
    with open(layer_names_file, "r") as f:
        layer_names = f.read().splitlines()
    return layer_names

def get_all_layer_names():
    layer_names_file = os.path.join(dir, 'conv_layers', 'all_layers.txt')
    with open(layer_names_file, "r") as f:
        layer_names = f.read().splitlines()
    return layer_names

