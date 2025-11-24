import express from "express"
import { createProducts, getAllProducts } from "../controllers/productController.js"
import { getMyOrders } from "../controllers/orderController.js"
import {  isAdmin } from "../middlewares/adminMiddleware.js"
const router = express.Router()



router.post("/create-product", createProducts)



export default router