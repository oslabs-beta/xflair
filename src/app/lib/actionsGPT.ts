import cocoSsd from '@tensorflow-models/coco-ssd';
import tf from '@tensorflow/tfjs-node';

export const loadModel = async () => {
  const model = await cocoSsd.load();
  return model;
};

// This adjusted function assumes you have the image data available as a Buffer
export async function processImage(imageBuffer) {
  try {
    console.log('loading model');
    const model = await loadModel();
    console.log('model loaded');

    // Preprocess the image data
    console.log('decoding image data');
    const tensor = tf.node.decodeImage(imageBuffer);
    console.log('image data decoded successfully');

    // Run the model on the image tensor
    console.log('running model prediction...');
    const predictions = await model.detect(tensor);
    console.log('model prediction successful');

    return predictions;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error; // Or handle it as needed
  }
}
