import pool from "../models/db.js"
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req , res) => {
    try {
        const {prompt} = req.body
        const userId = req.user.id
        const user = await pool.query(`SELECT * FROM users WHERE id=$1`,[userId])
    if(!user || !prompt){
        return res.status(404).json({success:false , error:"Missing details"})
    }
    if(user.rows[0].credit_balance === 0 || user.rows[0].credit_balance < 0){
        return res.status(401).json({success:false, message:"No Credit Balance" , creditBalance:user.rows[0].credit_balance})
    }

    const formData = new FormData()
    formData.append('prompt' , prompt)
    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1' , formData , {
        headers:{
        'x-api-key': process.env.CLIPDROP_API,
    },
    responseType : 'arraybuffer'
})
    const base64Image = Buffer.from(data ,'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    await pool.query(`UPDATE users SET credit_balance = credit_balance - 1 WHERE id=$1`,[userId])
    const updated = await pool.query(`SELECT credit_balance FROM users WHERE id = $1`,[userId])
    const updatedBalance = updated.rows[0].credit_balance;
    // console.log('credit balance :', updatedBalance)
    // const updatedCreditBalance = creditBalance - 1 
    
    res.status(201).json({success:true , resultImage, message:'Image generated', creditBalance : updatedBalance})
} catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }   
}