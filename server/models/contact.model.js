import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    email: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export const contactModel = mongoose.model("Contact", contactSchema);
