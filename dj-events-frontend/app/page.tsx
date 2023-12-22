import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href='/about'>link to about</Link>
    </div>
  )
}
