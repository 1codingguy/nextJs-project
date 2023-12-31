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

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const storedJwt = cookieStore.get('jwt') as StoredJwt

  if (storedJwt?.value) {
    cookieStore.delete('jwt')
  }

  return NextResponse.json(
    {
      message: 'Success',
    },
    {
      status: 200,
    }
  )
}
