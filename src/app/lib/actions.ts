'use server';

import { PythonShell } from 'python-shell';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { PythonOptions, GifCreate, modelOutput } from './definitions';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

let imgURL: string;

cloudinary.v2.config({
  cloud_name: 'dufc4fu9r',
  api_key: '952123583439325',
  api_secret: 'qcJj3fKhfFcmXZL0xuSopgORemg',
});

export async function uploadImage(formData: FormData) {
  const image = formData.get('image');
  if (image) imgURL = URL.createObjectURL(image as File);
  console.log('imgURL: ', imgURL);
}

export async function generateHeatmaps(data: string) {
  const options: PythonOptions = {
    mode: 'text',
    pythonOptions: ['-u'], // unbuffered stdout
    args: [data],
  };
  console.log('running MobileNet middleware');
  try {
    const results = await PythonShell.run(
      path.join(__dirname, '../../python/MobileNet.py'),
      options
    );
    console.log('running python script');
    console.log('results:', results[1]);
    const modelOutput: modelOutput = {
      class: results[1],
      certainty: results[2],
      folder: results[3],
    };
    return modelOutput;
  } catch (error) {
    console.error('Error running python script:', error);
  }
}

export async function createGif(imagesFolderPath: string, setGifUrl: (gifUrl: string)=> void) {
  console.log('Running createGIF middleware');
  const tag: string = 'heatmap_gif'; // Tag to organize images in Cloudinary

  // Function to upload a single image and tag it
  const uploadImage = (imagePath: string) => {
    return cloudinary.v2.uploader.upload(imagePath, {
      folder: 'gif_images',
      tags: tag,
    });
  };

  // Step 1: Read all image files from the folder
  const files: string[] = fs
    .readdirSync(imagesFolderPath)
    .filter((file) => file.endsWith('.jpg'));
  const uploadPromises = files.map((file) => {
    const imagePath = path.join(imagesFolderPath, file);
    return uploadImage(imagePath); // Create an upload promise for each image
  });

  const gifCreate: GifCreate = {
    format: 'gif',
    resource_type: 'image',
  }

  // Step 2: Upload all images, then create and retrieve the GIF
  Promise.all(uploadPromises)
    .then((uploadResults) => {
      console.log('All images uploaded.');
      // Step 3: Use the multi method to create an animated GIF from all images tagged with `tag`
      return cloudinary.v2.uploader.multi(tag, gifCreate);
    })
    .then((gifCreationResult) => {
      // Step 4: Generate the URL for the created GIF
      const gifUrl = gifCreationResult.secure_url;
      console.log('GIF created:', gifUrl);
      return gifUrl;
    })
    .then(async (gifUrl) => {
      // Step 5: Cleanup - delete all images tagged with `tag`
      await cloudinary.v2.api.delete_resources_by_tag(tag);
      console.log('Uploaded images cleaned up successfully');
      setGifUrl(gifUrl);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}
