import { Db, MongoClient } from 'mongodb';

class MongoUtil {
  // Define static properties for the client and database instances.
  private static instance: MongoUtil;

  private db: Db | null = null;
  private client: MongoClient | null = null;

  // Define a static method for getting a reference to the database instance.
  static async getDb(): Promise<Db> {
    if (!MongoUtil.instance) {
      console.log('Create connection');
      MongoUtil.instance = new MongoUtil();
      MongoUtil.instance.db = await MongoClient.connect(<string>process.env.MONGODB_URI)
        .then((client) => client.db())
        .catch(() => {
          throw new Error();
        });
    }

    return new Promise((resolve, reject) => {
      if (MongoUtil.instance.db) {
        resolve(MongoUtil.instance.db);
      } else {
        reject('Failed to get database');
      }
    });
  }

  static async closeConnection() {
    if (MongoUtil.instance.client) {
      await MongoUtil.instance.client.close();
    }
  }
}

export default MongoUtil;
