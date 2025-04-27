import { z } from 'zod';

export const CommentFormSchema = z.object({
  postId: z.string().transform((val) => parseInt(val)).refine(val => !isNaN(val)),
  content: z.string().min(1)
})
