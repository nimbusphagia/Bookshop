import styles from './Footer.module.css'
export default function Footer() {
  return (
    <footer>
      <p>Created by </p>
      <a className={styles.link} href="https://github.com/nimbusphagia" target="_blank">nimbusphagia</a>
    </footer>
  )
}
