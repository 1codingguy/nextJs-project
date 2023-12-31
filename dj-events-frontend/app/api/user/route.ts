import { API_URL } from '@/app/config'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type StoredJwt =
  | {
      name: string
      value: string
      path: string
    }
  | undefined

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const storedJwt = cookieStore.get('jwt') as StoredJwt

  if (!storedJwt?.value) {
    return NextResponse.json(
      {
        message: 'Not Authorized',
      },
      {
        status: 403,
      }
    )
  }

  const strapiResponse = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${storedJwt.value}`,
    },
  })

  console.log('strapiResponse', strapiResponse.ok)

  const user = await strapiResponse.json()

  if (strapiResponse.ok) {
    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      }
    )
  } else {
    return NextResponse.json(
      {
        message: 'User forbidden',
      },
      {
        status: 403,
      }
    )
  }
}
