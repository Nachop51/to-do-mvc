import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'

describe('api', () => {
  const todos = []

  it('should return a 200 status code for GET /todos', async () => {
    const response = await request(app).get('/todos')
    expect(response.status).toBe(200)
  })

  it('should return a 404 status code for GET /nonexistent', async () => {
    const response = await request(app).get('/nonexistent')
    expect(response.status).toBe(404)
  })

  it('should create a new todo with POST /todos', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: 'New Todo', description: 'My new to do' })

    if (response.status !== 201) throw new Error(response.text)

    todos.push(response.body)

    expect(response.status).toBe(201)
    expect(response.body.title).toBe('New Todo')
    expect(response.body.description).toBe('My new to do')
    expect(response.body.done).toBe(false)
  })

  it('should update an existing todo with PUT /todos/:id', async () => {
    if (!todos.length) throw new Error('No todos to update')

    const response = await request(app)
      .put(`/todos/${todos[0].id}`)
      .send({ title: 'Updated Todo', done: true })
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Updated Todo')
    expect(response.body.done).toBe(true)
  })

  it('should delete an existing todo with DELETE /todos/:id', async () => {
    if (!todos.length) throw new Error('No todos to update')

    const response = await request(app).delete(`/todos/${todos[0].id}`)
    expect(response.status).toBe(204)
  })
})
