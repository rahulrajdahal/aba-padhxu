import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/(auth)/middleware";
import { routes } from "./utils/routes";

const protectedRoutes = [
  routes.dashboard,
  // Add other protected routes as needed, using prefix matching
];

const authRoutes = [
  routes.login,
  routes.signup,
  routes.forgotPassword,
  routes.resetPassword,
  routes.confirmEmail,
];

export const config = {
  // Exclude static files, Next.js internals, and favicon from the proxy
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((r) => path.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  const session = await verifySession();

  if (isProtectedRoute && !session?.isAuth) {
    return NextResponse.redirect(new URL(routes.login, req.nextUrl));
  }

  if (isAuthRoute && session?.isAuth) {
    return NextResponse.redirect(new URL(routes.home, req.nextUrl));
  }

  // const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];

  // if (safeMethods.includes(req.method)) {
  //   const existing = req.cookies.get("csrfToken");
  //   if (!existing) {
  //     const token = randomBytes(32).toString("base64url");
  //     const response = NextResponse.next();
  //     response.cookies.set("csrfToken", token, {
  //       httpOnly: false,
  //       secure: process.env.NODE_ENV !== "development",
  //       sameSite: "strict",
  //       path: "/",
  //       maxAge: 60 * 60,
  //     });
  //     return response;
  //   }
  //   return NextResponse.next();
  // }

  // const csrfCookie = req.cookies.get("csrfToken")?.value;
  // const csrfHeader = req.headers.get("x-csrf-token");

  // if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
  //   return new NextResponse("Invalid CSRF token", { status: 403 });
  // }

  return NextResponse.next();
}
