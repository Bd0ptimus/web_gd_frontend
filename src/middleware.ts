import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import autoAuth from './utils/autoAuth';
import * as Constants from '@/config/constants/Constants';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }
  const jwt = request.cookies.get('JWT') ? request.cookies.get('JWT').value : null;
  if (!request.nextUrl.pathname.startsWith('/admin/result') && !request.nextUrl.pathname.startsWith('/search')){
    // return NextResponse.redirect(new URL('/search', request.url));
  }
  return NextResponse.next();
  // if (!jwt) {
  //   return NextResponse.redirect(new URL('/admin/login', request.url));
  // } else {
  //   return NextResponse.next();
  // }

  // const roleUser = request.cookies.get('roleUser') ? request.cookies.get('roleUser').value : null;
  // if (roleUser && Number(roleUser) == Constants.ROLE_USER) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // if (request.nextUrl.pathname.startsWith('/admin/login')) {
  //   console.log('start with admin/login')
  //   const isLoggedIn = request.cookies.get('isLoggedIn') ? request.cookies.get('isLoggedIn').value : null;
  //   if (isLoggedIn == 'true') {
  //     return NextResponse.redirect(new URL('/', request.url)); // Redirects the user back to /login after logging
  //   } else {
  //     return NextResponse.next();
  //   }
  // }

  // const isLoggedIn = request.cookies.get('isLoggedIn') ? request.cookies.get('isLoggedIn').value : null;
  // if (isLoggedIn == 'true') {
  //   return NextResponse.next(); // Redirects the user back to /login after logging
  // } else {
  //   return NextResponse.rewrite(new URL('/admin/login', request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/:path*"],
  matcher: ["/", "/admin/:path*"],
}
