import express from 'express'
const router = express.Router()
import healthController from '@/controllers/health.controller'

router.get('', healthController.healthcheck)

export default router
