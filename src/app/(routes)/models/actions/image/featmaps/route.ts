import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqParsed = await req.json();
    const { data, modelName } = reqParsed;
    const response = await fetch(
      `http://localhost:5000/featuremaps/${modelName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      }
    );
    return response;
  } catch (err) {
    console.error('Error:    ', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
