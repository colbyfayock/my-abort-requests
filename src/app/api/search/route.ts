import Fuse from 'fuse.js';

import pixar from '@/data/pixar.json';

export async function POST(request: Request) {
  const { query } = await request.json()
  
  const fuse = new Fuse(pixar, {
    keys: [
      "title",
      "year"
    ]
  });
  
  const results = fuse.search(query);

  return Response.json({ results });
}