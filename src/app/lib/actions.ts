'use server';

import tf from '@tensorflow/tfjs-node';
import cocoSsd from '@tensorflow-models/coco-ssd';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

let imgURL: string;

// export async function uploadImage(formData: FormData) {
//   const image = formData.get('image');
//   if (image) imgURL = URL.createObjectURL(image as File);
//   console.log('imgURL: ',imgURL)
// }

// load the model
const loadModel = async () => {
  const model = await cocoSsd.load();
  return model;
};

export async function processImage(formData: FormData) {
  const image = formData.get('image');

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async () => {
    const imageData = `data:image/${file.type.split('/')[1]};base64,${
      reader.result?.split(',')[1]
    }`; // Add prefix to base64 data
    const data = reader.result?.split(',')[1];

    try {
      console.log('loading model');
      const model = await loadModel();
      console.log('model loaded');

      // preprocess the image data
      console.log('decoding image data');
      const tensor = tf.node.decodeImage(
        Buffer.from(imageData.split(',')[1], 'base64')
      );
      console.log('image data decoded successfully');

      // run the model on the image tensor
      console.log('running model prediction...');
      const predictions = await model.detect(tensor);
      console.log('model prediction successful');

      // generate explanation data (logic to be implemented)
      // const explanationData = generateExplanationData(tensor, predictions);

      // pass in explanationData to res.locals when it is implemented
      res.locals = { predictions };
      return next();
    } catch (error) {
      console.error('Error processing image:', error);
      return next(error);
    }
  };
}
