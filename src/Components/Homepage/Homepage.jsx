import styles from './Homepage.module.css'
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router";
import { useState, useMemo } from 'react';

function Homepage() {
  const [cart, setCart] = useState([]);

  function addOnce(productId) {
    setCart(prev => {
      const exists = prev.some(item => item.id === productId);

      if (exists) return prev;

      return [...prev, { id: productId, quantity: 1 }];
    });
  }
  function addWithQuantity(productId, amount = 1) {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);

      if (!item) {
        return [...prev, { id: productId, quantity: amount }];
      }

      return prev.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity + amount }
          : i
      );
    });
  }
  function removeOnce(productId) {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);

      if (!item) return prev;

      if (item.quantity === 1) {
        return prev.filter(i => i.id !== productId);
      }

      return prev.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  }

  const shopContext = useMemo(
    () => ({ cart, addOnce, removeOnce, addWithQuantity }),
    [cart]
  );

  return (
    <main className={styles.Homepage}>
      <Navbar />
      <Outlet context={shopContext} />
      <Footer />
    </main>
  )
}
export default Homepage;
