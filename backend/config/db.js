import {neon} from '@neondatabase/serverless';
import "dotenv/config";

// creates a sql connection using the DB URL from the .env file
export const sql = neon(process.env.DATABASE_URL);