'use server'
import { fetchGraphQL } from "../fetch-graphql"
import { GET_POST_BY_ID, GET_POSTS } from "../gqlQueries"
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
