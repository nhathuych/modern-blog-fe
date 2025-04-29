import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookie } from './lib/auth-cookie';

export async function middleware(request: NextRequest) {
  const userInfo = await getUserFromCookie()

  if (!userInfo?.user) return NextResponse.redirect(new URL('/auth/signin', request.url))
}

export const config = {
  matcher: ['/user/:path*'],
}
