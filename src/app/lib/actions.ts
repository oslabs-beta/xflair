'use server';

export async function fetchHgif (data: string, filePath: string) {
    const resMap = await fetch('http://localhost:3001/api/heatmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, filePath }),
  });
  const resMapParsed = await resMap.json();
  console.log('FETCH 1', resMapParsed);
  const hFilePath =  resMapParsed.filePath;

  const resGif = await fetch('http://localhost:3001/api/hgif', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hFilePath }),
  });
  const resGifParsed = await resGif.json();
  console.log('FETCH 2', resGifParsed);
  return resGifParsed.hGifUrl;
}