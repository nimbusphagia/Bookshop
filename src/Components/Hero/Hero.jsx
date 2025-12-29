import styles from './Hero.module.css'
import { useLoaderData } from "react-router"
export default function Hero() {
  const data = useLoaderData();
  const books = data.items ?? [];

  // console.log(books);
  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <h1>BOOK STORE</h1>
        <div className={styles.images}>
          {books.map((b) => (
            <img
              key={b.id}
              src={b.volumeInfo.imageLinks.thumbnail}
              alt={b.volumeInfo.title}
              className={styles.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
