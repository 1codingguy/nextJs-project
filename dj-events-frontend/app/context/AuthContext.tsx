'use client'

import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NEXT_URL } from '../config'
import { Context } from 'vm'

type registerProps = {
  userName: string
  email: string
  password: string
}

type loginProps = {
  email: string
  password: string
}

export type ContextProps = {
  user: string | null
  error: string | null // TODO: define error type
  register: ({ userName, email, password }: registerProps) => void
  login: ({ email, password }: loginProps) => void
  logout: () => void
  checkUserLoggedIn: () => void
}

const AuthContext = createContext<Context>({
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  checkUserLoggedIn: () => {},
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkUserLoggedIn: () => void = async () => {
      const res = await fetch(`${NEXT_URL}/api/user`)
      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        router.push('/account/dashboard')
      } else {
        setUser(null)
      }
    }

    checkUserLoggedIn()
  }, [router])

  const register = async ({ userName, email, password }: registerProps) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, email, password }),
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/')
    } else {
      setError(data.message)
    }
  }

  const login = async ({ email: identifier, password }: loginProps) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/')
    } else {
      setError(data.message)
    }
  }

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })
    const data = await res.json()

    if (res.ok) {
      setUser(null)
      router.push('/')
    } else {
      setError(data.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
