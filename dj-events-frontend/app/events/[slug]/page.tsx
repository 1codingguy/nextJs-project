'use client'

import { useParams, useRouter } from 'next/navigation'

const DynamicSlug = () => {
  const params = useParams()
  const router = useRouter()

  const handleClick = () => {
    console.log('clicked')
    router.push('/')
  }

  return <h1 onClick={handleClick}>DynamicSlug</h1>
}

export default DynamicSlug
