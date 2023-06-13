const { MongoClient } = require('mongodb');
require('dotenv').config();

async function archiveData() {
  try {
    const url = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    const collectionName = process.env.COLLECTION_NAME;
    const archiveCollectionName = process.env.ARCHIVE_COLLECTION_NAME;

    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Connected to MongoDB successfully!');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const historicalData = await collection.find({}).toArray();

    if (historicalData.length === 0) {
      console.log('No data to archive.');
      return;
    }

    const archiveCollection = db.collection(archiveCollectionName);
    await archiveCollection.insertMany(historicalData);
    console.log('Data archived successfully!');

    client.close();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = archiveData;
