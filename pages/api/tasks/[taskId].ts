import MongoUtil from '@/lib/mongo-util';
import { taskSchema } from '@/lib/schema';

import { Task } from '@/models/task';

import { ObjectId } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get id from request
    const { taskId } = req.query;

    if (taskId && typeof taskId === 'string') {
      const _id = new ObjectId(taskId);

      const db = await MongoUtil.getDb();
      const col = db.collection('tasks');

      switch (req.method) {
        case 'GET':
          const task = await col.findOne({ _id });
          res.status(200).json(task);
          break;

        case 'PUT':
        case 'PATCH':
          const body = <Task>req.body;

          // Joi Schema Validation
          const { error } = taskSchema.validate(body, { abortEarly: false });
          if (error) {
            const errors = error.details.map((e) => e.message);
            throw Error(JSON.stringify(errors));
          }

          const updatedRes = await col.updateOne({ _id }, { $set: body });
          res.status(200).json(updatedRes);
          break;

        case 'DELETE':
          const deleteRes = await col.deleteOne({ _id });
          res.status(200).json(deleteRes);
          break;

        default:
          throw Error('Method not allowed');
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ errors: err.message });
    } else {
      res.status(400).json({ errors: 'Unknown error occurred' });
    }
  }
}
