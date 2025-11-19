import express from 'express';
import dotenv, { parse } from 'dotenv';
import { sql } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

// MIDDLEWARE
// built in middleware to parse json bodies
app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5001;

async function initializeDatabase() {
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

app.get("/health", (req, res) => {
  res.send("Welcome to the Transactions API");
});

app.use("/api/transactions", transactionsRoute);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
    });
});
