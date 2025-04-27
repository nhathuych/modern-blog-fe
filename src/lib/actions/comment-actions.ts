'use server'

import { fetchGraphQL } from "../fetch-graphql"
import { print } from 'graphql'
import { GET_COMMENTS_BY_POST } from "../gqlQueries"
import { Comment } from "../types/model-types.d"

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
