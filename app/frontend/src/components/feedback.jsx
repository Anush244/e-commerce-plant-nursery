import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: "",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("/api/feedback");
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rating || !formData.message) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/feedback", formData);
      alert("Thank you for your feedback!");
      setFormData({ name: "", category: "", rating: "", message: "" });

      const res = await axios.get("/api/feedback");
      setFeedbackList(res.data);
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const averageRating =
    feedbackList.length > 0
      ? (
        feedbackList.reduce((sum, f) => sum + Number(f.rating), 0) /
        feedbackList.length
      ).toFixed(1)
      : 0;

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen">

      <div className="text-center py-12 bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          We Value Your Feedback
        </h1>
        <p className="text-lg opacity-90">
          Help us improve your plant shopping experience!
        </p>
      </div>


      <div className="flex justify-center px-4 py-12">
        <div className="bg-white/70 backdrop-blur-lg shadow-2xl border border-green-100 rounded-3xl p-8 md:p-10 max-w-lg w-full hover:shadow-green-200 transition-all duration-300">
          <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
            Share Your Thoughts
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select category</option>
                <option value="Plants">Plants</option>
                <option value="Seeds">Seeds</option>
                <option value="Pots">Pots</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select rating</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Poor</option>
                <option value="1">⭐ Very Poor</option>
              </select>
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              ></textarea>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>


      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 mb-10 border border-green-100">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          Customer Ratings Summary
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="mb-6 sm:mb-0">
            <div className="flex justify-center sm:justify-start text-yellow-400 text-xl">
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-2">
              {averageRating} / 5
            </h3>
            <p className="text-gray-500 text-sm">
              Based on {feedbackList.length} reviews
            </p>
          </div>

          <div className="w-full sm:w-1/2 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = feedbackList.filter(
                (f) => parseInt(f.rating) === star
              ).length;
              const percent = feedbackList.length
                ? (count / feedbackList.length) * 100
                : 0;
              return (
                <div key={star} className="flex items-center text-sm">
                  <span className="w-10 text-gray-700">{star}★</span>
                  <div className="w-full bg-gray-200 rounded-full h-3 mx-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
          What Our Customers Say
        </h2>

        {feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">
            No feedback yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbackList.map((fb, index) => (
              <div
                key={index}
                className="bg-white shadow-lg border border-green-100 hover:shadow-green-200 rounded-2xl p-5 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-green-800 text-lg">
                    {fb.name}
                  </h3>
                  <span className="text-yellow-400 text-sm">
                    {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm italic mb-2">
                  “{fb.message}”
                </p>
                <p className="text-right text-xs text-gray-400">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
