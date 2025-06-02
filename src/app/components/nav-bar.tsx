import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <nav className=''>
      <ul className='flex gap-2'>
         <li>
            <Link href="/">Logo</Link>
         </li>
         <li>
            <Link href="/">Home</Link>
         </li>
         <li>
            <Link href="/about">About</Link>
         </li>
         <li>
            <Link href="/add-recipe">Add recipe</Link>
         </li>
         <li>
            <Link href="/log-in">Log in</Link>
         </li>
      </ul>
   </nav>
  )
}

export default Navbar;