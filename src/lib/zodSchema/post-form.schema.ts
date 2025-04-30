import { z } from 'zod';

export const PostFormSchema = z.object({
  id: z.string().transform(val => parseInt(val)).optional(),
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  thumbnail: z.instanceof(File).optional(),
  published: z.string().transform(val => val === 'on'),
  tags: z
    .string()
    .optional()
    .refine(val => !val || val.split(',').every(tag => tag.trim() !== ''), { message: 'Each tag must be non-empty' })
    .transform(val => (val ? val.split(',').map(tag => tag.trim()) : [])),
})
