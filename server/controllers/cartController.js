import Cart from "../models/Cart.js";


// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId)
    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    const userId = req.user._id

    // Find the cart for this user
    let cart = await Cart.findOne({ user: userId });

    // If no cart, create one
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if product exists in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.items.push({ product: productId, quantity: 1 }); // Add new product
    }

    await cart.save();

    // Populate product details before sending
    await cart.populate("items.product");

    res.json({ message: "Product added to cart", items: cart.items });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ message: "Failed to add item" });
  }
};


export const getCart = async (req, res) => {
  try {
    const firebaseUid = req.user._id

    let cart = await Cart.findOne({ user: firebaseUid }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: firebaseUid, items: [] });
    }

    res.json({ items: cart.items });
  } catch (err) {
    console.error("Get cart error:", err.message);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
  
    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    const userId = req.user._id
    console.log(userId)
 

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove item
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();

    await cart.populate("items.product"); // populate products

    res.json({ message: "Item removed from cart", items: cart.items });
  } catch (err) {
    console.error("Remove cart item error:", err.message);
    res.status(500).json({ message: "Failed to remove item" });
  }
};