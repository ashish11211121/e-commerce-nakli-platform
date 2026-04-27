const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return;
  }

  const options = {
    dbName: "aa_store",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds socket timeout
    maxPoolSize: 10, // Optimize for serverless
  };

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, options);
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected successfully (A&A Store)');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not crash, allow next request to retry
    isConnected = false;
  }
}

module.exports = connectDB;