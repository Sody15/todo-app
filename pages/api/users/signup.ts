import type { NextApiRequest, NextApiResponse } from 'next';

import MongoUtil from '@/lib/mongo-util';
import { userSchema } from '@/lib/schema';
import { User } from '@/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const db = await MongoUtil.getDb();
    const col = db.collection('users');
    let data;

    if (req.method === 'POST') {
      const userReq = <User>req.body;

      // Joi Schema Validation
      const { error } = userSchema.validate(userReq, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        throw Error(JSON.stringify(errors));
      }

      // See if user already exists
      const user = await col.findOne({ userName: userReq.userName });

      if (user) {
        throw Error('Username already exists');
      }

      data = await col.insertOne(userReq);

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
