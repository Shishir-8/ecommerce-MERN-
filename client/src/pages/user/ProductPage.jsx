import React, { useEffect, useState } from "react";
import api from "../../axios";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const searchValue = query.get("search") || ""


  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsRes = await api.get("/api/products");
        const categoriesRes = await api.get( "/api/products/categories");

        setProducts(productsRes.data.products);
        setCategories(["all", ...categoriesRes.data]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products by selected category
  const filteredProducts = products.filter(product => {
  // If category is "all" OR product's category matches
  if (selectedCategory !== "all" && product.category !== selectedCategory) {
    return false; // skip this product
  }

  // If search is not empty AND product name does not include search text
  if (search !== "" && !product.title.toLowerCase().includes(searchValue.toLowerCase())) {
    return false; // skip this product
  }

  // Otherwise, keep the product
  return true;
});


  if (loading) return <Loader />;

  return (
    <div className="px-4 py-6">
      {/* Categories */}
      <section className="mb-6">
        <h1 className="text-xl font-semibold mb-3">Categories</h1>
        <ul className="flex space-x-3 overflow-x-auto">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === cat
                    ? "border-orange-500 border"
                    : "bg-gray-200"
                }`}
              >
               <span className="capitalize">{cat}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Products */}
      <section>
        <h1 className="text-xl font-semibold mb-4">All Products</h1>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}