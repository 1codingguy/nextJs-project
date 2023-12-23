import { API_URL } from '@config/index'

async function getEvents() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  return events
}

export default async function Home() {
  const events = await getEvents()
  return (
    <div>
      <h1>Upcoming Events</h1>
    </div>
  )
}
