import { z } from 'zod';

export const PostFormSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  thumbnail: z.instanceof(File).optional(),
  published: z.string().transform(val => val === 'on'),
  tags: z
    .string()
    .min(1)
    .refine(val => val.split(',').every(tag => tag.trim() !== ''))
    .transform(val => val.split(',')),
})
