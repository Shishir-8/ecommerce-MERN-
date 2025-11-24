import express from "express"
import { createProducts, getAllProducts, getCategories, getHomeProducts, getTrendingProducts } from "../controllers/productController.js"
const router = express.Router()


router.get("/", getAllProducts)

router.get("/home", getHomeProducts)
router.get("/home/trending", getTrendingProducts)

router.get("/categories", getCategories)

export default router 