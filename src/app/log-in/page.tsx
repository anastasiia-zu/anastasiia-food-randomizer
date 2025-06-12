import React from 'react'
import AuthForm from '../components/auth-form'
import Link from 'next/link'

export default function LogIn() {
  return (
    <div className='text-center'>
      <AuthForm authFormType="Log-In"/>
      <Link className='text-blue-500 text-sm' href='/sign-up'> You dont have account? Sign up here</Link>
    </div>
  )
}
