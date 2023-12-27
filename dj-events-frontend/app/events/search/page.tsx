import qs from 'qs'
import { API_URL } from '@/app/config'
import EventItem, { EventItemProps } from '@/app/components/EventItem'
import Link from 'next/link'

async function getSearchResults({ searchTerm }: { searchTerm: string }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $contains: searchTerm } },
          { description: { $contains: searchTerm } },
          { venue: { $contains: searchTerm } },
          { performers: { $contains: searchTerm } },
        ],
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true, // encode values only, leave keys as is
    }
  )

  const res = await fetch(`${API_URL}/api/events?${query}`).then(res =>
    res.json()
  )

  return res.data
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { term: string }
}) => {
  const data = await getSearchResults({ searchTerm: searchParams.term })

  return (
    <>
      <Link href='/events'>Go Back</Link>
      <h1>Search results for {searchParams.term}</h1>
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
    </>
  )
}

export default SearchPage
