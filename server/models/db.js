import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createTable = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS users`);

    console.log("✅ Users table created (or already exists)");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

createTable();

export default pool;
