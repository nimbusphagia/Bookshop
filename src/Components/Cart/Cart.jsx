import styles from './Cart.module.css'
import { useOutletContext } from "react-router";

export default function Cart() {
  const { cart, addOnce, removeOnce, handleQuantity } = useOutletContext();

  return (
    <div
      className={styles.body}
    >
      <div
        className={styles.cart} >
        {
          //PRODUCTS
          <h2>Shopping Cart</h2>
        }
      </div>
      <div
        className={styles.checkout}
      >
        <h2>Details</h2>
        <div className={styles.details}>
          <div>
            <p>Subtotal:</p>
            <p>$0.00</p>
          </div>
          <div className={styles.total}>
            <p>Total:</p>
            <p>$0.00</p>
          </div>

        </div>
      </div>
    </div>
  )
}
