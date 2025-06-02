import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         id: 'credentials',
         credentials: {
            username: {label: "Email", type: "email", placeholder: "test@example.com"},
            password: {label: "Password", type: "password"},
         }
      })
   ]
};