import express from "express";
import { Feedback } from "../models/feedback";

const router = express.Router();


router.post("/", async (req, res) => {
  const { name, category, rating, message } = req.body;
  try {
    const feedback = new Feedback({ name, category, rating, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
});

//  Update feedback by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, category, rating, message } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, category, rating, message },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error });
  }
});

//  Delete feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
});

export default router;
