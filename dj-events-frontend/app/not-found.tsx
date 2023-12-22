import type { Metadata } from 'next'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Page Not Found',
}

const NotFound = () => {
  return (
    <div className={styles.error}>
      <h1>
        <FaExclamationTriangle /> 404
      </h1>
      <h4>Page Not Found</h4>
      <Link href='/'>Go Back Home</Link>
    </div>
  )
}

export default NotFound
