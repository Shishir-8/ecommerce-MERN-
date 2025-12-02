import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../redux/slice/authSlice";
import Loader from "./Loader";
import SearchBar from "./SearchBar";

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const totalCount = items.length;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading) return <Loader />;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="w-full py-4 bg-white sticky top-0 z-50 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-extrabold text-orange-500 tracking-wide">
            Mini-Shop
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-10 text-[17px]">
          {navLinks.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative group transition-all duration-200 ${
                    isActive ? "text-orange-600" : "text-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute left-0 -bottom-1 h-[2.5px] bg-orange-600 transition-all duration-300 
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-6">

          {/* SEARCH */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* CART */}
          <Link to="/cart" className="relative">
            <FiShoppingCart
              size={26}
              className="text-gray-700 hover:text-orange-600 transition"
            />
            <span className="absolute -top-3 -right-2 bg-orange-600 text-white text-xs px-2 rounded-full">
              {totalCount}
            </span>
          </Link>

          {/* ACCOUNT */}
          {!user ? (
            <Link
              to="/signin"
              className="hidden lg:block px-5 py-2 rounded-full text-gray-800 font-medium border border-gray-300 hover:shadow-md"
            >
              My Account
            </Link>
          ) : (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-orange-400 hover:border-orange-600"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-orange-200 rounded-xl shadow-xl py-3 z-50">
                  <p className="px-4 py-2 text-gray-700 font-medium truncate">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-3xl text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="lg:hidden bg-white  py-4 px-6 space-y-5 animate-fadeIn">

          {/* Search in Mobile */}
          <SearchBar />

          {/* Links */}
          <ul className="flex flex-col  gap-4 text-lg font-medium">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-2 ${isActive ? "text-orange-600" : "text-gray-800"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>

          {/* ACCOUNT + LOGOUT (Mobile) */}
          {!user ? (
            <Link
              to="/signin"
              className="block w-full text-center py-2 border rounded-lg text-gray-800 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              My Account
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-gray-700 font-medium">{user.email}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full py-2 text-left font-medium text-red-600 border border-red-300 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
