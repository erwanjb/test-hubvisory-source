import { config } from 'dotenv';

config();

export const IS_DEV = process.env.NODE_ENV != 'production';

export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;

export const DB_HOST = process.env.DB_HOST || 'localhost';

export const DB_USERNAME = process.env.DB_USERNAME;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const JWT_SECRET = process.env.JWT_SECRET;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);

export const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB_API_KEY;
