import { revalidatePath, revalidateTag } from 'next/cache'
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
export const dynamicParams = true

export async function generateStaticParams() {
  const evts = await fetch(`${API_URL}/api/events?populate=*`, {
    next: { tags: ['slug'] },
  }).then(res => res.json())

  const returnItem = evts.data.map(
    ({ attributes }: { attributes: EventItemProps }) => ({
      slug: attributes.slug,
    })
  )

  return returnItem
}

//
async function getEventData(slug: string) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  ).then(res => res.json())
  return res.data[0]
}

const EventPage = async ({ params }: { params: { slug: string } }) => {
  // `param` is provided by Next.js in this default function signature.
  // Not in getEvent()

  // refetch the data, instead of using those cached
  revalidateTag('slug')
  const { id, attributes: event } = await getEventData(params.slug)

  const img = event?.image?.data?.attributes?.formats?.medium?.url

  return (
    <div className={styles.event}>
      <div className={styles.controls}>
        <Link href={`/events/edit/${id}`}>
          <FaPencilAlt /> Edit Event
        </Link>
        <DeleteButton />
      </div>

      <span>
        {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
      </span>
      <h1>{event.name}</h1>
      {img && (
        <div className={styles.image}>
          <Image src={img} width={960} height={600} alt='event image' />
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
