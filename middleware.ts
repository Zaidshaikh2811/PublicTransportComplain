
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/complaints"];

export async function middleware(req: NextRequest) {
    const isAuth = req.cookies.get("auth_token"); // Set this token on login (e.g., JWT or flag)






    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        if (!isAuth) {
            const loginUrl = new URL("/login", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Apply middleware to specific routes only
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/complaints/:path*"],
};
