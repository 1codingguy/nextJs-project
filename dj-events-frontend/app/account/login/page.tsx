'use client'

import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './AuthForm.module.css'
import { useAuthContext } from '@/app/context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useAuthContext()

  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className={styles.auth}>
      <ToastContainer />
      <h1>
        <FaUser /> Login
      </h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input type='submit' value='Login' className='btn' />
      </form>

      <p>
        {`Don't have an account?`}{' '}
        <Link href='/account/register'>Register</Link>
      </p>
    </div>
  )
}

export default LoginPage
