import { type NextRequest } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const serviceHost = process.env.SERVICE_HOST || 'localhost'; // Default to localhost if not set
const serviceUrl = `http://${serviceHost}:5000`;

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
export async function POST(req: NextRequest) {
  try {
    const reqParsed = await req.json();
    const { data, filePath, fileType } = reqParsed;

    // Call the preprocess endpoint
    const preprocessResponse = await fetch(`${serviceUrl}/preprocess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath, fileType }),
    });
    const preprocessResult = await preprocessResponse.json();

    const { preprocessed_images } = preprocessResult;
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
    const expiresInSeconds = 60 * 5; // 5 minutes

    // Generate signed URLs for the preprocessed images
    const signedUrls = await Promise.all(
      preprocessed_images.map(async (image: string) => {
        return generateSignedUrl(bucketName, image, expiresInSeconds);
      })
    );

    // Return the signed URLs
    return new Response(JSON.stringify({ urls: signedUrls }), { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
