'use server'

import { fetchGraphQLWithAuth, fetchGraphQL } from "../fetch-graphql"
import { print } from 'graphql'
import { CREATE_COMMENT_MUTATION, GET_COMMENTS_BY_POST } from "../gqlQueries"
import { Comment } from "../types/model-types.d"
import { CreateCommentFormState } from "../types/form-state"
import { CommentFormSchema } from "../zodSchema/comment-form.schema"

export async function getCommentsByPost({ postId, take, skip }: { postId: number, take: number, skip: number }) {
  const data = await fetchGraphQL(print(GET_COMMENTS_BY_POST), {
    postId,
    take,
    skip,
  })

  return {
    comments: data.getCommentsByPost as Comment[],
    total: data.getTotalByPost as number,
  }
}

export async function saveComment(state: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) return {
    data: Object.fromEntries(formData.entries()),
    errors: validatedFields.error.flatten().fieldErrors,
  }

  const data = await fetchGraphQLWithAuth(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    }
  })

  if (data) return {
    message: 'Comment created successfully.',
    ok: true,
    open: false,
  }

  return {
    data: Object.fromEntries(formData.entries()),
    message: 'Failed to create comment.',
    ok: false,
    open: true,
  }
}
