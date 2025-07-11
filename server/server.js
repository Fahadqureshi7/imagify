import express from 'express'
import dotenv from 'dotenv'
import pool from './models/db.js'
import cors from 'cors'
import authRoutes from './routes/user.routes.js' 
import imageRoutes from './routes/image.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
  cors({
    origin: `https://imagify-git-main-fahadqureshi7s-projects.vercel.app`,
    credentials: true,
  })
);

app.use('/api/auth' , authRoutes)
app.use('/api/image' , imageRoutes)


app.get('/' , (req , res)=>{
     return res.send('hello from imagify')    
})

app.get('/db' , async(req , res)=>{
    const result =  await pool.query('SELECT current_database()')
    res.send(`the current database is ${result.rows[0].current_database}`)
})

app.listen(PORT , ()=>{
    console.log(`server is running at ${PORT}`)
})