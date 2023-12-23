import { API_URL } from '@config/index'
import EventItem, { EventItemProps } from '@components/EventItem'

async function getEvents() {
  const res = await fetch(`${API_URL}/api/events`)
  const { events } = await res.json()
  return events.events
}

export default async function EventsPage() {
  const events: EventItemProps[] = await getEvents()

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </div>
  )
}
