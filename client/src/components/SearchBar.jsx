import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchToggle() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null)
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()))
      
    setSuggestions(filtered);
  }, [search, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/products?search=${search}`);
    setSuggestions([]);
  };

  useEffect(() => {
    if(open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Search icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-700 hover:text-orange-600 transition"
      >
        <CiSearch size={28} />
      </button>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          placeholder="Search products..."
          className={`absolute right-0 top-0 h-10 pl-3 pr-3 rounded-full border border-gray-300 bg-white shadow transition-all duration-300
            ${open ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"}
          `}
        />
      </form>

      {/* Suggestions Box */}
      {open && suggestions.length > 0 && (
        <div className="absolute right-0 mt-12 w-64 bg-white shadow-lg rounded-lg border border-gray-300 z-50 max-h-64 overflow-auto">
          {suggestions.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/products?search=${item.title}`);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer border border-b border-gray-300 hover:bg-gray-100"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}