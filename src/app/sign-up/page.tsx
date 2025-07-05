import React from 'react'
import AuthForm from '../../components/auth-form'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className='text-center'>
      <AuthForm authFormType="register"/>
      <Link className='text-purple-800 text-sm hover:underline hover:text-purple-900 transition' href='/log-in'>Already have account? Log in</Link>
    </div>
  )
}