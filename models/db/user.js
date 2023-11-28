import { createClient } from '@libsql/client'
import 'dotenv/config'

const client = createClient({
  url: process.env.DB_URI,
  authToken: process.env.DB_AUTH_TOKEN
})

// if (process.env.NODE_ENV === 'development') {
//   await client.execute('DROP TABLE IF EXISTS user')
//   console.log('Dropped table todo')
// }

await client.execute(`
  CREATE TABLE IF NOT EXISTS user (
      id VARCHAR(36) NOT NULL,
      handle VARCHAR(25),
      email VARCHAR(255),
      PRIMARY KEY (id)
    );
`)

export class UserModel {
  static async getAll () {
    try {
      const result = await client.execute('SELECT * FROM user')

      return result.rows
    } catch (err) {
      console.error(err)
      return []
    }
  }

  static async getById ({ id }) {
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM user WHERE id = :id',
        args: { id }
      })

      return result?.rows[0] ?? null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  static async create ({ input }) {
    const randomId = crypto.randomUUID()

    try {
      const result = await client.execute({
        sql: 'INSERT INTO user (id, handle, email) VALUES (:id, :handle, :email)',
        args: {
          id: randomId,
          handle: input.handle,
          email: input.email
        }
      })

      if (result.affectedRows !== 1) {
        throw new Error('Failed to create user')
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
        sql: 'DELETE FROM user WHERE id = :id',
        args: { id }
      })

      if (result.affectedRows !== 1) {
        throw new Error('Failed to delete user')
      }

      return true
    } catch (err) {
      console.error(err)
      return null
    }
  }

  static async update ({ id, input }) {
    try {
      const updateFields = Object.keys(input).map(key => `${key} = :${key}`).join(', ')

      const result = await client.execute({
        sql: `UPDATE user SET ${updateFields} WHERE id = :id`,
        args: {
          id,
          ...input
        }
      })

      if (result.affectedRows !== 1) {
        throw new Error('Failed to update user')
      }

      return this.getById({ id })
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
