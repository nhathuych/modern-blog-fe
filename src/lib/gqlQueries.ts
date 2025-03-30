import gql from 'graphql-tag'

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      slug
      content
      thumbnail
      createdAt
    }
    postCount
  }
`

export const GET_POST_BY_ID = gql`
  query findPostById($id: Int!) {
    findPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      user {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`
