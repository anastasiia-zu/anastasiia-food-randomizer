import React from 'react'
import AuthForm from '../components/auth-form'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className='text-center'>
      <AuthForm authFormType="register"/>
      <Link className='text-blue-500 text-sm' href='/log-in'>Already have account? Log in</Link>
    </div>
  )
}