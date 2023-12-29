'use client'

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import Search from './Search'
import styles from './Header.module.css'
import { useAuthContext } from '../context/AuthContext'

const Header = () => {
  const { user, login, logout } = useAuthContext()

  const handleLogin = () => {}

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href='/events/add'>Add Event</Link>
              </li>
              <li>
                <Link href='account/dashboard'>Dashboard</Link>
              </li>
              <li>
                <button
                  className='btn-secondary btn-icon'
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href='/account/login'
                  className='btn-secondary btn-icon'
                  onClick={handleLogin}
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
          {/* <li>
            <Link href='/account/register' className='btn-secondary btn-icon'>
              Register
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header
