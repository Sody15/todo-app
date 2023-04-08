import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const client = await clientPromise;
    let data;

    if (req.method === 'GET') {
      data = await client.db('todo').collection('tasks').find({}).toArray();

      res.status(200).json(data);
    } else if (req.method === 'POST') {
      data = await client.db('todo').collection('tasks').insertOne(req.body);
      // data = await client.db('todo').collection('tasks').insertMany(req.body);

      res.status(200).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
  }
}
