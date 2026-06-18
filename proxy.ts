import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/(auth)/middleware";
import { routes } from "./utils/routes";

const protectedRoutes = [routes.dashboard];
const authRoutes = [
  routes.login,
  routes.signup,
  routes.forgotPassword,
  routes.resetPassword,
  routes.confirmEmail,
];
// const publicRoutes = [routes.home]

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  // const isPublicRoute = publicRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path);

  const isAuth = await isAuthenticated();

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL(routes.login, req.nextUrl));
  }

  if (isAuthRoute && isAuth) {
    return NextResponse.redirect(new URL(routes.home, req.nextUrl));
  }

  return NextResponse.next();
}
