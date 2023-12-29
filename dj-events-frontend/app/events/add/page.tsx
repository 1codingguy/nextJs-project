'use client'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_URL } from '@/app/config'
import styles from './Form.module.css'
import generateSlug from '@/app/utils/generateSlug'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasEmptyFields = Object.values(values).some(value => value === '')

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
      return
    }

    // Because Strapi V4 has a bug with generating slugs (slugs not generated on create)
    // Below two lines generate a slug from the name field
    // No check for uniqueness is done, only a workaround for now
    const slug = generateSlug(values.name)
    const valuesWithSlug = { ...values, slug }

    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: valuesWithSlug,
      }),
    })

    if (!res.ok) {
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${slug}`)
    }
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
      <ToastContainer />
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
