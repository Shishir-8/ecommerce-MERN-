import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import { Toaster } from "react-hot-toast"
import AuthListener from './components/AuthListener'

export default function App() {

  return (
    <>
      <Toaster position='top-center' />
      <AuthListener />
      <RouterProvider router={router} />

    </>
  )
}
