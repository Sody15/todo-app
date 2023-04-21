import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  userName: string;
  password?: string;
};
