import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
   try {
      await mongoose.connect(process.env.MONGODB_URL!);
      const body = await req.json();
      const {email} = body;
      if (email) {
         const existingUser = await User.findOne({email});
         if (existingUser) {
            return NextResponse.json({error: 'User with this email already exist'}, {status: 400})
         }
      }
   } catch(err: unknown) {
      console.error(`${err}`)
      return NextResponse.json('error occurred');
    };
};