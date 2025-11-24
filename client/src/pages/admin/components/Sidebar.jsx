import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";
import { CiMenuBurger } from "react-icons/ci";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Products", path: "/admin/products", icon: <FiBox /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
  ];

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <h1  className={`text-xl font-bold ${sidebarOpen ? "block" : "hidden"}`}>
        <Link to="/">   Admin Panel
        </Link>
        </h1>
        <button
          className="text-gray-600 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <CiMenuBurger/> : <CiMenuBurger />}
        </button>
      </div>

      <nav className="mt-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition"
          >
            <span className="text-lg">{link.icon}</span>
            {sidebarOpen && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}