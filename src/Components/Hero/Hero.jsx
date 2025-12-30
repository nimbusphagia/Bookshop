import styles from './Hero.module.css'
export default function Hero() {
  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <img src="/images/stone-surface-background.jpg" alt="" />
        <h1>BOOK STORE</h1>
      </div>
    </div>
  )
}
