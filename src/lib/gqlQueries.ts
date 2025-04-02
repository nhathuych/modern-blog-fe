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

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`
