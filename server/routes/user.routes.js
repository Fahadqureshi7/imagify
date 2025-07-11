import { Router } from "express";
import {registerUser , loginUser, userCredit } from '../controllers/user.controller.js'
import { protect } from "../middlewares/userAuth.js";
const router = Router()

router.post('/signup' , registerUser)
router.post('/login' , loginUser)
router.get('/credit', protect , userCredit)

export default router