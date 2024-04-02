import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import AWS from 'aws-sdk';
import { Readable } from 'stream';

const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqParsed = await req.json();

    if (!reqParsed.body || !reqParsed.body.file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const { file, modelName } = reqParsed.body;
    const { name, stream } = file;

    if (!(stream instanceof Readable)) {
      return new Response('Invalid file object', { status: 400 });
    }

    const fileName = `inputimages/${modelName}/${name}`;

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    });

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: fileName,
      Body: stream, // Stream the file directly to S3
      ContentType: reqParsed.body.headers.ContentType, // Optional: Content type from FormData (if provided)
      ACL: 'public-read', // Optional: Set ACL to control access permissions
    };

    const s3Data = await s3.upload(uploadParams).promise(); // Upload to S3 using promise

    return new Response(JSON.stringify({ imageUrl: s3Data.Location }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    return new Response('Error uploading image', { status: 500 });
  }
}
