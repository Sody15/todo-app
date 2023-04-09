import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

class MongoUtil {
  private static client: MongoClient;
  private static db: Db;

  constructor() {
    if (!MongoUtil.db) {
      MongoUtil.getDb();
    }
  }

  public static async getDb(): Promise<Db> {
    if (!MongoUtil.db) {
      console.log('Create connection');
      MongoUtil.db = await MongoClient.connect(<string>process.env.MONGODB_URI).then((client) => client.db());
    }
    return new Promise((resolve, reject) => {
      if (MongoUtil.db) {
        resolve(MongoUtil.db);
      } else {
        reject('Failed to get database');
      }
    });
  }

  async closeConnection() {
    if (MongoUtil.client) {
      await MongoUtil.client.close();
    }
  }
}

export default MongoUtil;
