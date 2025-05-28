import mongoose from 'mongoose'
import config from '@/configs/config'

class Database {
  url: string
  dbName: string = 'todoapp'
  static instance: Database

  constructor() {
    this.url = config.db.url || 'mongodb://localhost:27017'
    this.connect()
  }

  connect(type = 'mongodb') {
    mongoose.connect(this.url).then(() => {
      console.log(`Connected ${type} Success `)
    })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return this.instance
  }
}

export default Database.getInstance()
