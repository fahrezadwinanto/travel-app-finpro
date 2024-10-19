import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  //   console.log("Path: ", path);

  // ambil cookies dari web browser
  const token = req.cookies.get("token");
  //   console.log(token);

  // jika tidak ada token tapi mau akses home
  if (!token && path === "/home") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // jika ada token
  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!token && (path === "/admin-panel" || path.startsWith("/admin-panel/"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // lanjut ke halaman yang diminta
}

export const config = {
  matcher: ["/home", "/login", "/register", "/admin-panel", "/admin-panel/:path*"],
};
