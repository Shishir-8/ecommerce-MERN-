import admin from "../config/firebase.js";
import User from "../models/User.js";


export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);

    // 🔥 Find the MongoDB user
    const user = await User.findOne({ firebaseUid: decoded.uid });
    
    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach MongoDB user to request
    req.user = user; // now req.user._id exists
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};