import { routes } from '@/utils/routes';
import { UserRoles } from '@prisma/client';
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
    let role = "USER";

    if (req.cookies.has('accessToken')) {
        accessToken = req.cookies.get('accessToken')?.value;
    }

    if (
        (req.nextUrl.pathname.startsWith('/auth/login') ||
            req.nextUrl.pathname.startsWith('/auth/signup')) &&
        accessToken &&
        (isSuperAdmin || role === UserRoles.SELLER)
    ) {
        return NextResponse.redirect(new URL(routes.dashboard, req.url));
    }

    if (
        !accessToken &&
        (!isSuperAdmin || role !== UserRoles.SELLER) &&
        (req.nextUrl.pathname.startsWith('/admin') ||
            req.nextUrl.pathname.startsWith('/api/admin'))
    ) {
        return NextResponse.redirect(new URL(routes.login, req.url));
    }

    const response = NextResponse.next();

    try {
        if (accessToken) {
            const { sub, isSuperAdmin: userIsSuperAdmin, role: userRole } = await verifyJWT<{
                sub: string;
                isSuperAdmin: boolean;
                role: UserRoles;
            }>(accessToken);
            response.headers.set('X-USER-ID', sub);
            (req as AuthenticatedRequest).user = { id: sub };
            isSuperAdmin = userIsSuperAdmin;
            role = userRole;
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

    console.log(role, 'role')

    if (
        authUser &&
        (isSuperAdmin || role === UserRoles.SELLER) &&
        (req.nextUrl.pathname.startsWith('/auth/login') ||
            req.nextUrl.pathname.startsWith('/auth/signup'))
    ) {
        return NextResponse.redirect(new URL(routes.dashboard, req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin') && accessToken && !isSuperAdmin && role !== UserRoles.SELLER) {
        return NextResponse.redirect(new URL(routes.home, req.url));
    }

    return NextResponse.next();
}