"use client"

import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const AddWidget = () => {
  const session = useSession();

   return (
      <>
         {session.status === 'authenticated' ? (
            <>
            <li> <Link href={"/profile"} className=''> Profile </Link> </li>
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