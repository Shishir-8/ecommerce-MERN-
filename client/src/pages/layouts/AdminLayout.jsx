
import AdminHeader from '../admin/components/AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../admin/components/Sidebar'
import { useState } from 'react'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className='flex min-h-screen'>
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='flex-1 flex flex-col'>
          <AdminHeader />
          <main className='p-6 bg-gray-100 flex-1'>
            <Outlet />
          </main>
        </div>
    </div>
  )
}
