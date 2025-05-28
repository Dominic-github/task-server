import express from 'express'
import AuthController from '@/controllers/auth.controller'
import { authentication } from '@/middlewares/auth.middleware'
import {
  validateLoginRequest,
  validateRegister
} from '@/middlewares/validators/auth.validator'
const router = express.Router()

router.post('/register', validateRegister, AuthController.register)
router.post('/login', validateLoginRequest, AuthController.login)

router.use(authentication)
router.post('/refresh-token', AuthController.refreshToken)
router.post('/logout', AuthController.logout)

export default router
