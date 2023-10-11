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

  // Fake a longer wait time with randomized
  // amounts for realistic request times

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * 1000 * 2)
  })

  return Response.json({ results });
}