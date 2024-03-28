import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqParsed = await req.json();
    const { data, filePath } = reqParsed;
    const response = await fetch('http://localhost:3001/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    });
    return response;
  } catch (err) {
    console.error('Error:    ', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
