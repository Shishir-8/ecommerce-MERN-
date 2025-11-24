import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-hot-toast"
import { addToCart } from '../redux/slice/cartSlice'
import { setBuyNowItem } from '../redux/slice/buyNowSlice'

export default function ProductCard({product}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user}  = useSelector((state) => state.auth)
  console.log(user)


  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart(product._id)).unwrap()
      toast.success("Product added succesfully")
    } catch (error) {
      toast.error(error)
    }
  }


  const handleBuyNow = () => {
    const singleItem = {
      product,
      quantity: 1
    }

    dispatch(setBuyNowItem(singleItem))
    navigate("/checkout")
  }
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col p-4">
       
    
      {/* Badge */}
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full font-semibold">
          New
        </div>
      )}

      <Link to={`/products/${product._id}`}>
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          fill
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
     
        {/* Price */}
        <p className="text-blue-600 font-bold text-xl mt-2">${product.price}</p>
        </div>

        </Link>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

     
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
          onClick={handleAddToCart}
          className="flex-1 cursor-pointer bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            Add to Cart
          </button>

          <button
          onClick={handleBuyNow}
          className="flex-1 cursor-pointer border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Buy Now
          </button>
        </div>
    </div>
  )
}
