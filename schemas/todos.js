import z from 'zod'

export const todoSchema = z.object({
  title: z.string({ message: 'Title is required and must be a string' }),
  description: z.string({ message: 'Description is required and must be a string' }),
  done: z.boolean({ message: 'Done must be a boolean' }).optional()
})

export function validateTodo (object) {
  return todoSchema.safeParse(object)
}

export function validatePartialTodo (object) {
  return todoSchema.partial().safeParse(object)
}
