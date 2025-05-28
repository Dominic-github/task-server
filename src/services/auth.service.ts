import TokenService from '@/services/token.service'
import { createTokenPair } from '@/helpers/jwt.helper'
import {
  Api403Error,
  Api401Error,
  BusinessLogicError
} from '@/core/error.response'
import { createUser, findUserByEmail } from '@/models/repository/user.repo'
import userModel from '@/models/user.model'
import tokenService from '@/services/token.service'
import bcrypt from 'bcrypt'
import IToken from '@/interfaces/IToken.interface'
import slugify from 'slugify'
import tokenModel from '@/models/token.model'
import { IUserToken } from '@/interfaces/IUser.interface'

class Auth {
  register = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    const user = await createUser(email, password)

    // Token
    const { publicKey, privateKey } = await tokenService.createKey()
    const user_id = user._id
    const tokens = await createTokenPair(
      {
        user_id: user_id,
        user_email: email
      },
      publicKey,
      privateKey
    )
    if (!tokens) throw new Api403Error('Token is invalid')

    await tokenService.createKeyToken({
      user_id: user_id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken
    })

    return {
      user,
      tokens
    }
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    const foundUser = await findUserByEmail(email)

    const match = await bcrypt.compare(password, foundUser.user_password)
    if (!match) throw new BusinessLogicError('Authentication failed')

    const { publicKey, privateKey } = await tokenService.createKey()

    const user_id = foundUser._id

    const tokens = await createTokenPair(
      {
        user_id: user_id,
        user_email: email
      },
      publicKey,
      privateKey
    )
    if (!tokens) throw new Api403Error('Token is invalid')

    await tokenService.createKeyToken({
      user_id: user_id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })

    delete foundUser.user_password // remove password from user object

    return {
      user: foundUser,
      tokens
    }
  }

  registerOrLoginUserWithSSO = async (googleUser: any) => {
    let user = await userModel.findOne({ user_email: googleUser.email })

    if (!user) {
      const passwordHash = bcrypt.hash(googleUser.email, 10)
      user = new userModel({
        user_email: googleUser.email,
        user_name: googleUser.name,
        user_password: passwordHash,
        user_slug: slugify(googleUser.name),
        user_sso: {
          provider: 'google',
          google_id: googleUser.google_id,
          access_token: googleUser.access_token
        },
        user_role: 0
      })

      await user.save()
    } else {
      user.user_sso = {
        provider: 'google',
        google_id: googleUser.google_id,
        access_token: googleUser.access_token
      }

      await user.save()
    }

    return user
  }

  logout = async (token: IToken) => {
    const delKey = await TokenService.deleteTokenById(token.user_id)
    if (!delKey) throw new Api403Error('Logout failed')
    return delKey
  }

  /**
   * Check this token used?
   * @param refreshToken
   * @param user
   * @param token
   * @returns {Promise<void>}
   */
  refreshToken = async ({
    refreshToken,
    user,
    token
  }: {
    refreshToken: string
    user: IUserToken
    token: IToken
  }) => {
    const { user_id, user_email } = user

    if (token.refresh_token_used.includes(refreshToken)) {
      await TokenService.deleteTokenById(user_id)
      throw new Api403Error()
    }

    if (refreshToken !== token.refresh_token) throw new Api401Error()

    const foundUser = await findUserByEmail(user_email)
    if (!foundUser) throw new Api401Error()

    const tokens = await createTokenPair(
      {
        user_id: user_id,
        user_email: user_email
      },
      token.public_key,
      token.private_key
    )

    const refreshTokensUsed = [...token.refresh_token_used, refreshToken]

    await tokenModel.updateOne(
      { user_id: user_id },
      {
        refresh_token: tokens?.refreshToken,
        refresh_token_used: refreshTokensUsed
      }
    )

    return {
      user: foundUser,
      tokens
    }
  }

  forgetPassword = async (_email: string) => {
    return {}
  }

  // checkRegisterEmailToken = async (token: any) => {
  //   // check token in model otp
  //   const { otp_email: email } = await OtpService.checkEmailToken(token)

  //   if (!email) {
  //     throw new BusinessLogicError('Token not found')
  //   }
  //   // check email exists in user model
  //   const foundUser = await prisma.user.findUnique({
  //     where: {
  //       user_email: email
  //     }
  //   })
  //   if (foundUser) throw new BusinessLogicError('Email already exists')

  //   const newUser = await createUserByEmail(email)
  //   if (!newUser) {
  //     throw new BusinessLogicError('User not Created')
  //   }

  //   // create private key, public key
  //   const { publicKey, privateKey } = await tokenService.createKey()

  //   // 4. generate tokens
  //   const { user_id } = newUser
  //   const tokens = await createTokenPair(
  //     {
  //       user_id: user_id,
  //       user_email: email
  //     },
  //     publicKey,
  //     privateKey
  //   )
  //   if (!tokens) throw new Api403Error(translate('messages.error002'))

  //   // 5. save to db
  //   await tokenService.createKeyToken({
  //     user_id: user_id,
  //     privateKey,
  //     publicKey,
  //     refreshToken: tokens.refreshToken
  //   })

  //   // apiKey
  //   const newKey = await prisma.apiKey.create({
  //     data: {
  //       key: crypto.randomBytes(64).toString('hex'),
  //       permissions: ['0000']
  //     }
  //   })

  //   return {
  //     user: newUser,
  //     tokens,
  //     key: getInfoData({
  //       fields: ['key'],
  //       object: newKey
  //     })
  //   }
  // }
}

export default new Auth()
