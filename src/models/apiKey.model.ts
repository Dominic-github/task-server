import { Schema, model, models } from 'mongoose'

import IObjKey from '@/interfaces/IObjKey.interface'

const DOCUMENT_NAME = 'Apikey'
const COLLECTION_NAME = 'Apikeys'

let apiKeySchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222']
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

export default models.Token || model<IObjKey>(DOCUMENT_NAME, apiKeySchema)
