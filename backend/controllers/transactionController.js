export async function getTransactionsByUserId() {
    try {
        const { userId } = req.params;

        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;

        res.status(200).json({ transactions });
    } catch (error) {
        console.log("Error getting transactions:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

