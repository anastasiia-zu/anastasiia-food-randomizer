"use client"

import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LuHeart } from "react-icons/lu";


const AddWidget = () => {
  const session = useSession();

   return (
      <>
         {session.status === 'authenticated' ? (
            <>
            <li> <Link href={"/profile"} className=''> <LuHeart className='w-7 h-7 text-purple-500'/> </Link> </li>
            <li onClick={() => signOut()}> Exit </li>
            </>
         ) : (
           <li> <Link href={"/log-in"}>Log in</Link> </li>
         )
         }
      </>
   )
}

export default AddWidget;