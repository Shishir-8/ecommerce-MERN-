import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, removeItemFromCart } from "../../redux/slice/cartSlice";
import { createOrder } from "../../redux/slice/orderSlice";
import toast from "react-hot-toast";
import api from "../../axios";
import { clearBuyNowItem } from "../../redux/slice/buyNowSlice";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    // FORM STATES
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");

    // REDUX DATA
    const { items } = useSelector((state) => state.cart);
    const buyNowItem = useSelector((state) => state.buyNow.item)

    const checkOutItems = buyNowItem ? [buyNowItem] : items



    // CALCULATE TOTAL
    const subtotal = checkOutItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = 0;
    const totalAmount = subtotal + shipping;

    // Handle Submit

    const handlePlaceOrder = async () => {
        const orderDetails = {
            shippingAddress: address,
            items: checkOutItems,
            totalAmount,
            paymentMethod
        }
        dispatch(createOrder(orderDetails))
            .unwrap()
            .then(() => {
                toast.success("Order placed succesfully")

                if (buyNowItem) {
                    dispatch(clearBuyNowItem())
                }

                navigate("/")

            })
            .catch((error) => {
                toast.error(error)
            })
    }


    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

                {/* LEFT - ORDER SUMMARY */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
                    <p className="text-gray-500 mb-6">Review your cart items before completing your order.</p>

                    <div className="space-y-4">
                        {checkOutItems.map((item) => (
                            <div
                                key={item.product._id}
                                className="flex gap-4 bg-white p-4 rounded-xl border border-gray-300 shadow-sm"
                            >
                                <img
                                    src={item.product.image}
                                    className="w-28 h-28 rounded-lg object-cover"
                                    alt="product"
                                />

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.product.title}</h3>
                                        <p className="text-gray-600 text-sm">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-lg text-gray-900 font-semibold">
                                        NPR {item.product.price * item.quantity}
                                    </p>


                                </div>

                                <div>
                                    <button
                                        onClick={() => dispatch(removeItemFromCart(item.product._id))}
                                        className="ml-auto text-red-500 hover:text-red-700 transition"
                                    >
                                        Remove
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT - CLEAN CHECKOUT FORM */}
                <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                    <p className="text-gray-500 mb-6">Enter your details to complete the purchase.</p>

                    {/* ADDRESS */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700">Delivery Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full address..."
                            required
                            className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Payment Method</h3>

                        <div className="space-y-3">

                            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                />
                                <span className="font-medium text-gray-700">Cash on Delivery</span>
                            </label>

                            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer ">
                                <input
                                    name="payment"
                                    value="khalti"
                                    checked={paymentMethod === "khalti"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    type="radio" />
                                <span className="font-medium text-gray-700">Khalti</span>
                            </label>

                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="border-t pt-4 space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>NPR {subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-gray-900 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-semibold">
                            <span>Total</span>
                            <span>NPR {totalAmount}</span>
                        </div>
                    </div>

                    {paymentMethod === "COD" ? (
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-orange-300"
                        >
                            Place Order
                        </button>
                    ) : (
                        <button
                            type="button"

                            className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-orange-300"
                        >
                            Khalti(Comming soon)
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}