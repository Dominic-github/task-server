import { Api403Error, BaseError } from '@/core/error.response'
import { Response, Request, NextFunction } from 'express'

export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/
  return regex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,}$/
  return regex.test(password)
}

export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginRequest = req.body
  // check email
  if (!loginRequest.email || !isValidEmail(loginRequest.email)) {
    throw BaseError.handle(new Api403Error('Email invalid'), res)
  }
  // check password
  if (!loginRequest.password || !isValidPassword(loginRequest.password)) {
    throw BaseError.handle(new Api403Error('Password invalid'), res)
  }

  return next()
}

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerRequest = req.body

  // check email
  if (!registerRequest.email || !isValidEmail(registerRequest.email)) {
    throw BaseError.handle(new Api403Error('Email invalid'), res)
  }
  // check password
  if (!registerRequest.password || !isValidPassword(registerRequest.password)) {
    throw BaseError.handle(new Api403Error('Password invalid'), res)
  }

  // check confirm password
  if (
    !registerRequest.confirmPassword ||
    !isValidPassword(registerRequest.confirmPassword) ||
    registerRequest.password !== registerRequest.confirmPassword
  ) {
    throw BaseError.handle(new Api403Error('Confirm password invalid'), res)
  }

  return next()
}
