import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId | string;
  userName: string;
  password?: string;
};
