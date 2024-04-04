import { type NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ImageAndVideoFormatOptions } from 'cloudinary';

const serviceHost = process.env.SERVICE_HOST || 'localhost'; // Default to localhost if not set
const serviceUrl = `http://${serviceHost}:5000`;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const generateSignedUrl = async (
  bucketName: string,
  objectKey: string,
  expiresInSeconds: number
) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  // Generate the signed URL
  try {
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: expiresInSeconds,
    });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error; // Rethrow the error for further handling
  }
};

const uploadImage = async (
  imagePath: string,
  publicId: string,
  tag: string
) => {
  return cloudinary.uploader.upload(imagePath, {
    folder: `${tag}_images`,
    tags: tag,
    public_id: publicId,
  });
};

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const { urls, tag } = await req.json();

    console.log('URLs:', urls);
    console.log('Tag:', tag);

    if (tag === 'featuremap_gif') {
      delay(10000);
    }

    const objectKeys = urls.map((url: string) => {
      const startIndex = url.indexOf('.com') + 5;
      const endIndex = url.length;
      const substring = url.substring(startIndex, endIndex);
      return substring;
    });

    console.log('Object keys:', objectKeys[0]);

    if (!objectKeys.length || !tag) {
      return new Response('Missing URLs', { status: 400 });
    }

    // Return the URL of the created GIF
    return new Response(
      JSON.stringify({
        urls: urls,
        tag: tag as string,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
