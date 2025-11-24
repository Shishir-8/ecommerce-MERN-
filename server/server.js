import express from "express";
import 'dotenv/config'
import connectDB from "./config/db.js";
import cors from 'cors'
import productRoutes from "./routes/productRoute.js"
import authRoutes from "./routes/userRoute.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"
import adminRoutes from "./routes/admin.js"

import helmet from "helmet"
import compression from "compression";


connectDB();

const app = express();


app.use(express.json());
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({extended: true}))


const allowedOrigins = [
  "http://localhost:5173", // dev
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // allow cookies or Authorization headers
}));


app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/admin", adminRoutes)




const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));