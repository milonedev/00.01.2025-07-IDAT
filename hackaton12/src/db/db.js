import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;
    console.log('🔌 Connecting to MongoDB...');
    console.log('URL:', URL);
    await mongoose.connect(URL);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }
};
