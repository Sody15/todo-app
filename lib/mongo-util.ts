import { Db, MongoClient } from 'mongodb';

class MongoUtil {
  // Define static properties for the client and database instances.
  private static db: Db | null = null;
  private static client: MongoClient;

  // Define a static method for getting a reference to the database instance.
  static async getDb(): Promise<Db> {
    console.log('db is - ' + MongoUtil.db);
    if (!MongoUtil.db) {
      MongoUtil.db = await MongoClient.connect(<string>process.env.MONGODB_URI)
        .then((client) => client.db())
        .catch(() => {
          throw new Error();
        });
    }

    return new Promise((resolve, reject) => {
      if (MongoUtil.db) {
        resolve(MongoUtil.db);
      } else {
        reject('Failed to get database');
      }
    });
  }

  static async closeConnection() {
    if (MongoUtil.client) {
      await MongoUtil.client.close();
    }
  }
}

export default MongoUtil;
