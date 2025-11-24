import admin from "../config/firebase.js";

export const verifyFirebaseToken = async (req, res, next) => {
    try {
        const {token} = req.body;
        if(!token) {
            return res.status(401).json({message: "Token missing"})
        }

        const decoded = await admin.auth().verifyIdToken(token);
        req.firebaseUser = decoded;
        next()
        
    } catch (error) {
        res.status(401).json({ message: "Invalid Firebase token" });
    }
}