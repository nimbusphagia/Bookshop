import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Homepage from './Components/Homepage/Homepage.jsx'
import Hero from './Components/Hero/Hero.jsx'
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx'
import Shop from './Components/Shop/Shop.jsx'
import Cart from './Components/Cart/Cart.jsx'
import { shopLoader } from './Components/Shop/shopLoader.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: '/home',
        element: <Hero />,
      },
      {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
