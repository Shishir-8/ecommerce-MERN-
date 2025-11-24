import express from "express"
import {firebaseLogin } from "../controllers/authController.js"
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js"
const router = express.Router()

router.post("/firebase-login", verifyFirebaseToken, firebaseLogin)



export default router