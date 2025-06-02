"use client"

import React, { useState } from 'react'

const AuthForm = ({authFormType}: {authFormType: string }) => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

  return (
    <div>
      <form>
         <div> 
            <label>Name</label>
            <input 
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            />
         </div>
         <div> 
            <label>Email</label>
            <input 
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
         </div>
         <div> 
            <label>Password</label>
            <input 
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
         </div>
         <button type='submit'>
            Submit
         </button>
      </form>
    </div>
  )
}

export default AuthForm;