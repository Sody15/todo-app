import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const url = <string>process.env.MONGODB_URI;

const client = new MongoClient(url);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
