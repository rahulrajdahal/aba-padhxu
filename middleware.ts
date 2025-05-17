import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './utils/auth';
import { routes } from './utils/routes';

const protectedRoutes = [routes.dashboard]
const authRoutes = [routes.login, routes.signup, routes.forgotPassword, routes.resetPassword, routes.confirmEmail]
const publicRoutes = [routes.home]

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const isAuthRoute = authRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL(routes.login, req.nextUrl))
    }

    if (isAuthRoute && session?.userId) {
        return NextResponse.redirect(new URL(routes.home, req.nextUrl))
    }

    if (
        isPublicRoute &&
        session?.userId &&
        req.nextUrl.pathname.startsWith('/auth')
    ) {
        return NextResponse.redirect(new URL(routes.home, req.nextUrl))
    }

    return NextResponse.next()
}