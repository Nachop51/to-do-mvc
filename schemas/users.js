import z from 'zod'

export const userSchema = z.object({
  handle: z.string({ message: 'Handle is required and must be a string' }),
  email: z.optional().string({ message: 'Email must be a string' })
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}

export function validatePartialUser (object) {
  return userSchema.partial().safeParse(object)
}
