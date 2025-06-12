import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/lib/mongoose";

export async function POST(req: Request){
   try {
      const {name, email, password} = await req.json();

      if (!name || !email || !password) {
         return NextResponse.json({message: 'all fields required'}, {status: 400})
      }

      await connectToDatabase();
      
      const existingUser = await User.findOne({email});

      if (existingUser) {
         return NextResponse.json({message: 'user already exist'}, {status: 404})
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({name, email, password: hashedPassword});

      return NextResponse.json({message: 'User registered'}, {status: 201})

   } catch(err: unknown) {
      console.error(`${err}`)
      return NextResponse.json({message: 'error occured'}, {status: 500});
    };
};