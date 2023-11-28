import { validatePartialUser, validateUser } from '../schemas/users.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll()

    if (!users) {
      res.status(404).json({ message: 'No users found' })
      return
    }

    res.json(users)
  }

  getById = async (req, res) => {
    const user = await this.userModel.getById({ id: req.params.id })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  }

  create = async (req, res) => {
    const result = validateUser(req.body)

    if (!result.success) {
      res.status(400).json({ message: result.error.message })
      return
    }

    const user = await this.userModel.create({ input: result.data })

    if (!user) {
      res.status(500).json({ message: 'Failed to create user' })
      return
    }

    res.json(user)
  }

  update = async (req, res) => {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      res.status(400).json({ message: result.error.message })
      return
    }

    const user = await this.userModel.update({ id: req.params.id, input: result.data })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  }

  delete = async (req, res) => {
    const user = await this.userModel.delete({ id: req.params.id })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  }

  getTodos = async (req, res) => {
    const todos = await this.userModel.getTodos({ id: req.params.id })

    if (!todos) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(todos)
  }
}
