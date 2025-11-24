import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const {shippingAddress, paymentMethod, items, totalAmount} = req.body;
        const userId = req.user._id;

        if(!items || items.length === 0) {
            return res.status(400).json({message: "No items to order"})
        }

        const order = await Order.create({
            user: userId,
            items,
            shippingAddress,
            totalAmount,
            paymentMethod,
            paymentStatus: "pending"
        })
        
        res.status(201).json({
            message: "Order created successfully",
            order
        })
    } catch (error) {
    res.status(500).json({ message: "Failed to create order" });  
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({user: userId}).populate("items.product")
        res.status(200).json(orders)
    } catch (error) {
    res.status(500).json({ message: "Failed to create order" });  
    }
}

