import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../redux/slice/authSlice";
import Loader from "./Loader";




export default function Header() {

  const {items} = useSelector((state) => state.cart)
  const totalCount = items.length
 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("")

  const { user, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      toast.success("Logout succesfully")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }


  const handleKeySearch = (e) => {

    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim()) {
        navigate(`/products?search=${encodeURIComponent(search)}`)
        setSearch("")
      }
    }
  }

  if (loading) {
  return <Loader />
}


  return (
    <>
      <nav className="w-full py-3 bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">E-comerce</span>
          </Link>

          {/* Center: Search Box */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-1/2">
            <CiSearch size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeySearch}
              placeholder="Search for products, brands, and more..."
              className="bg-transparent w-full outline-none text-sm text-gray-700"
            />
          </div>

          {/* Right: Cart + My Account */}
          <div className="flex items-center gap-5 relative">
            <Link to={"/cart"} className="relative">
              <FiShoppingCart size={22} className="text-gray-700 hover:text-blue-600 transition" />
              <span className="absolute -top-3 -right-2 bg-orange-600 text-white text-xs px-1.5 rounded-full">
                {totalCount}
              </span>
            </Link>

            {!user ? (
              <Link
                to={"/signin"}
                className="px-4 py-2 text-gray-600 rounded-full flex items-center gap-2 text-md font-medium transition hover:bg-gray-100"
              >
                My Account
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-gray-700 font-semibold truncate">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}

                {
                  dropdownOpen && (
                    <div onClick={()=> setDropdownOpen(false)} className="fixed inset-0 z-40"></div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
