import express from 'express';
import { sql } from '../config/db.js';
import { getTransactionsByUserId } from '../controllers/transactionController.js';

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", async (req, res) => {
    // for a new transaction: title, amount, category, user_id
    try {
        const { title, amount, category, user_id } = req.body;

        if (!title || !category || amount === undefined || !user_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const transaction = await sql`
            INSERT INTO transactions (title, amount, category, user_id)
            VALUES (${title}, ${amount}, ${category}, ${user_id})
            RETURNING *
        `;

        console.log(transaction);
        res.status(201).json({ transaction: transaction[0] });
    } catch (error) {
        console.log("Error creating transaction:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }

        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
            `;

        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });

    } catch (error) {
        console.log("Error deleting transaction:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/api/transactions/summary/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions 
            WHERE user_id = ${userId}
        `;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions 
            WHERE user_id = ${userId} AND amount > 0
        `;

        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions 
            WHERE user_id = ${userId} AND amount < 0
        `;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expenseResult[0].expenses
        });

    } catch (error) {
        console.log("Error loading balances:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;