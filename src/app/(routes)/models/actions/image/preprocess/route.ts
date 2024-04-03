import { type NextRequest } from 'next/server';

const serviceHost = process.env.SERVICE_HOST || 'localhost'; // Default to localhost if not set
const serviceUrl = `http://${serviceHost}:5000`;

export async function POST(req: NextRequest) {
  try {
    console.log('endpoint hit');
    const reqParsed = await req.json();
    const { data, filePath, fileType } = reqParsed;
    console.log('filePath: ', filePath);
    console.log('fileType: ', fileType);
    const response = await fetch(`${serviceUrl}/preprocess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath, fileType }),
    });
    return response;
  } catch (err) {
    console.error('Error:    ', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}