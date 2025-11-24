import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../../firebase'
import { clearUser } from '../../../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { FiLogOut } from 'react-icons/fi'

export default function AdminHeader() {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      toast.success("Logout successfull")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }
  return (
       <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Welcome, {user?.name}
      </h2>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  )
}
