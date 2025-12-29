import styles from './Navbar.module.css'
import { NavLink } from "react-router"

function Navbar() {
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
          <NavLink to='cart'>Shopping cart</NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar;
