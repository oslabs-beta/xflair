import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //Incoming request is a multipart/form-data with 'file' and 'modelName' fields
    //file is a File type and modelName is a string
    //help

    const formData = await req.formData();

    const file = formData.get('file');
    const modelName = formData.get('modelName');

    if (!file || !modelName) {
      return new Response('Missing file or modelName', { status: 400 });
    }

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const fileName = `inputimages/${modelName}/${Date.now()}.${(
      file as File
    ).name
      .split('.')
      .pop()}`;

    const s3 = new S3Client({
      region: process.env.AWS_DEFAULT_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: fileName,
      Body: buffer, // Stream the file directly to S3
      ContentType: (file as File).type, // Set the correct content type for the file// Optional: Set ACL to control access permissions
    };

    const command = new PutObjectCommand(uploadParams);

    await s3.send(command);

    const filePath = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

    return new Response(JSON.stringify({ filePath }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    return new Response('Error uploading image', { status: 500 });
  }
}
