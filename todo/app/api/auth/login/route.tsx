import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "@/models/userModels";
import { user } from "@nextui-org/react";

export async function POST(req: Request) {
  try {
    await mongoose.connect("mongodb://localhost:27017/dbb");
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 409 });
    }

    console.log("password : ", password);
    const isMatch = await bcrypt.compare(password, isUserPresent.password);

    const name = isUserPresent.alias;
    const token = jwt.sign({ name, email }, "hgSJknGMNahnaLPWRqSesfTUI");
    const response = NextResponse.json(
      { msg: "User successfully login" },
      { status: 201 }
    );
    response.cookies.set("token", token);
    return response;
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
