import express from "express";
import { addToCart, getCart, removeCartItem } from "../controllers/cartController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add product to cart
router.post("/add-item", verifyFirebaseToken, addToCart);
router.get("/get-item", verifyFirebaseToken, getCart)
router.delete("/remove-item", verifyFirebaseToken, removeCartItem)




export default router;