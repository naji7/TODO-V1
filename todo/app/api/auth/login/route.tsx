import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import User from "@/models/userModels";
import { user } from "@nextui-org/react";
import { connectToDB } from "@/utils/database";


export async function POST(req:Request){
    try {
    connectToDB();
    const body = await req.json();
    const {email,password} = body;

    if( !email || !password){
        return NextResponse.json({msg:"invalid credentials"},{status:400})
    }

    const isUserPresent = await User.findOne({email});
    if(!isUserPresent){
        return NextResponse.json({msg:"invalid credentials"}, {status:409})
    }

    const isMatch = await bcrypt.compare(password,isUserPresent.password);

    const name = isUserPresent.alias;
    const token = jwt.sign({name,email},"hgSJknGMNahnaLPWRqSesfTUI");
    const response = NextResponse.json({msg:"user successfully login"},{status:201});
    response.cookies.set("token",token)
    return response;
    } catch (error) {
       return NextResponse.json({msg:error}, {status:500}) 
    }


}