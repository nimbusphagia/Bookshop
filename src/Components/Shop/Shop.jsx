import styles from './Shop.module.css'
import { useLoaderData } from "react-router";
function Shop() {
  const data = useLoaderData();
  const products = data.data.amazonProductSearchResults.productResults.results;
  console.log(products);
  //PARSE TITLE BY LIMITING AMOUNT OF WORDS
  function getTitle(rawTitle = "", maxWords = 5) {
    const words = rawTitle.trim().split(/\s+/);

    if (words.length <= maxWords) return rawTitle;

    return words.slice(0, maxWords).join(" ") + "…";
  }

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
              alt={getTitle(p.title)}
              className={styles.thumbnail}
            />
            <div className={styles.description}>
              <div className={styles.title}>
                <h3>{getTitle(p.title)}</h3>
              </div>
              <div className={styles.buttons}>
                {<p>{p.price ? p.price.display : '$19.99'}</p>
                }
                <button type="button">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Shop;
