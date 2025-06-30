import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const passwordResetTokenModel = mongoose.model(
  "Password-Reset",
  passwordResetTokenSchema
);

export default passwordResetTokenModel;
