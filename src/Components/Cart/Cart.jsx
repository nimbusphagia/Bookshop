import styles from './Cart.module.css'
import { useOutletContext } from "react-router";

export default function Cart() {
  const { cart, handleQuantity } = useOutletContext();
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  function getTitle(rawTitle = "", maxWords = 8) {
    const words = rawTitle.trim().split(/\s+/);
    if (words.length <= maxWords) return rawTitle;
    return words.slice(0, maxWords).join(" ") + "…";
  }
  return (
    <div
      className={styles.body}
    >
      <div
        className={styles.cart} >
        <h2>Shopping Cart</h2>
        <div className={styles.products}>
          <header className={styles.header}>
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </header>
          {
            cart.length === 0
            && <div className={styles.emptyCart}>
              <p>There is nothing to show here, your cart is empty.</p>
            </div>

          }
          {
            cart.map((p) => (
              (p.quantity > 0) && <div
                key={p.id}
                className={styles.product}
              >
                <div className={styles.item}>
                  <img src={p.imgUrl} alt={p.title} />
                  <p className={styles.title}> {getTitle(p.title)}</p>
                </div>
                <p className={styles.price}>${p.price.toFixed(2)}</p>
                <div className={styles.quantity}>
                  <button type='button' onClick={
                    () => {
                      if (p.quantity > 0)
                        handleQuantity(p.id, p.quantity - 1)
                    }
                  }>-</button>
                  <input type="number" name="quantity" value={p.quantity} onChange={(e) => handleQuantity(p.id, Number(e.target.value))} />
                  <button type='button' onClick={
                    () => {
                      if (p.quantity > 0)
                        handleQuantity(p.id, p.quantity + 1)
                    }
                  }>+</button>
                </div>
                <p className={styles.productTotal}> ${(p.quantity * p.price).toFixed(2)}</p>
              </div>

            )
            )
          }
        </div>

      </div>
      <div
        className={styles.checkout}
      >
        <h2>Details</h2>
        <div className={styles.details}>
          <div className={styles.dItem}>
            <p>Subtotal:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className={styles.dItem}>
            <p>I.G.V:</p>
            <p>${(total * 0.18).toFixed(2)}</p>
          </div>
          <div className={styles.dItem}>
            <p>Shipping:</p>
            <p>Free</p>
          </div>

          <div className={styles.total} >
            <p>Total</p>
            <p>${(total * 1.18).toFixed(2)}</p>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.checkoutBtn}
              type="button"
            >Checkout</button>
          </div>
        </div>
      </div>
    </div >
  )
}
