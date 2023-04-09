import MongoUtil from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const db = await MongoUtil.getDb();
    const col = db.collection('tasks');
    let data;

    if (req.method === 'GET') {
      data = await col.find({}).toArray();

      res.status(200).json(data);
    } else if (req.method === 'POST') {
      data = await col.insertOne(req.body);

      res.status(200).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
  }
}
