import dotenv from 'dotenv'
dotenv.config()
export const PORT = 5500;

export const mongoDBURL = process.env.MONGO_CONNECTION_STRING