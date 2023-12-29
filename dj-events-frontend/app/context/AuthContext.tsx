'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../config'
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

  const register = async ({ userName, email, password }: registerProps) => {
    console.log({ userName, email, password })
  }

  const login = async ({ email: identifier, password }: loginProps) => {
    console.log({ identifier, password })
  }

  const logout = async () => {
    console.log('logout')
  }

  const checkUserLoggedIn = async () => {
    console.log('checkUserLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
