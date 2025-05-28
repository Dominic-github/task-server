import { Schema, model, models } from 'mongoose'
import ITodo from '@/interfaces/ITodo.interface'

const DOCUMENT_NAME = 'Todo'
const COLLECTION_NAME = 'Todos'

const todoSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    todo_title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    todo_description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    todo_completed: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

export default models.Todo || model<ITodo>(DOCUMENT_NAME, todoSchema)
