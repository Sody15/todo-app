// import clientPromise from '@/lib/mongodb';
import MongoUtil from '@/lib/mongodb';
import client from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const db = await MongoUtil.getDb();
    const col = db.collection('tasks');
    let data;

    if (req.method === 'POST') {
      data = await col.insertMany(req.body);

      res.status(200).json(data);
    }
  } catch (err) {
    console.error(err);
  }
}
