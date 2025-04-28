'use server'

import { fetchGraphQLWithAuth } from '../fetch-graphql'
import { GET_POST_LIKES, LIKE_POST_MUTATION, UNLIKE_POST_MUTATION } from '../gqlQueries'
import { print } from 'graphql'

export async function getPostLikeData(postId: number) {
  const results = await fetchGraphQLWithAuth(print(GET_POST_LIKES), { postId })

  return {
    totalLikes: results.getPostLikes as number,
    isUserLikedPost: results.isUserLikedPost as boolean,
  }
}

export async function likePost(postId: number) {
  return await fetchGraphQLWithAuth(print(LIKE_POST_MUTATION), { postId })
}

export async function unlikePost(postId: number) {
  return await fetchGraphQLWithAuth(print(UNLIKE_POST_MUTATION), { postId })
}
