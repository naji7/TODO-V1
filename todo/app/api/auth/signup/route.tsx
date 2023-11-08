import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';

import User from "@/models/userModels";
import { user } from "@nextui-org/react";
// import { connectToDB } from "@/utils/database";


export async function POST(req:Request){
    // connectToDB();


    await mongoose.connect("mongodb://localhost:27017/dbb");
    const body = await req.json();
    const {alias,email,password} = body;

    if(!alias || !email || !password){
        return NextResponse.json({msg:"invalid fields"},{status:400})
    }

    const isUserPresent = await User.findOne({email});
    if(isUserPresent){
        return NextResponse.json({msg:"user is already present"}, {status:409})
    }

    const hashPassword = await bcrypt.hash(password,10)

    try {
       const user =  new User({email,alias,password:hashPassword})
       await user.save();
       const token = jwt.sign({alias,email},"hgSJknGMNahnaLPWRqSesfTUI");
       const response = NextResponse.json({msg:"user successfully created"},{status:201});
       response.cookies.set("token",token)
       return response;
    } catch (error) {
       return NextResponse.json({msg:error}, {status:500}) 
    }

}