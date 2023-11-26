import { createClient } from '@libsql/client'
import 'dotenv/config'

const client = createClient({
  url: process.env.DB_URI,
  authToken: process.env.DB_AUTH_TOKEN
})

// if (process.env.NODE_ENV === 'development') {
//   await client.execute('DROP TABLE IF EXISTS todo')
//   console.log('Dropped table todo')
// }

await client.execute(`
  CREATE TABLE IF NOT EXISTS todo (
    id VARCHAR(36) NOT NULL,
    title TEXT,
    description TEXT,
    done BOOLEAN,
    PRIMARY KEY (id)
  );
`)

export class TodoModel {
  static async getAll () {
    try {
      const result = await client.execute('SELECT id, title, description, done FROM todo')

      return result.rows
    } catch (err) {
      console.error(err)
      return []
    }
  }

  static async getById ({ id }) {
    try {
      const result = await client.execute({
        sql: 'SELECT id, title, description, done FROM todo WHERE id = :id',
        args: { id }
      })

      return result.rows[0] ?? null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  static async create ({ input }) {
    const randomId = crypto.randomUUID()

    try {
      const result = await client.execute({
        sql: 'INSERT INTO todo (id, title, description, done) VALUES (:id, :title, :description, :done)',
        args: {
          id: randomId,
          title: input.title,
          description: input.description,
          done: false
        }
      })

      if (result.rowsAffected !== 1) {
        throw new Error('Failed to create todo')
      }

      return this.getById({ id: randomId })
    } catch (err) {
      console.error(err)
      return null
    }
  }

  static async delete ({ id }) {
    try {
      const result = await client.execute({
        sql: 'DELETE FROM todo WHERE id = :id',
        args: { id }
      })

      if (result.rowsAffected !== 1) {
        return false
      }

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  static async update ({ id, input }) {
    try {
      // update dynamically based on input
      const updateFields = Object.keys(input).map((key) => `${key} = :${key}`).join(', ')

      const result = await client.execute({
        sql: `UPDATE todo SET ${updateFields} WHERE id = :id`,
        args: {
          id,
          ...input
        }
      })

      if (result.rowsAffected !== 1) {
        return null
      }

      return this.getById({ id })
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
