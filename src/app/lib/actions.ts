'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

let imgURL: string;

export async function uploadImage(formData: FormData) {
  const image = formData.get('image');
  if (image) imgURL = URL.createObjectURL(image as File);
  console.log('imgURL: ',imgURL)
}