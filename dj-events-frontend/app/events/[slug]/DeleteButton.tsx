'use client'

import { FaTimes } from 'react-icons/fa'
import styles from './Event.module.css'

const DeleteButton = () => {
  const deleteEvent = () => {
    console.log('delete')
  }

  return (
    <a href='#' className={styles.delete} onClick={deleteEvent}>
      <FaTimes /> Delete Event
    </a>
  )
}

export default DeleteButton
