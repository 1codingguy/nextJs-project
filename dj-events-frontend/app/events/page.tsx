'use client'

import { API_URL } from '@config/index'
import EventItem, { EventItemProps } from '@components/EventItem'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import qs from 'qs'
import Link from 'next/link'
import { EVENTS_PER_PAGE } from '@config/index'

type dataProps = {
  id: number
  attributes: EventItemProps
}

type metaProps = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    totalCount: number
  }
}

type returnResult = {
  data: dataProps[]
  meta: metaProps
}

async function getEvents(page: string) {
  const query = qs.stringify(
    {
      pagination: {
        page: page,
        pageSize: EVENTS_PER_PAGE,
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const res: returnResult = await fetch(`${API_URL}/api/events?${query}`).then(
    res => res.json()
  )

  return res
}

export default function EventsPage() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const [data, setData] = useState<dataProps[] | undefined>()
  const [metaData, setMetaData] = useState<metaProps | undefined>()

  useEffect(() => {
    getEvents(page).then(data => {
      setData(data.data)
      setMetaData(data.meta)
    })
  }, [page])

  if (data === undefined) return <h3>No events to show</h3>

  const { pagination: { page: currentPage = 1, pageCount = 1 } = {} } =
    metaData || {}

  return (
    <div>
      <h1>Upcoming Events</h1>

      {data.map(({ id, attributes: evt }: dataProps) => (
        <EventItem key={id} evt={evt} />
      ))}

      {
        <div>
          {currentPage > 1 && (
            <Link href={`/events?page=${currentPage - 1}`}>
              <button className='btn-secondary'>Prev</button>
            </Link>
          )}
          {currentPage < pageCount && (
            <Link href={`/events?page=${currentPage + 1}`}>
              <button className='btn-secondary'>Next</button>
            </Link>
          )}
        </div>
      }
    </div>
  )
}
