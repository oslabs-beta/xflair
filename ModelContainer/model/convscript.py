import tensorflow as tf

# Load MobileNetV2 model
model = tf.keras.applications.MobileNetV2(input_shape=(224, 224, 3),
                                          include_top=True,
                                          weights='imagenet')

# Specify the file path to save the layer names
file_path = '/Users/charlesschubach/Development/codesmith/OSP/xflairRP/python/conv_layer_names.txt'

# Open a file in write mode
with open(file_path, 'w') as file:
    # Iterate through the model's layers
    for layer in model.layers:
        # Write the layer name followed by a newline character to the file
        file.write(layer.name + '\n')

print(f"Layer names saved to {file_path}")