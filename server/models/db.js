import pkg from 'pg';
import dotenv from 'dotenv';
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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        credit_balance INTEGER DEFAULT 5
      );
    `);
    console.log('✅ Users table created (or already exists)');
  } catch (error) {
    console.error('❌ Error creating users table:', error);
  }
};

createTable();

export default pool;
