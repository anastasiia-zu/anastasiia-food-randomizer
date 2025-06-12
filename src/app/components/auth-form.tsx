"use client"

import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const AuthForm = ({authFormType}: {authFormType: string }) => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   const {status} = useSession();


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); 
      setLoading(true);

      try {
      if (authFormType === 'register') {
         const res = await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name, email, password}),
         }); 

         const data = await res.json();

         if (res.ok) {
            alert('Registration successful');
            // await signIn('credentials', {email, password})
         } else {
            alert(data.message || 'Registration failed')
         }
      } else {
         const result = await signIn('credentials', {email, password, redirect: false});

            if (result?.error) {
               alert(result.error);
            } else { 
               return redirect('/add-recipe')
            }
         } 
      } catch (err) {
            console.error('error', err);
            alert('Something went wrong');
       } finally {
         setLoading(false);
     }
   }

   if (status === 'authenticated') {
      return redirect('/add-recipe');
   }

  return (
    <div className='max-w-md mx-auto py-10'>
      <form className='bg-white p-6 shadow-md' onSubmit={handleSubmit}>
         <h2 className='text-2xl font-semibold mb-6'> 
            {authFormType === 'register' ? 'Register' : 'Log in'} 
         </h2>

         {authFormType === 'register' && (
            <div className='flex flex-col mb-4'> 
               <label>Name</label>
               <input 
               className='border border-black p-2'
               type='text'
               value={name}
               onChange={e => setName(e.target.value)}
               />
            </div>
         )} 

         <div className='flex flex-col mb-4'> 
            <label>Email</label>
            <input 
            className='border border-black p-2'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
         </div>
         <div className='flex flex-col mb-4'> 
            <label>Password</label>
            <input 
            className='border border-black p-2'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
         </div>
         <button className='bg-green-400 text-white px-4 py-2 disabled:bg-gray-400' type='submit' disabled={loading}>
            {loading ? 'processing...' : 'submit'}
         </button>
      </form>
    </div>
  )
}

export default AuthForm;