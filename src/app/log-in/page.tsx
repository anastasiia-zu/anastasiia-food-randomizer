import React from 'react'
import AuthForm from '../components/auth-form'
import Link from 'next/link'

export default function LogIn() {
  return (
    <div className='text-center'>
      <AuthForm authFormType="Log-In"/>
      <Link className='text-purple-800 text-sm hover:underline hover:text-purple-900 transition' href='/sign-up'> Don&apos;t have an account? Sign up here</Link>
    </div>
  )
}
