import dotenv from 'dotenv';
dotenv.config();

export const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
export const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY || '';
export const PORT = process.env.PORT || '3000';