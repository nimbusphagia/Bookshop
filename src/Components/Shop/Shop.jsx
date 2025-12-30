import styles from './Shop.module.css'
import { useLoaderData, useOutletContext } from "react-router";
function Shop() {
  //LOAD DATA 
  const data = useLoaderData();
  const products = data.products;

  //PARSE TITLE BY LIMITING AMOUNT OF WORDS
  function getTitle(rawTitle = "", maxWords = 5) {
    const words = rawTitle.trim().split(/\s+/);

    if (words.length <= maxWords) return rawTitle;

    return words.slice(0, maxWords).join(" ") + "…";
  }
  //CART STATE
  const { cart, addOnce, removeOnce } = useOutletContext();
  const isAdded = (id) => cart.some(item => item.id === id);
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
              src={p.imageUrl}
              alt={getTitle(p.title)}
              className={styles.thumbnail}
            />
            <div className={styles.description}>
              <div className={styles.title}>
                <h3>{getTitle(p.title)}</h3>
              </div>
              <div className={styles.buttons}>
                {<p>{p.price ? `$${p.price.amount}` : '$19.99'}</p>
                }
                <button
                  type="button"
                  className={isAdded(p.asin) ? styles.remove : styles.add}
                  onClick={() =>
                    isAdded(p.asin)
                      ? removeOnce(p.asin)
                      : addOnce(p.asin)
                  }
                >
                  {
                    //CART ICON
                    <img
                      className={styles.icon}
                      src={isAdded(p.asin)
                        ? 'images/business.png'
                        : 'images/add-to-cart.png'
                      }
                      alt="" />}
                </button>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Shop;
