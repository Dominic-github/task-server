import { Request, Response, NextFunction } from 'express'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}
import { findbyKey } from '@/models/repository/apiKey.repo'
import { URL_WHITELIST } from '@/constants/app.constant'

export const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (ignoreWhiteList(req)) return next()

    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res
    }
    // check objKey
    const objKey = await findbyKey(key)
    if (!objKey) {
      return returnForbiddenError(res)
    }

    req.objKey = objKey

    return next()
  } catch (error) {
    console.error(`apiKey middleware error:: `, error)
    return returnForbiddenError(res)
  }
}

export const permission = (permissions: string): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (ignoreWhiteList(req)) return next()

    if (!req.objKey.permissions) {
      return returnPermissionDenied(res)
    }

    const validPermission = req.objKey.permissions.includes(permissions)

    if (!validPermission) {
      return returnPermissionDenied(res)
    }

    return next()
  }
}

const throwApi403Error = (message: string) => {
  return {
    message: message
  }
}

const returnApi403Error = (res: Response, message: string) => {
  return res.status(403).json(throwApi403Error(message))
}

const returnForbiddenError = (res: Response) => {
  return returnApi403Error(res, 'Forbidden Error')
}

const returnPermissionDenied = (res: Response) => {
  return returnApi403Error(res, 'Permission denied')
}

export const ignoreWhiteList = (req: Request) => {
  return URL_WHITELIST.includes(req.url)
}
