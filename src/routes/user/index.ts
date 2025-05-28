import express from 'express'
import { authentication } from '@/middlewares/auth.middleware'
import userController from '@/controllers/user.controller'
const router = express.Router()

router.use(authentication)
router.get('/me', userController.getMe)
router.patch('/', userController.updateUser)

export default router
