'use client'

import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/app/config'
import styles from '../../add/AddEventPage.module.css'
import generateSlug from '@/app/utils/generateSlug'
import moment from 'moment'

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

async function getEvent(id: string) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`, {
    next: { tags: ['all-events'] },
  }).then(res => res.json())
  return res.data
}

const EditEventPage = ({ params }: { params: { id: string } }) => {
  const [values, setValues] = useState<ValuesType>({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  )

  const router = useRouter()

  useEffect(() => {
    if (params.id) {
      getEvent(params.id).then(data => {
        console.log(data.attributes)
        const {
          name,
          performers,
          venue,
          address,
          date,
          time,
          description,
          image,
        } = data.attributes

        setValues(values => ({
          ...values,
          name,
          performers,
          venue,
          address,
          date,
          time,
          description,
        }))

        const img = image?.data?.attributes?.formats?.thumbnail?.url
        const imagePreview = img ? img : '/images/event-default.png'
        setImagePreview(imagePreview)
      })
    }
  }, [params.id])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
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

    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
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
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={e => handleSubmit(e, params.id)} className={styles.form}>
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
                value={
                  field == 'date'
                    ? moment(values[field]).format('yyyy-MM-DD')
                    : values[field]
                }
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

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} alt='event image' />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className='btn-secondary'>
          <FaImage /> Set Image
        </button>
      </div>
    </>
  )
}

export default EditEventPage
