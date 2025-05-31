import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    if (pathname === '/login' || pathname === '/') {
      return NextResponse.redirect(new URL('/collections', req.url));
    }
    return NextResponse.next();
  } else {
    if (pathname.startsWith('/collections') || pathname.startsWith('/edit')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/login', '/collections/:path*', '/edit/:path*'],
};
