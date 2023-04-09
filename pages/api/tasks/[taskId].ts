// import clientPromise from '@/lib/mongodb';
// import client from '@/lib/mongodb';
import MongoUtil from '@/lib/mongodb';
import { Task } from '@/models/task';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { taskId } = req.query;
    const requestMethod = req.method;
    const body = <Task>req.body;

    if (requestMethod && taskId && typeof taskId === 'string') {
      const _id = new ObjectId(taskId);

      const db = await MongoUtil.getDb();
      const col = db.collection('tasks');

      switch (requestMethod) {
        case 'GET':
          const task = await col.findOne({ _id });
          res.status(200).json(task);
          break;

        case 'PUT':
        case 'PATCH':
          const updatedRes = await col.updateOne({ _id }, { $set: body });
          res.status(200).json(updatedRes);
          break;

        case 'DELETE':
          const deleteRes = await col.deleteOne({ _id });
          res.status(200).json(deleteRes);
          break;

        default:
          res.status(405).json({ message: 'Method not allowed' });
      }
    } else {
      throw Error('_id parameter not sent');
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'An error occurred fetching task' });
  }
}
