/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { UserTypes } from "../../../../../types/types";
import { JWT } from "next-auth/jwt";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"},
         },

         async authorize(credentials) {
            
            await connectToDatabase();

            const user = await User.findOne({email: credentials?.email});
            if (!user) {
               throw new Error('no user found with this email');
            };

            const isPasswordCorrect = await bcrypt.compare(credentials?.password || '', user.password);

            if (!isPasswordCorrect) {
               throw new Error('invalid password');
            };

            return {
               id: user._id.toString(),
               name: user.name,
               email: user.email,
            };
         }
      })    
   ],

   session: {
      strategy: "jwt",
   },

   callbacks: {
      async jwt({token, user}: {token: JWT, user: UserTypes}) {
         if (user) {
            token.id = user.id;
         };

         return token;
      },

      async session({session, token}: {session: Session, token: JWT}) {
         if (token) {
            session.user.id = token.id;
         };

         return session;
      },
   },

   pages: {
      signIn: '/login'
   },

   secret: process.env.NEXTAUTH_SECRET!,

};

const handler = NextAuth(authOptions as any);

export {
   handler as GET, handler as POST
};