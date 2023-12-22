import { NextRequest, NextResponse } from 'next/server'

const events = require('../data.json')

export function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const slug = context.params.slug

  const event = events.events.find(
    (event: { slug: string }) => event.slug === slug
  )

  if (event) {
    return NextResponse.json({ event })
  } else {
    return NextResponse.json({
      status: 404,
      message: `Event with slug ${slug} not found`,
    })
  }
}