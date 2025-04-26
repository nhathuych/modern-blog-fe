import { setUserCookie } from '@/lib/auth-cookie';
import { BACKEND_URL } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId')
  const name = searchParams.get('name')
  const avatar = searchParams.get('avatar')
  const accessToken = searchParams.get('accessToken')

  if (!userId || !name || !accessToken) throw new Error('Google oauth failed.')

  const res = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: { authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) throw new Error('Google oauth failed.')

  await setUserCookie({
    user: {
      id: userId,
      name: name,
      avatar: avatar ?? undefined,
    },
    accessToken: accessToken,
  })

  redirect('/')
}
