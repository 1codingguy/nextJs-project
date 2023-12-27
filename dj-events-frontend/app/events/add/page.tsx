'use client'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_URL } from '@/app/config'
import styles from './AddEventPage.module.css'

const fields = [
  'name',
  'performers',
  'venue',
  'address',
  'date',
  'time',
  'description',
]

type Fields = (typeof fields)[number]

type ValuesType = {
  [K in Fields]: string
}

const AddEventPage = () => {
  const [values, setValues] = useState<ValuesType>({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(values)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {fields.slice(0, -1).map(field => (
            <div key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'date' ? 'date' : 'text'}
                id={field}
                name={field}
                value={values[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </>
  )
}

export default AddEventPage
