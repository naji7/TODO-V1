import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("loginResponse : ");
  try {
    let token = req.headers.get("x-auth-token");
    console.log("token : ", token);
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
