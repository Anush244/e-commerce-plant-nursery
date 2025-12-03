
import React, { useState, useEffect } from "react";
import axios from "axios";
import lo from "../assets/lo.png";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const [feedbackList, setFeedbackList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false); // <--- FIXED: Added missing state

  useEffect(() => {
    if (product) { // Added a check to ensure product is not null
      const fetchFeedback = async () => {
        try {
          const res = await axios.get("/api/feedback");
          setFeedbackList(res.data.filter((f) => f.category === product.name));
        } catch (err) {
          console.error("Failed to fetch feedback:", err);
        }
      };
      fetchFeedback();
    }
  }, [product]);

  const avgRating =
    feedbackList.length === 0
      ? 0
      : feedbackList.reduce((a, b) => a + b.rating, 0) / feedbackList.length;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <div className="flex items-center gap-1 text-yellow-400 text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-500 text-sm">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      // Use a consistent ID if available, otherwise generate one
      const productId = product._id || product.id || `${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;

      await axios.post(
        "/api/cart/add",
        {
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.response?.data?.error || "Failed to add to cart");
    }
  };

  const handleSubmitReview = async () => {
    if (!userName) return alert("Please enter your name");
    if (!userEmail) return alert("Please enter your email");
    if (!userRating) return alert("Please select a rating");

    try {
      await axios.post("/api/feedback", {
        name: userName,
        email: userEmail,
        category: product.name,
        rating: userRating,
        message: reviewText || `Rated ${userRating} stars`,
      });

      alert("Review submitted!");
      setUserName("");
      setUserEmail("");
      setUserRating(0);
      setReviewText("");

      // Refetch feedback to show the new review
      const res = await axios.get("/api/feedback");
      setFeedbackList(res.data.filter((f) => f.category === product.name));
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-700 transition"
        >
          &times;
        </button>

        {/* --- Start of Corrected JSX Structure --- */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain rounded-xl"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-green-700 font-bold text-2xl mt-1">
              ₹{product.price}
            </p>
            <div className="mt-2">{renderStars(avgRating)}</div>
            <p className="text-gray-500 text-sm mt-1">
              {feedbackList.length} Reviews
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="flex items-center space-x-4 my-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-x py-1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-sm sm:text-base transition"
              >
                Add to Cart
              </button>
            </div>

            {added && (
              <p className="text-green-600 text-sm font-medium animate-pulse">
                ✅ Added to cart successfully!
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Submit Review */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Submit Your Review
              </h3>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                    className={`text-2xl transition-colors ${(hoverRating || userRating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                      }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                placeholder="Write your review..."
                className="w-full p-2 border rounded-lg mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Submit Review
              </button>
            </div>

            {/* Column 2: Customer Reviews */}
            <div>
              <h3 className="font-semibold mb-3 border-b pb-1 text-gray-700 text-lg">
                Customer Reviews
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {feedbackList.length === 0 ? (
                  <p className="text-gray-500 text-sm">No reviews yet.</p>
                ) : (
                  feedbackList.map((f) => (
                    <div
                      key={f._id}
                      className="border rounded-lg p-3 shadow-sm bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <img src={lo} className="h-6 w-6 rounded-full" alt="user avatar" />
                          {f.name || "Anonymous"}
                        </p>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {new Date(f.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center ml-8">
                        {renderStars(f.rating)}
                      </div>
                      <p className="text-gray-700 text-sm mt-1 ml-8">{f.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;