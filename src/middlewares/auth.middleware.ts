import { Request, Response, NextFunction } from 'express'
import catchAsync from '@/helpers/catchAsync.helper'
import { Api403Error, Api401Error, BaseError } from '@/core/error.response'
import TokenService from '@/services/token.service'
import { URL_WHITELIST } from '@/constants/app.constant'
import { verifyJwt, extractToken, parseJwt } from '@/helpers/jwt.helper'
import { IUserToken } from '@/interfaces/IUser.interface'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-refresh-token',
  BEARER: 'Bearer '
}

const ignoreWhiteList = (request: Request) => {
  return URL_WHITELIST.includes(request.url)
}

export const authentication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (ignoreWhiteList(req)) return next()

      const clientId = req.headers[HEADER.CLIENT_ID]
      const refreshToken = extractToken(req.headers[HEADER.REFRESH_TOKEN])
      const accessToken = extractToken(req.headers[HEADER.AUTHORIZATION])

      // 1. check user id
      const obj = parseJwt(accessToken || refreshToken)

      if (!obj.user_id) throw new Api403Error('Invalid request')

      // 2. check user id
      const user_id = clientId || obj.user_id
      if (!user_id) throw new Api403Error('Invalid request')

      const token = await TokenService.findTokenByUserId(user_id)

      if (refreshToken && token.private_key) {
        try {
          const decodeUser: IUserToken = verifyJwt(
            refreshToken,
            token.private_key
          )
          if (user_id !== decodeUser.user_id)
            throw new Api401Error('Unauthorized')

          req.user = decodeUser
          req.token = token
          req.refreshToken = refreshToken

          return next()
        } catch (_error) {
          throw new Api401Error('Unauthorized')
        }
      }

      if (!accessToken) throw new Api403Error('Invalid request')

      if (accessToken && token.public_key) {
        const decodeUser: IUserToken = verifyJwt(accessToken, token.public_key)

        if (user_id !== decodeUser.user_id)
          throw new Api401Error('Unauthorized')

        req.user = decodeUser
        req.token = token
      }
      return next()
    } catch (error) {
      return BaseError.handle(error, res)
    }
  }
)
