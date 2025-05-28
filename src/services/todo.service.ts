import { Api403Error } from '@/core/error.response'
import todoModel from '@/models/todo.model'

class TodoService {
  createTodo = async (userId: string, todoData: any) => {
    const createdTodo = await todoModel.create({
      user_id: userId,
      todo_title: todoData.todo_title,
      todo_description: todoData.todo_description || '',
      todo_completed: false,
      createdAt: todoData.createdAt || new Date()
    })
    if (!createdTodo) {
      throw new Api403Error('Todo creation failed')
    }

    const findTodo = await todoModel.findById(createdTodo._id)
    if (!findTodo) {
      throw new Api403Error('Todo creation failed')
    }
    return findTodo
  }

  updateTodo = async (todoId: string, todoData: any) => {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoId,
      {
        ...todoData
      },
      { new: true }
    )

    if (!updatedTodo) {
      throw new Api403Error('Todo not found or update failed')
    }

    return updatedTodo
  }

  toggleTodoCompleted = async (todoId: string) => {
    const todo = await todoModel.findById(todoId)
    if (!todo) {
      throw new Api403Error('Todo not found')
    }

    todo.todo_completed = !todo.todo_completed

    const updatedTodo = await todo.save()
    if (!updatedTodo) {
      throw new Api403Error('Failed to toggle todo completion')
    }

    return updatedTodo
  }

  deleteTodo = async (todoId: string) => {
    const deletedTodo = await todoModel.findByIdAndDelete(todoId)
    if (!deletedTodo) {
      throw new Api403Error('Todo not found or delete failed')
    }
    return deletedTodo
  }

  deleteAllTodosDay = async (userId: string, params: any) => {
    const { day } = params
    let startDate = new Date()
    let endDate = new Date()

    if (day) {
      const dayDate = new Date(day)
      startDate = new Date(dayDate)
      startDate.setHours(0, 0, 0, 0)
      endDate = new Date(dayDate)
      endDate.setHours(23, 59, 59, 999)
    }

    const deletedTodos = await todoModel.deleteMany({
      user_id: userId,
      createdAt: {
        $gte: startDate,
        $lt: endDate
      }
    })

    return deletedTodos
  }

  getAllTodos = async (userId: string) => {
    const todos = await todoModel
      .find({ user_id: userId })
      .sort({ createdAt: -1 })
    if (!todos || todos.length === 0) {
      return {
        todos: []
      }
    }
    return todos
  }

  getAllTodoByDay = async (userId: string, params: any) => {
    const { fromDay, toDay } = params
    const { day } = params
    let startDate = new Date()
    let endDate = new Date()

    if (fromDay && toDay) {
      startDate = new Date(fromDay)
      startDate.setHours(0, 0, 0, 0) // Set to start of the day
      endDate = new Date(toDay)
      endDate.setHours(23, 59, 59, 999) // Set to end of the day
      if (startDate > endDate) {
        throw new Api403Error('Start date cannot be after end date')
      }
    }

    if (day) {
      const dayDate = new Date(day)
      startDate = new Date(dayDate)
      startDate.setHours(0, 0, 0, 0) // Set to start of the day
      endDate = new Date(dayDate)
      endDate.setHours(23, 59, 59, 999) // Set to end of the day
    }

    const todos = await todoModel
      .find({
        user_id: userId,
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      })
      .sort({ createdAt: -1 })
    return todos
  }
}

export default new TodoService()
