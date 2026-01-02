import styles from './Navbar.module.css'
import { NavLink } from "react-router"

function Navbar({ counter }) {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.navbar}>
        <li>
          <NavLink to='home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='shop'>Shop</NavLink>
        </li>
        <li>
          <NavLink to='cart'>
            Shopping cart
            {counter > 0 &&
              <p
                className={styles.counter}
                aria-label={`cart items: ${counter}`}>{counter}</p>
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar;
