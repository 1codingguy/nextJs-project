'use client'

import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styles from '../login/AuthForm.module.css'

const RegisterPage = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!')
      return
    }
  }

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> Register
      </h1>
      <ToastContainer />
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor='userName'>User name</label>
          <input
            type='text'
            id='userName'
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='passwordConfirm'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>

        <input type='submit' value='Login' className='btn' />
      </form>

      <p>
        Already have an account? <Link href='/account/login'>Login</Link>
      </p>
    </div>
  )
}

export default RegisterPage
