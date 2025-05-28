import { OK, CREATED, UPDATED } from '@/core/success.response'
import TodoService from '@/services/todo.service'
import { Request, Response } from 'express'
import catchAsync from '@/helpers/catchAsync.helper'
import { BaseError } from '@/core/error.response'

class TodoController {
  getAllTodo = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Get all todos success',
        await TodoService.getAllTodos(req.user.user_id)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  getAllTodoDay = catchAsync(async (req: Request, res: Response) => {
    try {
      OK(
        res,
        'Get all todos success',
        await TodoService.getAllTodoByDay(req.user.user_id, req.query)
      )
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  createTodo = catchAsync(async (req: Request, res: Response) => {
    try {
      const newTodo = await TodoService.createTodo(req.user.user_id, req.body)
      CREATED(res, 'Create todo success', newTodo)
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })
  toggleTodoCompleted = catchAsync(async (req: Request, res: Response) => {
    try {
      const updatedTodo = await TodoService.toggleTodoCompleted(
        req.params.todoId
      )
      UPDATED(res, 'Toggle todo completed success', updatedTodo)
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })
  updateTodo = catchAsync(async (req: Request, res: Response) => {
    try {
      const updatedTodo = await TodoService.updateTodo(
        req.params.todoId,
        req.body
      )
      UPDATED(res, 'Update todo success', updatedTodo)
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  deleteAllTodosDay = catchAsync(async (req: Request, res: Response) => {
    try {
      const deletedTodos = await TodoService.deleteAllTodosDay(
        req.user.user_id,
        req.query
      )
      OK(res, 'Delete all todos success', deletedTodos)
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })

  deleteTodo = catchAsync(async (req: Request, res: Response) => {
    try {
      const deletedTodo = await TodoService.deleteTodo(req.params.todoId)
      OK(res, 'Delete todo success', deletedTodo)
    } catch (error) {
      return BaseError.handle(error, res)
    }
  })
}

export default new TodoController()
