import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    isEmailVerified: { type: Boolean, default: false },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
