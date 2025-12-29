import styles from './Shop.module.css'
import { useLoaderData } from "react-router";
function Shop() {
  const data = useLoaderData();
  const products = data.data.amazonProductSearchResults.productResults.results;
  return (
    <div className={styles.body}>
      <header>
      </header>
      <div className={styles.catalog}>
        {products.map((p) => (
          <div
            key={p.asin}
            className={styles.product}
          >
            <img
              src={p.mainImageUrl}
              alt={p.title}
              className={styles.thumbnail}
            />
            <div className={styles.description}>
              <h3>{p.title}</h3>
              <p>{p.price.display}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Shop;
