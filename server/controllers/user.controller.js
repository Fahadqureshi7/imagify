import pkg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
const { Pool } = pkg;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }
  try {
    const userExist = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "User already exist" });
    }
    const password_hash = await bcrypt.hash(password, 10);

    const createUser = await pool.query(
      `INSERT INTO users (name , email , password_hashed) VALUES ($1 , $2 , $3) RETURNING id, name , email , password_hashed`,
      [name, email, password_hash]
    );
    res.status(201).json({ user: createUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Missing fields" });
  }
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      user.password_hashed
    );
    if (!comparePassword)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

const userCredit = async (req , res) => {
    const userId = req.user.id;
    
    if(!userId) {
        return res.status(401).json({error:'Unauthorized'})
    }
    try {
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
        const credits = user.rows[0]?.credit_balance
        res.json({success:true , credits , user:{name : user.rows[0].name }})
    } catch (error) {
        console.error('Error getting credits :' , error)
        res.status(500).json({error:'Server error'})
        
    }
}

export { registerUser, loginUser , userCredit};
