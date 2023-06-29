import mongoose from 'mongoose';

let isConnected = false;
export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is successfully connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // isConnected = db.connections[0].readyState;
    isConnected = true;
    console.log('MongoDB is successfully connected');
  } catch (error) {
    console.error(error);
  }
};
