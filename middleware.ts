import { routes } from '@/utils/routes';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/auth';

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string;
    };
}

export async function middleware(req: NextRequest) {
    let accessToken: string | undefined;
    let isSuperAdmin = false;

    if (req.cookies.has('accessToken')) {
        accessToken = req.cookies.get('accessToken')?.value;
    }

    if (
        (req.nextUrl.pathname.startsWith('/auth/login') ||
            req.nextUrl.pathname.startsWith('/auth/signup')) &&
        accessToken &&
        isSuperAdmin
    ) {
        return NextResponse.redirect(new URL(routes.dashboard, req.url));
    }

    if (
        !accessToken &&
        !isSuperAdmin &&
        (req.nextUrl.pathname.startsWith('/admin') ||
            req.nextUrl.pathname.startsWith('/api/admin'))
    ) {
        return NextResponse.redirect(new URL(routes.login, req.url));
    }

    const response = NextResponse.next();

    try {
        if (accessToken) {
            const { sub, isSuperAdmin: userIsSuperAdmin } = await verifyJWT<{
                sub: string;
                isSuperAdmin: boolean;
            }>(accessToken);
            response.headers.set('X-USER-ID', sub);
            (req as AuthenticatedRequest).user = { id: sub };
            isSuperAdmin = userIsSuperAdmin;
        }
    } catch (error) {
        if (req.nextUrl.pathname.startsWith('/api/admin')) {
            return NextResponse.json(
                { error: 'Authorization failed!' },
                { status: 401 }
            );
        }

        return NextResponse.redirect(
            new URL(
                `${routes.login}?${new URLSearchParams({ error: 'badauth' })}`,
                req.url
            )
        );
    }

    const authUser = (req as AuthenticatedRequest).user;

    if (
        authUser &&
        isSuperAdmin &&
        (req.nextUrl.pathname.startsWith('/auth/login') ||
            req.nextUrl.pathname.startsWith('/auth/signup'))
    ) {
        return NextResponse.redirect(new URL(routes.dashboard, req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin') && accessToken && !isSuperAdmin) {
        return NextResponse.redirect(new URL(routes.home, req.url));
    }

    return NextResponse.next();
}