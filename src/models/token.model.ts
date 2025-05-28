import { model, models, Schema } from 'mongoose'
import IToken from '@/interfaces/IToken.interface'

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'

const tokenSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    public_key: {
      type: String,
      required: true
    },
    private_key: {
      type: String,
      required: true
    },
    refresh_token: {
      type: String,
      required: true
    },
    refresh_token_used: {
      type: [String],
      default: []
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

export default models.Token || model<IToken>(DOCUMENT_NAME, tokenSchema)
