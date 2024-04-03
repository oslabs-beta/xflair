import { type NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { ImageAndVideoFormatOptions } from 'cloudinary';

const serviceHost = process.env.SERVICE_HOST || 'localhost'; // Default to localhost if not set
const serviceUrl = `http://${serviceHost}:5000`;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json();

    await delay(1000);

    // Create GIF from uploaded images and cleanup
    const gifCreationResult = await cloudinary.uploader.multi(tag as string, {
      format: 'gif' as ImageAndVideoFormatOptions,
    });

    console.log(gifCreationResult.secure_url);

    // Delete uploaded images after creating the GIF
    await cloudinary.api.delete_resources_by_tag(tag);
    console.log('Uploaded images cleaned up successfully');

    // Return the URL of the created GIF
    return new Response(
      JSON.stringify({
        url: gifCreationResult.secure_url as string,
        tag: tag as string,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
