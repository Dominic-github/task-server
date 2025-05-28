import type IToken from '@/interfaces/IToken.interface'
import type objKey from '@/interfaces/IObjKey.interface'
import { IUserToken } from '@/interfaces/IUser.interface'

declare global {
  namespace Express {
    interface Request {
      user: IUserToken
      token: IToken
      refreshToken: string
      objKey: objKey
    }
  }
}

export {}
