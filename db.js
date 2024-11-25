const { MongoClient } = require("mongodb");
const collection = {};

async function connect() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("PixabayDatabase");
  collection.pixabay = db.collection("pixabay");
}

module.exports = {
  connect,
  collection,
};
