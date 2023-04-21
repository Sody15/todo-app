import { ObjectId } from 'mongodb';

export type Task = {
  _id?: ObjectId;
  title: string;
  description: string;
  tags: string[];
  done: boolean;
};
