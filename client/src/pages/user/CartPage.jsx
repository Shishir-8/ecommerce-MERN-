import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import EmailSubscription from "./EmailSubscription";
import Footer from "../../components/Footer";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems)

  // ---------- PRICE CALCULATION ----------
  const shipping = cartItems.length > 0 ? 100 : 0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const grandTotal = subtotal + tax + shipping;

  // ---------- EMPTY CART ----------
  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <img
          src="https://i.imgur.com/dCdflKN.png"
          alt="Empty Cart"
          className="w-56 mx-auto mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 mb-10 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Shop Now
        </button>
        <EmailSubscription />
        <Footer />
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto p-6 space-y-12">
      {/* HEADER / HERO */}
      <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-8 rounded-2xl text-center shadow-sm">
        <h1 className="text-4xl font-extrabold text-orange-700 tracking-tight">
          Your Shopping Cart
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          Secure checkout • Fast delivery • Quality assurance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ---------------- CART ITEMS ---------------- */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 p-5 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-28 h-28 rounded-xl object-cover border border-gray-300"
              />

              {/* DETAILS */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Category: {item.category}
                </p>
                <p className="text-orange-600 font-bold text-lg mt-2">
                  NPR {item.price}
                </p>

                {/* QUANTITY + REMOVE */}
                <div className="flex items-center mt-4 gap-4">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="w-9 h-9 bg-gray-100 text-lg font-bold hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="w-9 h-9 bg-gray-100 text-lg font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 ml-auto hover:text-red-700 text-sm"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ---------------- OTHERS SECTION ---------------- */}
          <div className="p-6 bg-gray-50 border border-gray-300 rounded-2xl shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Delivery Information</h2>
            <p className="text-gray-700 leading-relaxed">
              • Standard delivery: <span className="font-semibold">2–5 days</span>  
              <br />• Free return policy: <span className="font-semibold">7 days</span>  
              <br />• 24/7 customer support available for all orders  
            </p>
          </div>
        </div>

        {/* ---------------- ORDER SUMMARY ---------------- */}
        <div className="bg-white shadow-lg p-8 rounded-2xl border border-gray-300 sticky h-[490px] top-24 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>NPR {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>NPR {shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (13%)</span>
              <span>NPR {Math.round(tax)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>NPR {Math.round(grandTotal)}</span>
            </div>
          </div>

          {/* COUPON */}
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Have a coupon?</label>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
              />
              <button className="px-4 bg-gray-900 text-white rounded-r-lg hover:bg-black">
                Apply
              </button>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 text-lg"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>

        <EmailSubscription />
       
    </div>
     <Footer />

    </>
  );
}