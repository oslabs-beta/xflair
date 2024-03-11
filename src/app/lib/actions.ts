'use server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';

export async function uploadImage(formData: Object) {
  console.log('Uploading image');
  console.log('Form data:', formData);
  const image = formData;
  console.log('Image:', image);
  if (image === null) {
    console.error('No image found');
  } else {
    const imageBuffer = await (image as Blob).arrayBuffer();
    fs.writeFile('@/uploads', Buffer.from(imageBuffer), (err) => {
      if (err) {
        console.error('Error saving image:', err);
      } else {
        console.log('Image saved successfully');
      }
    });
  }
  revalidatePath('/');
}
