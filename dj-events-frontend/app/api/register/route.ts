import { API_URL } from '@/app/config'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type ErrorResponse = {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: {}
  }
}

type SucessResponse = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}

function isSuccessResponse(data: any): data is SucessResponse {
  return data && data.jwt !== undefined
}

function isErrorResponse(data: any): data is ErrorResponse {
  return data && data.error !== undefined
}

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json()

  const strapiResponse = await fetch(`${API_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })


  const data: SucessResponse | ErrorResponse = await strapiResponse.json()

  if (strapiResponse.ok) {
    if (isSuccessResponse(data)) {
      // does it have to use `cookie` package to serialize the cookie?
      // what's the diff of serialize and unserialized?

      cookies().set({
        name: 'jwt',
        value: data.jwt,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'strict',
        path: '/',
      })

      return NextResponse.json(
        {
          user: data.user,
        },
        { status: 200 }
      )
    }
  } else {
    if (isErrorResponse(data)) {
      return NextResponse.json(
        {
          message: data.error.message,
        },
        {
          status: data.error.status,
        }
      )
    }
  }

  // Handle unexpected response format
  return NextResponse.json({
    status: 500,
    message: 'Unexpected response format',
  })
}
