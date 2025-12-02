import React, { useEffect, useState } from "react";
import api from "../../axios";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../redux/slice/productSlice";

export default function ProductPage() {

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const {products, categories} = useSelector((state) => state.products)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchValue = query.get("search") || "";

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])



  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (
      searchValue !== "" &&
      !product.title.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change Page
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Shop Products</h1>
        <p className="text-gray-500 mt-2">
          Browse through our premium collection of best-selling products.
        </p>
        <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-3"></div>
      </div>

      {/* Category Filters */}
      <section className="mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all 
              ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="capitalize">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="text-gray-500">{filteredProducts.length} items found</p>
      </div>

      {/* Product Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          No products match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-lg border 
              ${
                currentPage === i + 1
                  ? "bg-orange-600 border-orange-600 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}