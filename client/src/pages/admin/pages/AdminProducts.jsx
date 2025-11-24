import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../../axios";
import { useEffect, useState } from "react";

export default function AdminProducts() {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const res = await api.get("/api/products/")
        setProducts(res.data.products) 
    }

    useEffect(() => {
        fetchProducts()
    },[])
 
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Products</h1>

      {/* Add New Product Button */}
      <div className="mb-6 mt-2 flex justify-start">
        <Link to="/admin/products/add" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + Add New Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center flex justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}