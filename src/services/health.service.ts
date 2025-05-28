import { createClient } from 'redis'
import config from '@/configs/config'
const { host, port } = config.redis

class heathService {
  checkHealth = async () => {
    const data = {
      database: 'Connected',
      redis: 'Connected'
    }
    const databaseConnected = await this.databaseConnected()
    if (!databaseConnected) data.database = 'Disconnected'
    const redisConnected = await this.redisConnect()
    if (!redisConnected) data.redis = 'Disconnected'

    return data
  }

  async databaseConnected() {
    try {
      const db = await import('@/database/index.database')
      if (db) {
        return true
      }
      return false
    } catch (_error) {
      return false
    }
  }

  async redisConnect() {
    try {
      const client: any = createClient({
        socket: {
          host: host,
          port: Number(port)
        }
      })
      await client.connect()
      if (client.isReady) return true
      await client.disconnect()

      return false
    } catch (_error) {
      return false
    }
  }
}

export default new heathService()
