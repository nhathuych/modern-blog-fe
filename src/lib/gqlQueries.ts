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

export const GET_COMMENTS_BY_POST = gql`
  query getCommentsByPost($postId: Int!, $take: Int, $skip: Int) {
    getCommentsByPost(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      user {
        id
        name
        avatar
      }
    }

    getTotalByPost(postId: $postId)
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`

// Optional query name (e.g., PostLikeData); can be anything.
export const GET_POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    getPostLikes(postId: $postId)
    isUserLikedPost(postId: $postId)
  }
`

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`

export const UNLIKE_POST_MUTATION = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`

export const GET_USER_POSTS = gql`
  query getUserPosts($skip: Int, $take: Int) {
    getUserPosts(skip: $skip, take: $take) {
      id
      slug
      title
      content
      published
      thumbnail
      createdAt
      _count {
        likes
        comments
      }
    }
    getUserPostCount
  }
`
