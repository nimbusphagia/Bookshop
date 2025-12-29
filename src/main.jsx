import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Homepage from './Components/Homepage/Homepage.jsx'
import Hero from './Components/Hero/Hero.jsx'
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx'
import Shop from './Components/Shop/Shop.jsx'
import { heroLoader } from './Components/Hero/heroLoader.js'

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
        loader: heroLoader,
      },
      {
        path: 'shop',
        element: <Shop />,
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
