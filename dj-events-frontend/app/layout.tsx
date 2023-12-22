import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Showcase from '@components/Showcase'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <Showcase />
        <div className={styles.container}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
