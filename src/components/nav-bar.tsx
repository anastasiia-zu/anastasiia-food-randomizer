import Link from 'next/link';
import React from 'react'
import AddWidget from './add-widget';

const Navbar = () => {
  return (
    <nav className='w-full'>
      <ul className='flex justify-between'>
         <li>
            <Link href="/">Logo</Link>
         </li>
         <li>
            <Link href="/search">Search</Link>
         </li>
         <li>
            <Link href="/about">About</Link>
         </li>
         <li>
            <Link href="/add-recipe">Add recipe</Link>
         </li>
         <AddWidget/>
      </ul>
   </nav>
  )
}

export default Navbar;