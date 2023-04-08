import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const client = await clientPromise;
    let data;

    if (req.method === 'POST') {
      data = await client.db('todo').collection('tasks').insertMany(req.body);

      res.status(200).json(data);
    }
  } catch (err) {
    console.error(err);
  }
}
