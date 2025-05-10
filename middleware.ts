import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    const token = req.cookies.get('token')?.value;

    if (isAdminRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
