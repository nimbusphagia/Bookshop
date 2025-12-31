import styles from './Hero.module.css'
export default function Hero() {
  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <h1>Simple Store</h1>
        <p>Explore products and <span>build your cart.</span></p>
      </div>
    </div>
  )
}
