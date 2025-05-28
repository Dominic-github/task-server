import { Api401Error, Api403Error } from '@/core/error.response'
import bcrypt from 'bcrypt'
import userModel from '../user.model'
import slugify from 'slugify'

export const createUser = async (email: string, password?: string) => {
  const foundUser = await userModel.findOne({ user_email: email })
  if (foundUser) {
    throw new Api403Error('User already exits')
  }

  const passwordHash = password
    ? await bcrypt.hash(password, 10)
    : await bcrypt.hash(email, 10)

  const user_name = email.split('@')[0]
  const user_slug = slugify(user_name)

  const user = await userModel.create({
    user_email: email,
    user_password: passwordHash,
    user_name: user_name,
    user_slug: user_slug,
    user_role: 0
  })

  if (!user) throw new Api403Error('Create user failed')

  return await findUserById(user._id)
}

export const findUserById = async (user_id: string) => {
  const foundUser = await userModel.findOne(
    { _id: user_id },
    { user_password: 0 }
  )
  if (!foundUser) throw new Api401Error('User not found')
  return foundUser
}

export const updateUserById = async (payload: any) => {
  const foundUser = await findUserById(payload.filter.user_id)
  if (!foundUser) throw new Api401Error('User not found')
  return foundUser.updateOne(payload.filter, payload.update)
}

export const deleteUserById = async (userId: string) => {
  const foundUser = await findUserById(userId)
  return foundUser
}

export const findUserByEmail = async (email: string) => {
  const foundUser = await userModel.findOne({
    user_email: email
  })
  if (!foundUser) throw new Api401Error('User not found')
  return foundUser
}
