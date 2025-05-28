import 'dotenv/config'
import('module-alias/register')
import dotenv from 'dotenv'
dotenv.config()

import app from '@/app'
const PORT = parseInt(process.env.APP_PORT || process.env.PORT || '8000')

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT} `)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Exit server express')
    process.exit(0)
  })
})
