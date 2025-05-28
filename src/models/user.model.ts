import { Schema, model, models } from 'mongoose'
import IUser from '@/interfaces/IUser.interface'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: false
    },
    user_email: {
      type: String,
      required: true,
      unique: true
    },
    user_slug: {
      type: String,
      required: false
    },
    user_avatar: {
      type: String,
      required: false
    },
    user_password: {
      type: String,
      required: false
    },
    user_verify: {
      type: Boolean,
      default: false
    },
    user_role: {
      type: Number,
      required: true,
      default: 0
    },
    user_sso: {
      type: Map,
      of: Schema.Types.Mixed,
      required: false
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

export default models.User || model<IUser>(DOCUMENT_NAME, userSchema)
