import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import green from '../assets/green.png';
import product1 from "../product1.json";
import product2 from "../outdoor.json";
import product3 from "../medicin.json";
import product4 from "../flower.json";
import product5 from "../pot.json";
import product6 from "../bulb.json";
import product7 from "../fertili.json";
import lo from "../assets/lo.png";
import y from '../assets/y.png';
import i from '../assets/i.png';
import x from '../assets/x.png';
import fa from '../assets/fa.png';

const allProducts = [
  ...product1,
  ...product2,
  ...product3,
  ...product4,
  ...product5,
  ...product6,
  ...product7,
];

const ProductDetail = () => {
  const location = useLocation();
  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // ⭐ Feedback states
  const [feedbackList, setFeedbackList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // 🧠 Fetch Product
  useEffect(() => {
    const productName = decodeURIComponent(name);
    const found = allProducts.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    setProduct(found || null);
    setQuantity(1);
  }, [name, location.state]);

  // 🔗 Related Products (first 6 letters OR 5 fallback)
  useEffect(() => {
    if (product) {
      const prefix = product.name.slice(0, 6).toLowerCase();

      const matched = allProducts.filter(
        (p) =>
          p.name.toLowerCase().startsWith(prefix) &&
          p.name.toLowerCase() !== product.name.toLowerCase()
      );

      const relatedItems =
        matched.length > 0
          ? matched
          : allProducts.filter((p) => p.name !== product.name).slice(0, 4);

      setRelated(relatedItems);
    }
  }, [product]);

  // 💬 Fetch Feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      if (!product) return;
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        const filtered = res.data.filter((f) => f.category === product.name);
        setFeedbackList(filtered);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedback();
  }, [product]);

  // ⭐ Calculate Average Rating
  const avgRating =
    feedbackList.length === 0
      ? 0
      : feedbackList.reduce((a, b) => a + b.rating, 0) / feedbackList.length;

  // 🛒 Add to Cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const productId =
        product.id ||
        `${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;

      await axios.post(
        "http://localhost:5000/api/cart/add",
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

  // ⭐ Render Stars
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

  
  const handleSubmitReview = async () => {
    if (!userName) return alert("Please enter your name");
    if (!userEmail) return alert("Please enter your email");
    if (!userRating) return alert("Please select a rating");

    try {
      await axios.post("http://localhost:5000/api/feedback", {
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

      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbackList(res.data.filter((f) => f.category === product.name));
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Product not found 😕
        </h2>
        <button
          onClick={() => navigate("/product")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const discountPrice = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div>
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md object-contain rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center space-x-3 mb-2">
            {renderStars(avgRating)}
            <span className="text-gray-500 text-sm">
              {feedbackList.length} reviews
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl font-semibold text-green-700">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through text-lg">
                  ₹{product.originalPrice}
                </span>
                <span className="text-red-500 font-semibold text-sm">
                  Save {discountPrice}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <p className="text-gray-500 mb-3">(MRP inclusive of all taxes)</p>

          <div className="space-y-2 text-sm text-gray-700 mb-6">
            <p>🚚 Shipping ₹79 for entire order</p>
            <p>📦 Dispatch in 7 days</p>
            <p>🌍 Country of origin: India</p>
          </div>

          {/* Quantity + Cart */}
          <div className="flex items-center space-x-4 mb-4">
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
               Added to cart successfully!
            </p>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Customer Reviews
        </h2>

        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {feedbackList.length === 0 ? (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          ) : (
            feedbackList.map((f) => (
              <div
                key={f._id}
                className="border rounded-lg p-3 shadow-sm bg-green-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-green-700 text-sm flex items-center gap-1">
                    <img src={lo} alt="user" className="h-5 w-5" />{" "}
                    {f.name || "Anonymous"}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{f.email}</p>
                {renderStars(f.rating)}
                <p className="text-gray-700 text-sm mt-1">{f.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Submit Review */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Submit Your Review
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setUserRating(star)}
                className={`text-2xl ${
                  (hoverRating || userRating) >= star
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
            className="w-full p-2 border rounded-lg mb-2 text-sm focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg mb-2 text-sm focus:ring-2 focus:ring-green-400"
          />

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder="Write your review..."
            className="w-full p-2 border rounded-lg mb-2 text-sm resize-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleSubmitReview}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((r, i) => (
              <div
                key={i}
                onClick={() =>
                  navigate(`/product/${encodeURIComponent(r.name)}`, {
                    state: { product: r },
                  })
                }
                className="cursor-pointer bg-white rounded-xl shadow hover:shadow-md p-4 text-center transition"
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="font-semibold text-gray-700 truncate">
                  {r.name}
                </h3>
                <p className="text-green-700 font-bold">₹{r.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
    <div className='bg-green-800 text-center p-4 h-auto rounded-t-xl'>
         <footer className="bg-green-800 text-white py-10 px-6 md:px-12 lg:px-20">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={green}
                    alt="logo"
                    className="w-30 h-8"
                  />
                  
                </div>
                <p className="text-sm text-gray-100 ">
                  Your trusted online plant nursery, bringing nature closer to your home with a wide
                  variety of plants and gardening essentials.
                </p>
              </div>
      
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-100 text-sm">
                  <li><a href="/About" className="hover:text-yellow-300 transition">About Us</a></li>
                  <li><a href="/Product" className="hover:text-yellow-300 transition">Products</a></li>
                  <li><a href="/guide" className="hover:text-yellow-300 transition">Blog</a></li>
                  <li><a href="/Contact" className="hover:text-yellow-300 transition">Contact</a></li>
                </ul>
              </div>
      
            
              <div>
                <h3 className="text-lg font-semibold mb-4">Policies</h3>
                <ul className="space-y-2 text-gray-100 text-sm">
                  <li><a href="#" className="hover:text-yellow-300 transition">Return Policy</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Shipping Policy</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a></li>
                </ul>
              </div>
      
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-100 mb-3">
                  Subscribe to get special offers and plant care tips!
                </p>
                <form className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-md border border-green-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-1 w-full sm:w-auto"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md transition"
                  >
                    submit
                   
                  </button>
                </form>
              </div>
            </div>
      
            
            <div className="border-t border-green-600 my-8"></div>
      
           
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-100 space-y-3 sm:space-y-0">
              <p>© 2025 Green Nursery. All rights reserved.</p>
              <div className="flex space-x-4 text-xl">
                <div className="mt-8">
                           <h3 className="font-semibold mb-3">Follow Us</h3>
                           <div className="flex gap-5 text-2xl">
                             <a href="#" className="">
                               <img src={fa} className='h-8' ></img>
                             </a>
                             <a href="#" className="">
                               <img src={y}  className='h-8' ></img>
                             </a>
                             <a href="#" className="">
                               <img src={i}  className='h-7' ></img>
                             </a>
                             <a href="#" className="">
                               <img src={x}  className='h-8' ></img>
                             </a>
                           </div>
                         </div>
              </div>
            </div>
          </footer>
        </div>
        </div>
  );
};

export default ProductDetail;
