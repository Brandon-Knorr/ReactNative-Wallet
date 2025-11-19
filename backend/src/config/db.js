import { neon } from '@neondatabase/serverless';
import "dotenv/config";

// creates a sql connection using the DB URL from the .env file
export const sql = neon(process.env.DATABASE_URL);

export async function initializeDatabase() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(100),
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Database initialized SUCCESSFULLY");
    } catch (error) {
        console.log("Database initialization FAILED:", error.message);
        process.exit(1); // status code 1 means failure 0 means success
    }
};