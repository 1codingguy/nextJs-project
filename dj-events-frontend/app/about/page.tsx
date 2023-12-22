import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About DJ events',
}

const About = () => {
  return (
    <>
      <div>About</div>
      <Link href='/'>link to home</Link>
    </>
  )
}

export default About
