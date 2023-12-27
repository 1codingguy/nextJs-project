import Link from 'next/link'
import Image from 'next/image'
import styles from './EventItem.module.css'

export interface EventItemProps {
  id: string
  name: string
  slug: string
  venue: string
  address: string
  performers: string
  date: string
  time: string
  description: string
  image: string
}

const EventItem = ({ evt }: { evt: EventItemProps }) => {
  const img = evt?.image?.data?.attributes?.formats?.medium?.url
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={img ? img : '/images/event-default.png'}
          width={170}
          height={100}
          alt='event image'
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link className='btn' href={`/events/${evt.slug}`}>
          Details
        </Link>
      </div>
    </div>
  )
}

export default EventItem
