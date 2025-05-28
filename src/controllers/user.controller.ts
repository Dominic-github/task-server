import { OK, UPDATED } from '@/core/success.response'
import UserService from '@/services/user.service'
import { Request, Response } from 'express'
import catchAsync from '@/helpers/catchAsync.helper'
import { BaseError } from '@/core/error.response'

class UserController {
  getMe = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Get user success',
        await UserService.getUserById(req.user.user_id)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  getUser = catchAsync(async (req: Request, res: Response) => {
    OK(
      res,
      'Get user success',
      await UserService.getUserByEmail(req.params.email)
    )
  })

  updateUser = catchAsync(async (req: Request, res: Response) => {
    try {
      UPDATED(
        res,
        'Update user success',
        await UserService.updateUser(req.user.user_id, req.body)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  deleteUser = catchAsync(async (req: Request, res: Response) => {
    OK(
      res,
      'Delete user success',
      await UserService.deleteUser(req.params.user_id)
    )
  })
}

export default new UserController()
