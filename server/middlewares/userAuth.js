import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const protect = (req , res ,next)=> {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Authorization Header:", req.headers.authorization);
    // console.log('token',token);
    
    if(!token){
        return res.status(401).json({error:'Missing token'})
    }
    // const token = authHeader.split(' ')[1];
    // console.log('token:' , token);
    try {
        const decode = jwt.verify(token , JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({error:'Invalid token'})
    }
    
}