import { Router } from 'express'
import { TodoController } from '../controllers/todos.js'

export const createTodoRouter = ({ todoModel }) => {
  const todosRouter = Router()

  const todosController = new TodoController({ todoModel })

  todosRouter.get('/', todosController.getAllTodos)
  todosRouter.post('/', todosController.createTodo)

  todosRouter.get('/:id', todosController.getTodoById)
  todosRouter.delete('/:id', todosController.deleteTodo)
  todosRouter.put('/:id', todosController.updateTodo)

  return todosRouter
}
