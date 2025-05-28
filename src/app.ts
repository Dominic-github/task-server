import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import routes from '@/routes'

const app = express()

// init middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use(morgan('dev'))
app.use(
  helmet.frameguard({
    action: 'deny'
  })
)

// strict transport security
const reqDuration = 2629746000
app.use(
  helmet.hsts({
    maxAge: reqDuration
  })
)

// content security policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  })
)

// x content type options
app.use(helmet.noSniff())
// x xss protection
app.use(helmet.xssFilter())
// referrer policy
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer'
  })
)

// downsize response
app.use(
  compression({
    level: 6, // level compress
    threshold: 100 * 1024, // > 100kb threshold to compress
    filter: (req) => {
      return !req.headers['x-no-compress']
    }
  })
)

// setting body parser, cookie parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// connect to database
import('@/database/index.database')

// process handler
import('@/middlewares/processHandler.middleware')

// init route

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('', routes)

export default app
