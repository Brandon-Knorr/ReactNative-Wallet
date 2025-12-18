# 🏦 BanK It - Mobile Expense Tracker

**BanK It** is a full-stack, cross-platform mobile application designed to help users track their financial transactions in real-time. Built with a modern tech stack, it features secure authentication, a robust REST API with rate limiting, and a clean, responsive UI.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

---

## 🚀 Features

* **Secure Authentication:** User sign-up and sign-in managed via **Clerk**.
* **Real-time Balance:** Dashboard automatically calculates total balance, income, and expenses.
* **Transaction History:** View all past transactions sorted by date.
* **Rate Limiting:** Backend API is protected against spam using **Upstash Redis**.
* **Auto-Scaling Database:** Data is persisted securely using **Neon (Serverless PostgreSQL)**.
* **Cross-Platform:** Optimized for both iOS and Android.

---

## 🛠️ Tech Stack

### Mobile (Frontend)
* **Framework:** React Native (via Expo)
* **Routing:** Expo Router
* **Authentication:** Clerk (`@clerk/clerk-expo`)
* **Styling:** Native StyleSheet

### Backend (API)
* **Runtime:** Node.js & Express.js
* **Database:** PostgreSQL (via Neon Serverless)
* **Caching:** Redis (via Upstash)
* **ORM/Driver:** `@neondatabase/serverless`

---

## ⚙️ Prerequisites

Before starting, ensure you have:
* [Node.js](https://nodejs.org/) installed.
* [Expo Go](https://expo.dev/client) app on your phone (or a Simulator).
* Accounts for:
  * [Neon](https://neon.tech/) (PostgreSQL)
  * [Upstash](https://upstash.com/) (Redis)
  * [Clerk](https://clerk.com/) (Authentication)

---

## 🔧 Installation & Setup

### 1. Clone the Repository

git clone [https://github.com/yourusername/reactnative-wallet.git](https://github.com/yourusername/reactnative-wallet.git)
cd reactnative-wallet

### 2. Backend Configuration
The backend handles API requests and database connections.

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the `backend` root directory. Add the following keys (using your credentials from Neon and Upstash):

    ```env
    # Server Port (Default is 5001)
    PORT=5001

    # Neon Database Connection String
    DATABASE_URL=postgres://<user>:<password>@<host>/<dbname>?sslmode=require

    # Upstash Redis Keys (For Rate Limiting)
    UPSTASH_REDIS_REST_URL=[https://your-instance.upstash.io](https://your-instance.upstash.io)
    UPSTASH_REDIS_REST_TOKEN=your_upstash_token
    ```

4.  **Start the Server:**
    ```bash
    npm run dev
    # OR
    node src/server.js
    ```
    *Success Message: "Server is running on port: 5001" and "Database initialized SUCCESSFULLY"*

### 3. Database Setup (Automated)
This project is configured to **automatically create the required tables** when the server starts. You do not need to run manual SQL scripts.

For reference, the schema created is:
```sql
CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
