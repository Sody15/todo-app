import { Db, MongoClient } from 'mongodb';

// Check if the MONGODB_URI environment variable is set.
if (!process.env.MONGODB_URI) {
  console.log('Check if the MONGODB_URI environment variable is set');
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

class MongoUtil {
  // Define static properties for the client and database instances.
  private static client: MongoClient;
  private static db: Db;

  // Define a static method for getting a reference to the database instance.
  static async getDb(): Promise<Db> {
    if (!MongoUtil.db) {
      console.log('Create connection');
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
