import { FaTimes, FaPencilAlt } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { EventItemProps } from '@/app/components/EventItem'
import { API_URL } from '@/app/config'
import styles from './Event.module.css'
import DeleteButton from './DeleteButton'

// Need dynamic metadata here
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

// Dynamic segments not included in generateStaticParams are generated on demand
// if false return 404 page
export const dynamicParams = false

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

  return (
    <div className={styles.event}>
      <div className={styles.controls}>
        <Link href={`/events/edit/${event.id}`}>
          <FaPencilAlt /> Edit Event
        </Link>
        <DeleteButton />
      </div>

      <span>
        {event.date} at {event.time}
      </span>
      <h1>{event.name}</h1>
      {event.image && (
        <div className={styles.image}>
          <Image src={event.image} width={960} height={600} alt='event image' />
        </div>
      )}

      <h3>Performers:</h3>
      <p>{event.performers}</p>

      <h3>Descriptions:</h3>
      <p>{event.description}</p>

      <h3>Venue: {event.venue}</h3>
      <p>{event.address}</p>

      <Link href='/events' className={styles.back}>
        {'<'} Go Back
      </Link>
    </div>
  )
}

export default EventPage
