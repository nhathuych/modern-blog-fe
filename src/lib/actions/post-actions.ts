'use server'
import { fetchGraphQL, fetchGraphQLWithAuth } from "../fetch-graphql"
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from "../gqlQueries"
import { print } from 'graphql'
import { Post } from "../types/model-types.d"
import { transformTakeSkip } from "../pagy"

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
