'use server'
import { fetchGraphQL } from "../fetch-graphql"
import { GET_POSTS } from "../gqlQueries"
import { print } from 'graphql'
import { Post } from "../types/model-types.d"

export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS))
  if (data.errors) throw new Error(data.errors[0].message)

  return data.posts as Post[]
}
