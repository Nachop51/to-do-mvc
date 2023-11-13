import { validatePartialTodo, validateTodo } from '../schemas/todos.js'

export class TodoController {
  constructor ({ todoModel }) {
    this.todoModel = todoModel
  }

  getAllTodos = async (req, res) => {
    const todos = await this.todoModel.getAll()

    return res.json(todos)
  }

  getTodoById = async (req, res) => {
    const { id } = req.params

    const todo = await this.todoModel.getById({ id })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.status(200).json({ todo })
  }

  createTodo = async (req, res) => {
    const result = validateTodo(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const todo = await this.todoModel.create({ input: result.data })

    return res.status(201).json(todo)
  }

  deleteTodo = async (req, res) => {
    const { id } = req.params

    const result = await this.todoModel.delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.status(204).json({ message: 'Todo deleted' })
  }

  updateTodo = async (req, res) => {
    const result = validatePartialTodo(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedTodo = await this.todoModel.update({ id, input: result.data })

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.status(200).json(updatedTodo)
  }
}
