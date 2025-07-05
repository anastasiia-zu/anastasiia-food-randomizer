import mongoose from 'mongoose';


const MONGODB_URL = process.env.MONGODB_URL as string;


if (!MONGODB_URL) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cached = (global as any).mongoose || { conn: null, promise: null };

  export async function connectToDatabase() {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URL, {
         bufferCommands: false,
      }).then((mongoose) => {
         return mongoose;
      });
   }

   cached.conn = await cached.promise;

   return cached.conn;
  }