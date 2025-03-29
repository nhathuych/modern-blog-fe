import { BACKEND_URL } from './constants'

export const fetchGraphQL = async (query: string, variables = {}) => {
  const res = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const result = await res.json()
  if (result.errors) {
    console.log('GraphQL errors:', result.errors)
    throw new Error(`GraphQL errors: ${result.errors}`)
  }

  return result.data
}
