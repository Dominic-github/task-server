import AuthService from '@/services/auth.service'
import catchAsync from '@/helpers/catchAsync.helper'
import { OK } from '@/core/success.response'
import { BaseError } from '@/core/error.response'

import { Request, Response } from 'express'

class AuthController {
  login = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(res, 'Login success', await AuthService.login(req.body))
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  register = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(res, 'Register success', await AuthService.register(req.body))
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  registerOrLoginWithSSO = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Login with SSO sucess',
        await AuthService.registerOrLoginUserWithSSO(req.body)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Get token success',
        await AuthService.refreshToken({
          refreshToken: req.refreshToken,
          user: req.user,
          token: req.token
        })
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  forgetPassword = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Forget password success',
        await AuthService.forgetPassword(req.body.email)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  // checkRegisterEmailToken = catchAsync(async (req: Request, res: Response) => {
  //   OK(
  //     res,
  //     'check login with email success',
  //     await AuthService.checkRegisterEmailToken(req.query.token)
  //   )
  // })

  logout = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(res, 'Logout success', await AuthService.logout(req.token))
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })
}

export default new AuthController()
