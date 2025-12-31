import styles from './Loading.module.css'
export default function Loading() {
  return (
    <div className={styles.loading}>

      <p className={styles.loader}>
        {"Loading...".split("").map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

    </div>
  );
}

