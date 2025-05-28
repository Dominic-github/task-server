import crypto from 'crypto'
import TokenModel from '@/models/token.model'
import tokenModel from '@/models/token.model'
import { Api404Error } from '@/core/error.response'

class TokenService {
  createKey = async () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })

    return { publicKey, privateKey }
  }

  createKeyToken = async ({
    user_id,
    publicKey,
    privateKey,
    refreshToken
  }: {
    user_id: string
    publicKey: string
    privateKey: string
    refreshToken: string
  }) => {
    const tokens = await TokenModel.findOneAndUpdate(
      { user_id: user_id },
      {
        user_id: user_id,
        public_key: publicKey,
        private_key: privateKey,
        refresh_token: refreshToken
      },
      { new: true, upsert: true }
    )
    if (!tokens) throw new Api404Error('Token not found')

    return tokens ? tokens.public_key : null
  }

  findTokenByUserId = async (user_id: string) => {
    const token = await tokenModel.findOne({ user_id: user_id })
    if (!token) throw new Api404Error('Token not found')
    return token
  }
  deleteTokenById = async (user_id: string) => {
    return await tokenModel.deleteOne({ user: user_id })
  }
}

export default new TokenService()
