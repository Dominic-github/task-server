import {
  Api403Error,
  Api404Error,
  BusinessLogicError
} from '@/core/error.response'
import userModel from '@/models/user.model'
import { IUserUpdate } from '@/interfaces/IUser.interface'
import { updateNestedObject } from '@/utils/index.util'

import { deleteUserById, findUserById } from '@/models/repository/user.repo'
import bcrypt from 'bcrypt'
import { isValidPassword } from '@/middlewares/validators/auth.validator'
import slugify from 'slugify'

class UserService {
  getUserById = async (user_id: string) => {
    return await findUserById(user_id)
  }
  getUserByEmail = async (email: string) => {
    const user = await userModel.findOne({
      user_email: email
    })
    if (!user) throw new Api403Error('User not found')
    return user
  }

  updateUser = async (user_id: string, payload: IUserUpdate) => {
    const foundUser = await userModel.findOne({
      _id: user_id
    })
    if (!foundUser) throw new Api403Error('User not found')

    if (payload.currentPassword && payload.newPassword) {
      if (payload.currentPassword === payload.newPassword) {
        throw new BusinessLogicError(
          'New password must be different from current password'
        )
      }
      const isMatch = await bcrypt.compare(
        payload.currentPassword,
        foundUser.user_password
      )
      if (!isMatch) {
        throw new Api403Error('Current password is incorrect')
      }

      if (!isValidPassword(payload.currentPassword)) {
        throw new Api404Error('Current password is invalid')
      }
      if (!isValidPassword(payload.newPassword)) {
        throw new Api404Error('New password is invalid')
      }
      payload.user_password = await bcrypt.hash(payload.newPassword, 10)

      delete payload.currentPassword
      delete payload.newPassword

      payload = updateNestedObject(payload, foundUser)
      const user = await userModel.findOneAndUpdate(
        {
          _id: user_id
        },
        payload,
        { user_password: 0 }
      )
      return await findUserById(user._id)
    } else {
      if (payload.user_name?.trim() == '') {
        throw new Api404Error('User name cannot be empty')
      }
      payload.user_slug = slugify(payload.user_name || foundUser.user_name)
      payload = updateNestedObject(payload, foundUser)
      const user = await userModel.findOneAndUpdate(
        {
          _id: user_id
        },
        payload,
        { user_password: 0 }
      )
      return await findUserById(user._id)
    }
  }

  deleteUser = async (user_id: string) => {
    await findUserById(user_id)
    return await deleteUserById(user_id)
  }
}

export default new UserService()
