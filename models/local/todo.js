import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const todos = readJSON('./mocks/todos.json')

export class TodoModel {
  static async getAll () {
    return todos
  }

  static async getById ({ id }) {
    return todos.find(todo => todo.id === id)
  }

  static async create ({ input }) {
    const newTodo = {
      id: randomUUID(),
      ...input,
      done: false
    }

    todos.push(newTodo)

    return newTodo
  }

  static async delete ({ id }) {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex === -1) {
      return false
    }

    todos.splice(todoIndex, 1)

    return true
  }

  static async update ({ id, input }) {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex === -1) {
      return false
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...input
    }

    todos[todoIndex] = updatedTodo

    return updatedTodo
  }
}
