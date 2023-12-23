import { API_URL } from '@config/index'
import EventItem, { EventItemProps } from './components/EventItem'
import Link from 'next/link'

async function getEvents() {
  const res = await fetch(`${API_URL}/api/events`)
  const { events } = await res.json()
  return events.events.slice(0, 3)
}

export default async function Home() {
  const events: EventItemProps[] = await getEvents()

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 1 && (
        <Link className='btn-secondary' href='/events'>
          View All Events
        </Link>
      )}
    </div>
  )
}
