import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const client = await clientPromise;

    const tasks = await client
      .db('todo')
      .collection('tasks')
      .find({})
      .toArray();

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
  }
}
