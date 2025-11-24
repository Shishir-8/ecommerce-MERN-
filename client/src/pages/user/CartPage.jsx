import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, getCart, increaseQuantity, removeItemFromCart } from "../../redux/slice/cartSlice";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { clearBuyNowItem } from "../../redux/slice/buyNowSlice";

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items);
    const { loading } = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = Math.floor(subtotal + shipping);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    if (loading) return <Loader />;

    const handleProceedCheckOut = () => {
        dispatch(clearBuyNowItem())
        navigate("/checkout");
    };

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT - Cart Items */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
                {cartItems.length === 0 && (
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                )}

                {cartItems.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex gap-6 p-4 border border-gray-400 bg-white rounded-xl shadow hover:shadow-lg transition"
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-28 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{item.product.title}</h3>
                                <p className="text-gray-600 mt-1">NPR {item.product.price}</p>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                                <button
                                    onClick={() => dispatch(decreaseQuantity(item.product._id))}
                                    className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                                >-</button>
                                <span className="font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(increaseQuantity(item.product._id))}
                                    className="w-8 h-8 border rounded-full hover:bg-gray-100 transition"
                                >+</button>
                                <button
                                    onClick={() => dispatch(removeItemFromCart(item.product._id))}
                                    className="ml-auto text-red-500 hover:text-red-700 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT - Order Summary + Address */}
            <div className="bg-white rounded-xl border border-gray-400 shadow p-6 sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>


                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>NPR {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `NPR ${shipping}`}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>NPR {total}</span>
                    </div>
                </div>

                <button
                    onClick={handleProceedCheckOut}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}