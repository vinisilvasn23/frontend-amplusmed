import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api } from './api/api'
import { noNecessaryAuthRoutes } from './utils/no-necessary-auth-routes'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('access_token')

  const isNoNecessaryAuthRoute = noNecessaryAuthRoutes.some(
    (route) => route === request.nextUrl.pathname,
  )

  if (!cookie && !isNoNecessaryAuthRoute) {
    const response = NextResponse.redirect(new URL('/', request.url))
    return response
  }

  if (cookie && isNoNecessaryAuthRoute) {
    await api.get('auth/profile', {
      headers: { Authorization: 'Bearer ' + cookie.value },
    })
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
