import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
    ip: { type: String },
    expiresAt: { type: Date },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const sessionModel = mongoose.model("Session", sessionSchema);
export default sessionModel;
