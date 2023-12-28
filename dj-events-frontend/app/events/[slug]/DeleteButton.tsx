'use client'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'
import styles from './Event.module.css'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/app/config'

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter()

  async function handleDeleteEvent(id: number) {
    if (confirm('Are you sure?')) {
      toast.success('Event deleted')
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
      })

      const data = res.json()

      if (!res.ok) {
        toast.error(data?.message)
      } else {
        router.push('/events')
      }
    }
  }

  return (
    <a href='#' className={styles.delete} onClick={() => handleDeleteEvent(id)}>
      <FaTimes /> Delete Event
    </a>
  )
}

export default DeleteButton
