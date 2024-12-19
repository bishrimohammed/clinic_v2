import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/register", "/login", "/change-password"];
const protectedRoutes = ["/dashboard", "/patients"];

export default async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.includes(path);

    const token = request.cookies.get("token")?.value;

    //  if (!isPublicRoute && !token) {
    //   return NextResponse.redirect(new URL("/", request.nextUrl));
    // }
    // if (isPublicRoute && token) {
    //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    // }

    // return NextResponse.next();
    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (isPublicRoute && token) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Optionally, redirect to an error page or log the error
    return NextResponse.redirect(new URL("/error", request.nextUrl));
  }
}
