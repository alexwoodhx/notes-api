import dotenv from 'dotenv';

dotenv.config();

export const env = {
   port: process.env.PORT || 3000,
   nodeEnv: process.env.NODE_ENV || 'development',
   mongoUri: process.env.MONGODB_URI,
   jwtSecret: process.env.JWT_SECRET,
   jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
};

// Check if all required environment variables are set
if (!env.mongoUri) {
    throw new Error('MONGO_URI is not set, please check your .env file');
}