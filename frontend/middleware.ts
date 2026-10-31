// middleware.ts — disable entirely, handle auth client-side
export function middleware() {}
export const config = { matcher: [] };



// middleware.ts  (project root — same level as app/)
//import { NextResponse } from 'next/server';
//import type { NextRequest } from 'next/server';

// Routes that don't need a token
//const PUBLIC_PATHS = ['/login', '/register'];

//export function middleware(request: NextRequest) {
//  const token     = request.cookies.get('access_token')?.value;
 // const { pathname } = request.nextUrl;
  //const isPublic  = PUBLIC_PATHS.some(p => pathname.startsWith(p));

  // No token + protected route → send to login
  //if (!token && !isPublic)
  //  return NextResponse.redirect(new URL('/login', request.url));

  // Has token + auth page → send to dashboard
  //if (token && isPublic)
    //return NextResponse.redirect(new URL('/', request.url));

  //return NextResponse.next();
//}

//export const config = {
  // Skip Next.js internals and static files
  //matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
//};
