import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

// MIDDLEWARE
// built in middleware to parse json bodies
app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.send("Welcome to the Transactions API");
});

app.use("/api/transactions", transactionsRoute);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
    });
});
