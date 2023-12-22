import Link from "next/link"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyrigth &copy; 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  )
}

export default Footer