import crypto from 'crypto'
import ApiKey from '@/models/apiKey.model'

export const createApiKey = async (permissions: Array<string> = ['0000']) => {
  return await ApiKey.create({
    key: crypto.randomBytes(64).toString('hex'),
    permissions: permissions
  })
}

export const findbyKey = async (key: string) => {
  const objKey = await ApiKey.findOne({ key: key })
  return objKey
}
