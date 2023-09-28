import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//  Import All Components and Pages
import Register from './Pages/Register'
import Username from './Pages/Username'
import Password from './Pages/Password'
import Recovery from './Pages/Recovery'
import Reset from './Pages/Reset'
import Profile from './Pages/Profile'
import PageNotFound from './Pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>,
  },
  {
    path: '/password',
    element: <Password></Password>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/reset',
    element: <Reset></Reset>,
  },
  {
    path: '/profile',
    element: <Profile></Profile>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
])

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
