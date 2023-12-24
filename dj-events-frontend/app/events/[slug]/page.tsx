import { EventItemProps } from '@/app/components/EventItem'
import { API_URL } from '@/app/config'

// Dynamic segments not included in generateStaticParams are generated on demand
// if false return 404 page
export const dynamicParams = true

export async function generateStaticParams() {
  const evts = await fetch(`${API_URL}/api/events/`).then(res => res.json())

  const returnItem = evts.events.events.map((event: EventItemProps) => ({
    slug: event.slug,
  }))

  return returnItem
}

// 
async function getEvent(slug: string) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const { event } = await res.json()
  return event
}

const EventPage = async ({ params }: { params: { slug: string } }) => {
  // `param` is provided by Next.js in this default function signature.
  // Not in getEvent()

  const event: EventItemProps = await getEvent(params.slug)

  return <h1>{event.name}</h1>
}

export default EventPage
