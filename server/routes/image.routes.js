import express from 'express'
import { generateImage } from '../controllers/image.controller.js'
import { protect } from '../middlewares/userAuth.js'

const router = express.Router()

router.post('/generate-image', protect , generateImage)

export default router