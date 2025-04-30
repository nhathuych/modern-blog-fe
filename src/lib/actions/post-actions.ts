'use server'

import { fetchGraphQL, fetchGraphQLWithAuth } from "../fetch-graphql"
import { CREATE_POST_MUTATION, DELETE_POST_MUTATIOM, GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS, UPDATE_POST_MUTATION } from "../gqlQueries"
import { print } from 'graphql'
import { Post } from "../types/model-types.d"
import { transformTakeSkip } from "../pagy"
import { PostFormState } from "../types/form-state"
import { PostFormSchema } from "../zodSchema/post-form.schema"
import { deleteThumbnail, uploadThumbnail } from "../upload-files"

export const fetchPosts = async ({ page, pageSize }: { page?: number, pageSize?: number }) => {
  const { skip, take } = transformTakeSkip({ page, pageSize })

  const data = await fetchGraphQL(print(GET_POSTS), { skip, take })
  if (data.errors) throw new Error(data.errors[0].message)

  return {
    posts: data.posts as Post[],
    totalPosts: data.postCount as number,
  }
}

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id })
  return data.findPostById as Post
}

export const fetchUserPosts = async ({ page, pageSize }: { page?: number, pageSize?: number }) => {
  const { take, skip } = transformTakeSkip({ page, pageSize })
  const data = await fetchGraphQLWithAuth(print(GET_USER_POSTS), { take, skip })

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.getUserPostCount as number,
  }
}

export const savePost = async (state: PostFormState, formData: FormData): Promise<PostFormState> => {
  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) return {
    data: Object.fromEntries(formData.entries()),
    errors: validatedFields.error.flatten().fieldErrors,
  }

  let thumbnailUrl = ''
  const { id, ...attrs } = validatedFields.data
  if (attrs.thumbnail?.size) {
    thumbnailUrl = await uploadThumbnail(attrs.thumbnail)
  }

  const data = await fetchGraphQLWithAuth(print(CREATE_POST_MUTATION), {
    input: {
      ...attrs,
      thumbnail: thumbnailUrl,
    },
  })

  if (data) return { message: 'Post created successfully.', ok: true }
  return {
    data: Object.fromEntries(formData.entries()),
    message: 'Failed to create post.'
  }
}

export const updatePost = async (state: PostFormState, formData: FormData): Promise<PostFormState> => {
  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) return {
    data: Object.fromEntries(formData.entries()),
    errors: validatedFields.error.flatten().fieldErrors,
  }

  let thumbnailUrl = ''
  const { thumbnail, ...inputs } = validatedFields.data
  if (thumbnail && thumbnail.size !== 0) thumbnailUrl = await uploadThumbnail(thumbnail)

  const data = await fetchGraphQLWithAuth(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  })

  if (data) return { message: 'Post updated successfully.', ok: true }
  return {
    data: Object.fromEntries(formData.entries()),
    message: 'Failed to update post.'
  }
}

export const deletePost = async (post: Post) => {
  const data = await fetchGraphQLWithAuth(print(DELETE_POST_MUTATIOM), { id: post.id })

  let fileName = null
  if (post.thumbnail) fileName = post.thumbnail?.split(`/object/public/${process.env.SUPABASE_BUCKET_NAME}/`)[1]
  if (data.deletePost && fileName) deleteThumbnail(fileName)

  return data.deletePost
}
