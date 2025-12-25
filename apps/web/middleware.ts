import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('access_token');
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard')) {
        if (!authCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if ((pathname === '/login' || pathname === '/register') && authCookie) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
