import MongoUtil from '@/lib/mongo-util';
import { taskSchemaReq } from '@/lib/schema';
import { Task } from '@/models';
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
      const body = <Task>req.body;

      // Joi Schema Validation
      const { error } = taskSchemaReq.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        throw Error(JSON.stringify(errors));
      }

      data = await col.insertOne(req.body);

      res.status(200).json(data);
    } else {
      throw new Error('Method not allowed');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ errors: err.message });
    } else {
      res.status(400).json({ errors: 'Unknown error occurred' });
    }
  }
}
