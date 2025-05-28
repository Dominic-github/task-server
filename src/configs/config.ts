const config = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    env: process.env.APP_ENV,
    app_url: process.env.APP_URL
  },
  db: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
  },
  rabbitmq: {
    amqpUri: process.env.RABBIT_URI
  },
  openApi: {
    title: process.env.OPEN_API_TITLE,
    version: process.env.OPEN_API_VERSION,
    description: process.env.OPEN_API_DESCRIPTION
  },
  logger: {
    serviceName: process.env.SERVICE_NAME
  },
  sso: {
    enable: process.env.SSO_ENABLE,
    client_id: process.env.SSO_CLIENT_ID,
    client_secret: process.env.SSO_CLIENT_SECRET,
    host_domain: process.env.SSO_GOOGLE_HOSTED_DOMAIN,
    redirect_uri: process.env.SSO_REDIRECT_URI
  },
  email: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    email_from_address: process.env.MAIL_FROM_ADDRESS,
    email_from_name: process.env.MAIL_FROM_NAME
  },
  s3: {
    enable: process.env.S3_ENABLE,
    bucket: process.env.BUCKET,
    region: process.env.REGION,
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY
  },
  task: {
    enable: process.env.TASK_ENABLE
  },
  notification: {
    discord: {
      token: process.env.DISCORD_TOKEN,
      channelId: process.env.DISCORD_CHANNEL
    },
    telegram: {}
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
}

export default config
