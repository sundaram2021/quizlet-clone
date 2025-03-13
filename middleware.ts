import { type NextRequest, NextResponse } from 'next/server';
import { ROOT_ROUTE, SESSION_COOKIE_NAME, QUIZ_ROUTE } from './lib/constants';

const protectedRoutes = [QUIZ_ROUTE];

// Add a matcher configuration
export const config = {
  matcher: ['/quiz', '/'], // Ensure each entry starts with a '/'
};

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(QUIZ_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}