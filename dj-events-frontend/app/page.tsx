import { API_URL } from '@config/index'
import EventItem, { EventItemProps } from './components/EventItem'
import Link from 'next/link'

async function getEvents() {
  const res = await fetch(`${API_URL}/api/events?populate=*`).then(res =>
    res.json()
  )
  return res.data
}

export default async function Home() {
  const data = await getEvents()

  return (
    <div>
      <h1>Upcoming Events</h1>
      {data.length === 0 && <h3>No events to show</h3>}

      {data.map(
        ({
          id,
          attributes: evt,
        }: {
          id: number
          attributes: EventItemProps
        }) => (
          <EventItem key={id} evt={evt} />
        )
      )}

      {data.length > 1 && (
        <Link className='btn-secondary' href='/events'>
          View All Events
        </Link>
      )}
    </div>
  )
}
