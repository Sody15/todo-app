import clientPromise from '@/lib/mongodb';
import { TaskModel } from '@/models/task';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { taskId } = req.query;
    const requestMethod = req.method;
    const body = <TaskModel>req.body;

    if (requestMethod && taskId && typeof taskId === 'string') {
      const client = await clientPromise;
      const _id = new ObjectId(taskId);

      switch (requestMethod) {
        case 'GET':
          const task = await client
            .db('todo')
            .collection('tasks')
            .findOne({ _id });
          res.status(200).json(task);
          break;

        case 'PUT':
          const updatedRes = await client
            .db('todo')
            .collection('tasks')
            .updateOne({ _id }, { $set: body });
          res.status(200).json(updatedRes);
          break;

        case 'DELETE':
          const deleteRes = await client
            .db('todo')
            .collection('tasks')
            .deleteOne({ _id });
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
