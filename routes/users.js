import { Router } from 'express'
import { UserController } from '../controllers/users'

export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router()

  const usersController = new UserController({ userModel })

  usersRouter.get('/', usersController.getAll)
  usersRouter.post('/', usersController.create)

  usersRouter.get('/:id', usersController.getById)
  usersRouter.delete('/:id', usersController.delete)
  usersRouter.put('/:id', usersController.update)

  return usersRouter
}
