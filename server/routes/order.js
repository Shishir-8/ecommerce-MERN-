import express from "express"
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js"
import { createOrder } from "../controllers/orderController.js"
const router = express.Router()

router.post("/create-order", verifyFirebaseToken, createOrder)


export default router