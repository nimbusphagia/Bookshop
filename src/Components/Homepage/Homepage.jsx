import styles from './Homepage.module.css'
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Loading from '../Loading/Loading.jsx';
import { Outlet, useMatch, useNavigation } from "react-router";
import { useState } from 'react';

function Homepage() {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isHome = useMatch('/home');

  function addItem(product, amount = 1) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);

      if (!exists) {
        return [...prev, { ...product, quantity: amount }];
      }

      return prev.map(i =>
        i.id === product.id
          ? { ...i, quantity: i.quantity + amount }
          : i
      );
    });
  }
  function setAmount(id, amount) {
    setCart(prev => {
      return prev.map(p =>
        p.id === id
          ? { ...p, quantity: amount }
          : p
      )
    })
  }
  function handleQuantity(productId, amount = 1) {
    if (amount > 0) {
      setAmount(productId, amount);
    } else {
      removeProduct(productId);
    }
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
  function removeProduct(productId) {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);

      if (!item) {
        return prev
      }
      else {
        return prev.filter(i => i.id !== productId);
      }

    });
  }

  const shopContext = { cart, addItem, removeOnce, removeProduct, handleQuantity };

  return (
    <main className={styles.Homepage}>
      <Navbar counter={cart.length} />
      {isLoading ?
        <Loading /> :
        <div className={!isHome ? styles.screen : undefined}>
          <Outlet context={shopContext} />
          <Footer />
        </div>
      }
    </main>
  )
}
export default Homepage;
