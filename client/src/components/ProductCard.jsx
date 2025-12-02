import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { setBuyNowItem } from '../redux/slice/buyNowSlice'
import { FaStar, FaRegStar } from "react-icons/fa"
import { addToCart } from '../redux/slice/cartSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleAddToCart = () => {
    try {
      dispatch(addToCart(product))
      toast.success("Product added successfully")
    } catch (error) {
      toast.error(error)
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login first")
      return
    }
    const singleItem = {
      product,
      quantity: 1
    }
    dispatch(setBuyNowItem(singleItem))
    navigate("/checkout")
  }

  const rating = product.rating || 4

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      
      {/* Badges */}
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-xs rounded-full font-semibold z-10">
          New
        </div>
      )}
      {product.discount && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full font-semibold z-10">
          {product.discount}% Off
        </div>
      )}

      <Link to={`/products/${product._id}`} className="flex-1">
        {/* Image */}
        <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-orange-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              i < rating ? 
              <FaStar key={i} className="text-orange-500 mr-1" /> :
              <FaRegStar key={i} className="text-gray-300 mr-1" />
            ))}
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            {product.discount ? (
              <>
                <p className="text-blue-600 font-bold text-xl">${(product.price * (1 - product.discount/100)).toFixed(2)}</p>
                <p className="text-gray-400 line-through text-sm">${product.price}</p>
              </>
            ) : (
              <p className="text-blue-600 font-bold text-xl">${product.price}</p>
            )}
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="flex gap-2 p-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 cursor-pointer bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 cursor-pointer border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}