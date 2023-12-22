import { NextResponse } from 'next/server'

const events = require('./data.json')

export async function GET() {
  return NextResponse.json({ events })
}

export async function POST() {
  return NextResponse.json({ status: 200, message: 'POST request received ' })
}
