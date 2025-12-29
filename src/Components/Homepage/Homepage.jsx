import styles from './Homepage.module.css'
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router";

function Homepage() {
  return (
    <main className={styles.Homepage}>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
export default Homepage;
