import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export async function middleware(request: NextRequest) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user && request.nextUrl.pathname.startsWith("/")) {
        resolve(NextResponse.redirect(new URL("/login", request.url)));
      } else {
        resolve(NextResponse.next());
      }
    });
  });
}

export const config = {
  matcher: ["/quiz", "/login"],
};