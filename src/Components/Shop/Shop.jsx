import styles from './Shop.module.css';
import { useLoaderData, useOutletContext } from "react-router";

function Shop() {
  const data = useLoaderData();
  const products = data.products;

  function getTitle(rawTitle = "", maxWords = 5) {
    const words = rawTitle.trim().split(/\s+/);
    if (words.length <= maxWords) return rawTitle;
    return words.slice(0, maxWords).join(" ") + "…";
  }

  const { cart, addItem, removeProduct } = useOutletContext();

  const isAdded = (id) => cart.some(item => item.id === id);
  return (
    <div className={styles.body}>
      <div className={styles.catalog}>
        {products.map(p => (
          <div key={p.asin} className={styles.product}>
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
                <p>{p.price ? `$${p.price.amount}` : '$19.99'}</p>

                <button
                  type="button"
                  className={isAdded(p.asin) ? styles.remove : styles.add}
                  onClick={() =>
                    isAdded(p.asin)
                      ? removeProduct(p.asin)
                      : addItem({
                        id: p.asin,
                        title: p.title,
                        price: p.price?.amount ?? 19.99,
                        imgUrl: p.imageUrl,
                      })
                  }
                >
                  <img
                    className={styles.icon}
                    src={
                      isAdded(p.asin)
                        ? 'images/business.png'
                        : 'images/add-to-cart.png'
                    }
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;

