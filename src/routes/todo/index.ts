import express from 'express'
import { authentication } from '@/middlewares/auth.middleware'
import todoController from '@/controllers/todo.controller'
const router = express.Router()

router.use(authentication)
router.get('/', todoController.getAllTodo)
router.get('/day', todoController.getAllTodoDay)

router.post('/', todoController.createTodo)
router.patch('/:todoId', todoController.updateTodo)
router.patch('/:todoId/toggle', todoController.toggleTodoCompleted)

router.delete('/:todoId', todoController.deleteTodo)
router.delete('/all/day', todoController.deleteAllTodosDay)

export default router
