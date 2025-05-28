export default interface IUser {
  _id: string
  user_name: string | null
  user_email: string
  user_slug?: string | null
  user_password: string
  user_verify: boolean
  user_avatar?: string
  user_role: number
  user_sso?: {
    provider: string
    google_id: string
    access_token: string
  }
}

export interface IUserUpdate {
  user_name?: string
  user_email?: string
  user_avatar?: string
  user_password?: string
  user_new_password?: string
  currentPassword?: string
  newPassword?: string
  user_slug?: string
  user_verify?: boolean
  user_role?: number
  user_sso?: {
    provider: string
    google_id: string
    access_token: string
  }
}

export interface IUserToken {
  user_id: string
  user_email: string
  iat?: number
  exp?: number
}
