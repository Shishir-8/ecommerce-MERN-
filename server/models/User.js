import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true, // ensures one user per Firebase UID
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: "user"
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);