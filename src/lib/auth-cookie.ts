import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type UserInfo = {
  id?: string,
  name?: string,
  avatar?: string,
}

export type Payload = {
  user: UserInfo,
  accessToken: string,
}

const secretKey = process.env.COOKIES_AUTH_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

const COOKIE_AUTH_KEY = 'authToken'
const COOKIE_JWT_ALGORITHM = 'HS256'

export async function setUserCookie(payload: Payload) {
  const userAuthToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: COOKIE_JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(encodedKey)

  const cookieStore = await cookies()
  const expiredAt = new globalThis.Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  cookieStore.set(COOKIE_AUTH_KEY, userAuthToken, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies()
    const userAuthToken = cookieStore.get(COOKIE_AUTH_KEY)?.value

    if (!userAuthToken) return null

    const { payload } = await jwtVerify(userAuthToken, encodedKey, { algorithms: [COOKIE_JWT_ALGORITHM] })

    return payload as Payload
  } catch (error) {
    console.error('Jwt verification failed:', error)
    redirect('/auth/signin')
  }
}

export async function clearUserCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_AUTH_KEY)
}
