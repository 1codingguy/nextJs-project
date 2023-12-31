'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Search.module.css'

const Search = () => {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder='Search Events'
        />
      </form>
    </div>
  )
}

export default Search
