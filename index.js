import express, { json } from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import { createTodoRouter } from './routes/todos.js'
// import { TodoModel } from './models/local/todo.js'
import { TodoModel } from './models/db/todo.js'
import 'dotenv/config.js'
import { createUserRouter } from './routes/users.js'
import { UserModel } from './models/db/user.js'

const app = express()
const logger = morgan('dev')

app.use(logger)
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World 🐷' })
})

app.use('/todos', createTodoRouter({ todoModel: TodoModel }))
app.use('/users', createUserRouter({ userModel: UserModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => console.log(`server listening on port http://localhost:${PORT}`))

export default app
