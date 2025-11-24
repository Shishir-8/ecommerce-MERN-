import React from "react";
import { FiUsers, FiBox, FiShoppingCart, FiDollarSign } from "react-icons/fi";

export default function AdminDashboard() {
  const cards = [
    { name: "Total Users", value: "120", icon: <FiUsers className="text-3xl text-blue-500" /> },
    { name: "Total Products", value: "85", icon: <FiBox className="text-3xl text-green-500" /> },
    { name: "Total Orders", value: "45", icon: <FiShoppingCart className="text-3xl text-yellow-500" /> },
    { name: "Total Revenue", value: "$12,340", icon: <FiDollarSign className="text-3xl text-red-500" /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <div>{card.icon}</div>
            <div>
              <p className="text-gray-500">{card.name}</p>
              <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts or other components */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow h-64 flex items-center justify-center text-gray-400">
          Chart / Graph Placeholder
        </div>
        <div className="bg-white rounded-lg shadow h-64 flex items-center justify-center text-gray-400">
          Recent Activity / Stats Placeholder
        </div>
      </div>
    </div>
  );
}