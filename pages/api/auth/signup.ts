import type { NextApiRequest, NextApiResponse } from 'next';

import MongoUtil from '@/lib/mongo-util';
import { userSchema } from '@/lib/schema';
import { User } from '@/models';
import { hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const db = await MongoUtil.getDb();
    const col = db.collection('users');

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
        res.status(400).json({ message: 'Username already exists' });
        return;
      }

      // Hash password
      const hashedPw = await hashPassword(userReq.password!);

      const response = await col.insertOne({ ...userReq, password: hashedPw });

      res.status(201).json(response);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
}
