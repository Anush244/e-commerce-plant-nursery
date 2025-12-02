import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);




