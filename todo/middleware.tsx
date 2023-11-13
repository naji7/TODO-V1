// import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import axios from "axios";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/tasks"];

export default async function middleware(req: any) {
  //   getUser();
  const cookieStore = cookies();
  const tokenStore = cookieStore.get("token");

  if (tokenStore) {
    var { value }: any = cookieStore.get("token");
  }

  if (!value && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (value && req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/tasks", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
