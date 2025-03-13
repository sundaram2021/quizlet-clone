import { type NextRequest, NextResponse } from 'next/server';
import { ROOT_ROUTE, SESSION_COOKIE_NAME, QUIZ_ROUTE } from './lib/constants';

const protectedRoutes = [QUIZ_ROUTE];

// Define the matcher configuration


export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROOT_ROUTE, request.nextUrl));
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    return NextResponse.redirect(new URL(QUIZ_ROUTE, request.nextUrl));
  }

  return NextResponse.next();

}

export const config = {
    matcher: ["/about", "/login"], // Ensure each entry starts with a '/'
  };