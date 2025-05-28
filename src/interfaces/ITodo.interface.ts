export default interface ITodo {
  _id: string
  user_id: string
  todo_title: string
  todo_description?: string
  todo_completed: boolean
  createdAt: Date
  updatedAt: Date
}
