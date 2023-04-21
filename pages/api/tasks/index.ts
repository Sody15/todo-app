import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';

import { authOptions, getUserId } from '../auth/[...nextauth]';
import MongoUtil from '@/lib/mongo-util';
import { taskSchemaReq } from '@/lib/schema';
import { Task } from '@/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Check session
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ errors: 'Not authorized.' });
    return;
  }

  if (session.user) {
    const userId = new ObjectId(getUserId(session)!);

    try {
      const db = await MongoUtil.getDb();
      const col = db.collection('tasks');
      let data;

      if (req.method === 'GET') {
        // Get all tasks by userId
        data = await col.find({ userId: userId }).project({ userId: 0 }).toArray();

        res.status(200).json(data);
      } else if (req.method === 'POST') {
        // Add new Task
        const taskPayload = <Task>req.body;

        // Joi Schema Validation
        const { error } = taskSchemaReq.validate(taskPayload, { abortEarly: false });
        if (error) {
          const errors = error.details.map((e) => e.message);
          throw Error(JSON.stringify(errors));
        }

        data = await col.insertOne({ ...taskPayload, userId });

        res.status(201).json(data);
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  } else {
    res.status(400).json({ message: 'No user session' });
  }
}
