import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import User from "@/models/userModels";
import { user } from "@nextui-org/react";
// import { connectToDB } from "@/utils/database";

// const SES_CONFIG = {
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   region: process.env.NEXT_PUBLIC_AWS_SES_REGION,
// };
const SES_CONFIG = {
  region: process.env.NEXT_PUBLIC_AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
};

// const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
// const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

const client = new SESClient(SES_CONFIG);

export async function POST(req: Request) {
  // connectToDB();

  try {
    await mongoose.connect("mongodb://localhost:27017/dbb");

    const body = await req.json();
    const { alias, email, password } = body;

    if (!alias || !email || !password) {
      return NextResponse.json({ msg: "Invalid fields" }, { status: 400 });
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return NextResponse.json(
        { msg: "User already exists!" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, alias, password: hashPassword });
    await user.save();
    const token = jwt.sign({ alias, email }, "hgSJknGMNahnaLPWRqSesfTUI", {
      expiresIn: 24 * 60 * 60,
    });
    const response = NextResponse.json(
      { msg: "User successfully created" },
      { status: 201 }
    );
    response.cookies.set("token", token);

    // sending email
    let params = {
      Source: "mnnasik7@gmail.com",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "<h1>You successfully login in TODO app</h1>",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "AWS_SES",
        },
      },
    };

    const command = new SendEmailCommand(params);
    const responses = await client.send(command);

    return response;
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
