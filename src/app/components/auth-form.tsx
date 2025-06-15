"use client"

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const AuthForm = ({authFormType}: {authFormType: string }) => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   const {status} = useSession();
   const router = useRouter();


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
               router.push('/add-recipe');
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
      router.push('/add-recipe');
   }

  return (
      <div className="max-w-md mx-auto py-16">
      <form
         className="bg-white p-8 rounded-3xl shadow-md w-full flex flex-col gap-5"
         onSubmit={handleSubmit}
      >
         <h2 className="text-2xl font-bold text-gray-900">
            {authFormType === 'register' ? 'Create a New Account' : 'Log In to Your Account'}
         </h2>

         {authFormType === 'register' && (
            <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Username</label>
            <input
               className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
               type="text"
               placeholder="Enter your username"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            </div>
         )}

         <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
         </div>

         <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-300 text-white py-3 rounded-full font-medium text-sm hover:bg-purple-400 transition disabled:opacity-50"
         >
            {loading ? 'Processing...' : authFormType === 'register' ? 'Register' : 'Log In'}
         </button>
      </form>
      </div>
  )
}

export default AuthForm;