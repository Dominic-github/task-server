import express from 'express'
import ApiKeyController from '@/controllers/apikey.controller'
import { apiKey, permission } from '@/middlewares/apiKey.middleware'

import health from './health'
import auth from './auth'
import user from './user'
import todo from './todo'

const router = express.Router()
router.use('/health', health)

// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))

// init api Key
router.post('/api-key/create', ApiKeyController.createApiKey)
router.use('/auth', auth)
router.use('/user', user)
router.use('/todo', todo)

export default router
