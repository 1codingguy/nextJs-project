'use client'

import styles from './Showcase.module.css'
import { usePathname } from 'next/navigation'

const Showcase = () => {
  const pathName = usePathname()

  if (pathName === '/') {
    return (
      <div className={styles.showcase}>
        <h1>Welcome To The Party!</h1>
        <h2>Find the hottest DJ events</h2>
      </div>
    )
  }
}

export default Showcase