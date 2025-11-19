import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // in production, you might want to limit based on user ID or IP address
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }

        next();
        
    } catch (error) {
        console.log("Rate Limiter Error:", error);
        next(error);
    }
}

export default rateLimiter;

