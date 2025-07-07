import mongoose from "mongoose";

const verifyEmailTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true, length: 8 },
  expiresAt: {
    type: Date,
    required: true,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      return now;
    },
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

const verifyEmailModel = mongoose.model("VerifyEmailToken", verifyEmailTokenSchema);
export default verifyEmailModel;
