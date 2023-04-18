import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI ?? null;
export const PORT = process.env.PORT ?? 5000;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const API_KEY = process.env.API_KEY ?? '';
export const BASE_URL = 'https://api.themoviedb.org/3';
