import mongoose from 'mongoose';

// const connection = {};

// async function connectDB() {
//   if (connection.isConnected) {
//     return;
//   }
//   if (mongoose.connections.length > 0) {
//     connection.isConnected = mongoose.connections[0].readyState;
//     if (connection.isConnected === 1) {
//       return;
//     }
//     await mongoose.disconnect();
//   }
//   const db = await mongoose.connect(process.env.MONGO_URL);
//   connection.isConnected = db.connections[0].readyState;
// }

// async function disconnect() {
//   if (connection.isConnected) {
//     if (process.env.NODE_ENV === 'production') {
//       await mongoose.disconnect();
//       connection.isConnected = false;
//     }
//   }
// }
// const db = { connectDB, disconnect };
// export default db;

// let isConnected = false;
// export const connectDB = async () => {
//   mongoose.set('strictQuery', true);
//   if (isConnected) {
//     console.log('MongoDB is successfully connected');
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: 'faq-prompter',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     // isConnected = db.connections[0].readyState;
//     isConnected = true;
//     console.log('MongoDB is successfully connected');
//   } catch (error) {
//     console.error(error);
//   }
// };

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is successfully connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'faq-prompter',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB is successfully connected');
  } catch (error) {
    console.error(error);
  }
};
